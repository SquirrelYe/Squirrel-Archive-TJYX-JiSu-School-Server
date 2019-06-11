var co = require('co');
// 导入模型
const cart = require('../../entity/cart').cart;
const user = require('../../entity/user').user;
const info = require('../../entity/info').info;
const card = require('../../entity/card').card;
const lsend = require('../../entity/lsend').lsend;
const logistic = require('../../entity/logistic').logistic;
const eitem = require('../../entity/eitem').eitem;
const jitem = require('../../entity/jitem').jitem;
const fitem = require('../../entity/fitem').fitem;
const location = require('../../entity/location').location;
const ticket = require('../../entity/ticket').ticket;
// 关联对象
cart.belongsTo( user, { foreignKey: 'user_id' });
cart.belongsTo( card, { foreignKey: 'card_id'});
cart.belongsTo( lsend, { foreignKey: 'lsend_id'});
cart.belongsTo( logistic, { foreignKey: 'logistic_id'});
cart.belongsTo( eitem, { foreignKey: 'eitem_id'});
cart.belongsTo( jitem, { foreignKey: 'jitem_id'});
cart.belongsTo( fitem, { foreignKey: 'fitem_id' });
cart.belongsTo( location, { foreignKey: 'location_id' });
cart.belongsTo( ticket, { foreignKey: 'ticket_id' });

logistic.belongsTo(user, { foreignKey: 'take' });
lsend.belongsTo(user, { foreignKey: 'take' });
info.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(info)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        cart.findAndCountAll({
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        cart.findOne({
            where:{ 'id':req.body.id },
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
        }).then( msg => { res.send(msg); })
    },
    // 按userid查询 订单信息
    findTranByUserId(req,res){
        cart.findAndCountAll({
            where:{ 'user_id':req.body.user_id, 'condition':{ $notIn:[0]} },// 0.仅显示订单信息，不包含 0（购物车）
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按考试查询
    findByExam(req,res){
        cart.findAndCountAll({
            where:{ 'eitem_id':req.body.eitem_id },
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按旅游查询
    findByJourney(req,res){
        cart.findAndCountAll({
            where:{ 'jitem_id':req.body.jitem_id },
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按水果查询
    findByFruit(req,res){
        cart.findAndCountAll({
            where:{ 'fitem_id':req.body.fitem_id },
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按状态condition查询 （去除快递订单，仅包含 考试、水果、旅游）
    findByCondition(req,res){
        cart.findAndCountAll({
            where:{ 
                'judgec':req.body.judgec, // 订单状态*（0.未发货、1.已发货、2.已完成、3.已评价、-1.订单取消）
                'type':{ $in:[0,1,2]},  // 0.考试，1.旅游，2.水果
                'user_id':req.body.user_id,
                'condition':{ $notIn:[0]}   // 过滤 0 购物车
            },
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按userid查询 购物车信息
    findCartByUserId(req,res){
        cart.findAndCountAll({
            where:{ 'user_id':req.body.user_id, 'condition':{ $in:[0]} },// 0.仅显示购物车信息
            include: [{ model: user },{ model: card},{ model: lsend,include:[{ model: user}] },{  model: logistic,include:[{ model: user}] },{ model: eitem},{ model: jitem},{ model: fitem },{ model: location },{ model: ticket }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 查询考试评价
    findExamCallBack(req,res){
        cart.findAndCountAll({
            where:{ 'eitem_id':req.body.eitem_id, 'callback':{ $ne: null } },
            include: [{ model: user,include:[{ model: info}] },{ model: eitem},{ model: location }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 查询旅游评价
    findJourneyCallBack(req,res){
        cart.findAndCountAll({
            where:{ 'jitem_id':req.body.jitem_id, 'callback':{ $ne: null } },
            include: [{ model: user,include:[{ model: info}] },{ model: jitem},{ model: location }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 查询水果评价
    findFruitCallBack(req,res){
        cart.findAndCountAll({
            where:{ 'fitem_id':req.body.fitem_id, 'callback':{ $ne: null } },
            include: [{ model: user,include:[{ model: info}] },{ model: fitem},{ model: location }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
}