var co = require('co');
// 导入模型
const card = require('../../entity/card').card;
const user = require('../../entity/user').user;
// 关联对象
card.belongsTo(user, { foreignKey: 'user_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        card.findAndCountAll({
            include:{model:user},
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req,res){
        card.findOne({
            where:{ 'id':req.body.id },
            include:{model:user}
        }).then( msg => { res.send(msg); })
    },
    // 按user_id查询
    findOneByUserId(req,res){
        card.findOne({
            where:{ 'user_id':req.body.user_id },
            include:{model:user}
        }).then( msg => { res.send(msg); })
    },
}