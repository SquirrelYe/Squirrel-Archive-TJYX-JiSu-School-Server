const Sequelize = require('sequelize')
const conn = require('../../promise/promise').connection();
var co = require('co');  //yield

var Note_mtm = conn.define('Note_mtm', {
    'title': {
        'type': Sequelize.CHAR(64),
        'allowNull': false
    }
});
var Tag = conn.define('tag', {
    'name': {
        'type': Sequelize.CHAR(64),
        'allowNull': false,
        'unique': true
    }
});
// 中间表
var Tagging = conn.define('tagging', {
    'type': {
        'type': Sequelize.INTEGER(),
        'allowNull': true
    }
});

// Note的实例拥有getTags、setTags、addTag、addTags、createTag、removeTag、hasTag方法
Note_mtm.belongsToMany(Tag, {'through': Tagging});
// Tag的实例拥有getNotes、setNotes、addNote、addNotes、createNote、removeNote、hasNote方法
Tag.belongsToMany(Note_mtm, {'through': Tagging});

module.exports = {
    creat:function(req, res){
        //强制自动建表
        Note_mtm.sync({force: true});
        Tag.sync({force: true});
        Tagging.sync({force: true}).then(msg => {
            res.send(msg);
        });
    },
    add: function (req, res) {
        co(function* () {
            //增加一条数据 关联  tag -> note 逻辑： 新建一条 tag 将其关联到 note （配置 挖掘机 -> 矿区）
            var n = yield Note_mtm.findById('6') //找到 矿区
            var t = yield Tag.findById('1') // 购买 挖掘机
            yield n.addTag(t, {'type': 1}) //关联
            .then(msg => {
                res.send(msg);
            });
        }).catch(function(e) {
            console.log(e);
      });
    },
    
    update: function (req, res) {
        co(function* () {
            //修改一条数据 关联  tag -> 新note 逻辑： 找到一条 tag 将其关联到 新note （配置 挖掘机 -> 新矿区）
            var n = yield Note_mtm.findById('2') //找到 新矿区
            var t = yield Tag.findById('1') // 找到 挖掘机
            yield t.setNote_mtms(n, {'type': 1}) //关联
            .then(msg => {
                res.send(msg);
            });
        }).catch(function(e) {
            console.log(e);
      });
    },
    del: function (req, res) {
        co(function* () {
            var n = yield Note_mtm.findById('2') //找到 矿区
            yield n.setTags(null) //关联： 给 矿区 设置 null （注意，setUser_otm 不加 s）
            .then(msg => {
                res.send(msg);
            })
        });
    },
    find: function (req, res) {
        Note_mtm.findAll({
            // where: {}, user的查询条件
            include: {
                model: Tag, // 关联查询
                // where: {} // Account的查询条件
            }
        }).then(msg => {
            res.send(msg);
        })
    }
}