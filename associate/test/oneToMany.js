const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();
var co = require('co');

var User_otm = conn.define('user_otm', {
    'name': {
        'type': Sequelize.CHAR(10),
        'allowNull': false,
        'unique': true
    }
});
var Note_otm = conn.define('note_otm', {
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
});
/* User  getNote_otms       setNote_otms                addNote_otm createNote_otm removeNote_otm   hasNote_otm */
/* 主      获取外键关联    设置所有外键关联，已存在会删除       追加外键关联    建表&追加关联   移除外键关联    包含外键（一般不用） */
User_otm.hasMany(Note_otm,{
    foreignKey:'unid',
    constraints: false
});
/* Note_otm  getUser setUser createUser*/
Note_otm.belongsTo(User_otm,{
    foreignKey:'unid',
    constraints: false      //执行完成 在 notes表会生成 unid 外键
});

module.exports = {
    creat:function(req, res){
        //强制自动建表
        User_otm.sync({force: true});
        Note_otm.sync({force: true}).then(msg => {
            res.send(msg);
        });
    },
    add: function(req, res) {
        //增加一条数据 关联 note -> user 逻辑： 新建一条 note 将其关联到 user （新建用户 用户 -> 公司）
        co(function* () {
            var u = yield User_otm.findById('9') //找到公司
            var n = yield Note_otm.create({'title':'3'}) //新建 参赛者
            yield u.addNote_otms(n, {'type': 1}); //关联
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(function(e) {
            console.log(e);
      });
    },
    update: function (req, res) {
         //修改一条数据 关联 note -> user 逻辑： 找到多条 note 将其关联到 user （修改多个 参赛者 -> 公司）
         co(function* () {
            var u = yield User_otm.findById('9') //找到公司
            var n = yield Note_otm.findAll({where:{'id':['6','7']}}) //找到多个 参赛者
            yield u.addNote_otms(n, {'type': 1});   //匹配 （追加外键关联）
            // yield u.addNote_otms(9, {'type': 1});  //如果知道 id，可以直接传 user表的id
        })
        .then(msg => {
            res.send(msg);
        })
        .catch(function(e) {
            console.log(e);
      });
    },
    del: function (req, res) {
        //删除一条数据 关联 note -> null 逻辑： 找到一条 参赛者 将其关联到 null（解除关联）
        co(function* () {
            var n = yield Note_otm.findById('21') //找到 参赛者 
            yield n.setUser_otm(null) //关联： 给 参赛者 设置 null （注意，setUser_otm 不加 s）
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find: function (req, res) {
        User_otm.findAll({
            // where: {}, user的查询条件
            include: {
                model: Note_otm, // 关联查询
                // where: {} // Account的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}