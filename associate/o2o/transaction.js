var co = require('co');
// 导入模型
const tran = require('../../entity/transaction').tran;
const user = require('../../entity/user').user;
const eitem = require('../../entity/eitem').eitem;
const jitem = require('../../entity/jitem').jitem;
const fitem = require('../../entity/fitem').fitem;
// 关联对象
tran.belongsTo( user, { foreignKey: 'user_id' });
tran.belongsTo( eitem, { foreignKey: 'eitem_id'});
tran.belongsTo( jitem, { foreignKey: 'jiteme_id'});
tran.belongsTo( fitem, { foreignKey: 'fitem_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        tran.findAndCountAll({
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        tran.findOne({
            where:{ 'id':req.body.id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }]
        }).then( msg => { res.send(msg); })
    },
    // 按userid查询
    findByUserId(req,res){
        tran.findAndCountAll({
            where:{ 'user_id':req.body.user_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按考试查询
    findByExam(req,res){
        tran.findAndCountAll({
            where:{ 'eitem_id':req.body.eitem_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按旅游查询
    findByJourney(req,res){
        tran.findAndCountAll({
            where:{ 'jitem_id':req.body.jitem_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按水果查询
    findByFruit(req,res){
        tran.findAndCountAll({
            where:{ 'fitem_id':req.body.fitem_id },
            include: [{ model: user },{ model: eitem},{ model: jitem},{ model: fitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
}