const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();
var co = require('co');

var user = conn.define('user', {
    'name': {
        'type': Sequelize.CHAR(10),
        'allowNull': false,
        'unique': true //唯一性
    }
});
var note = conn.define('note', {
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
});
/*User   getNote setNote addNote */
user.hasOne(note);
/*Note  getUser setUser addUser */
note.belongsTo(user);   //执行完成 在 notes表会生成 user_id 外键

module.exports = {
    creat: function (req, res) {
        //强制自动建表
        user.sync();
        note.sync().then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        //增加一条数据 关联 note -> user 逻辑： 新建一条 note 将其关联到 user
        co(function* () {
            var n = yield note.create({'title': 'c'}); //新建 note 
            var u = yield user.findById('1')  //传入 id 找到 user
            yield n.setUser(u) //关联： 给 note 设置 user
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    update: function (req, res) {
        //更新一条数据 关联 note -> 新user 逻辑： 找到一条 note 将其关联到 新user
        co(function* () {
            var n = yield note.findById('4') //找到 note 
            var u = yield user.findById('2')  //传入 id 找到 新user
            yield n.setUser(u) //关联： 给 note 设置 新user
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    del: function (req, res) {
        //删除一条数据 关联 note -> null 逻辑： 找到一条 note 将其关联到 null（解除关联）
        co(function* () {
            var n = yield note.findById('4') //找到 note 
            yield n.setUser(null) //关联： 给 note 设置 新user
            .then(msg => {
                res.send(msg);
            })
        }).catch(function (e) {
            console.log(e);
        });
    },
    find: function (req, res) {
        note.findAll({
            // where: {}, user的查询条件
            include: {
                model: user, // 关联查询，关联外键模型
                // where: {} // Account的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}