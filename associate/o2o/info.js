var co = require('co');
// 导入模型
const info = require('../../entity/info').info;
const user = require('../../entity/user').user;
// 关联对象
info.belongsTo(user, { foreignKey: 'user_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        info.findAndCountAll({
            include:[{ model:user}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        info.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:user}]
        }).then( msg => { res.send(msg); })
    },
    // 按user查询(用户)
    findByUserId(req,res){
        info.findOne({
            where:{ 'user_id':req.body.user_id },
            include:[{ model:user}]
        }).then( msg => { res.send(msg); })
    },
}