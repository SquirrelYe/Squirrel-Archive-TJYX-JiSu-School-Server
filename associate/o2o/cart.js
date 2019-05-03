var co = require('co');
// 导入模型
const cart = require('../../entity/cart').cart;
const user = require('../../entity/user').user;
const eitem = require('../../entity/eitem').eitem;
const jitem = require('../../entity/jitem').jitem;
const fitem = require('../../entity/fitem').fitem;
// 关联对象
cart.belongsTo( user, { foreignKey: 'user_id' });
cart.belongsTo( eitem, { foreignKey: 'eitem_id'});
cart.belongsTo( jitem, { foreignKey: 'jiteme_id'});
cart.belongsTo( fitem, { foreignKey: 'fitem_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        cart.findAndCountAll({
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        cart.findOne({
            where:{ 'id':req.body.id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }]
        }).then( msg => { res.send(msg); })
    },
    // 按userid查询
    findByUserId(req,res){
        cart.findAndCountAll({
            where:{ 'user_id':req.body.user_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按考试查询
    findByExam(req,res){
        cart.findAndCountAll({
            where:{ 'eitem_id':req.body.eitem_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按旅游查询
    findByJourney(req,res){
        cart.findAndCountAll({
            where:{ 'jitem_id':req.body.jitem_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按水果查询
    findByFruit(req,res){
        cart.findAndCountAll({
            where:{ 'fitem_id':req.body.fitem_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    }
}