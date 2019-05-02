var co = require('co');
// 导入模型
const location = require('../../entity/location').location;
const user = require('../../entity/user').user;
// 关联对象
location.belongsTo(user, { foreignKey: 'user_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        location.findAndCountAll({
            include:[{ model:user}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        location.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:user}]
        }).then( msg => { res.send(msg); })
    },
    // 按userid查询
    findByUserId(req,res){
        location.findOne({
            where:{ 'user_id':req.body.user_id },
            include:[{ model:user}]
        }).then( msg => { res.send(msg); })
    }
}