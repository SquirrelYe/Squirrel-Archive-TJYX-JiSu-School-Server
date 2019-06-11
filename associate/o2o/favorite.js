var co = require('co');
// 导入模型
const favorite = require('../../entity/favorite').favorite;
const eitem = require('../../entity/eitem').eitem;
const jitem = require('../../entity/jitem').jitem;
const fitem = require('../../entity/fitem').fitem;
const user = require('../../entity/user').user;
// 关联对象
favorite.belongsTo( eitem, { foreignKey: 'eitem_id'});
favorite.belongsTo( jitem, { foreignKey: 'jitem_id'});
favorite.belongsTo( fitem, { foreignKey: 'fitem_id' });
favorite.belongsTo( user, { foreignKey: 'user_id' });

module.exports = {
    // 查询所有
    findAndCountAllByUser(req,res){
        favorite.findAndCountAll({
            include: [{ model: eitem },{ model: jitem},{ model: fitem },{  model: user }],
            where:{ 'user_id':req.body.user_id},
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 查询所有考试是否加入收藏
    CountExamByUser(req,res){
        favorite.findOne({
            where:{ 'user_id':req.body.user_id, 'eitem_id':req.body.eitem_id }
        }).then( msg => { res.send(msg); })
    },
    // 查询所有旅游是否加入收藏
    CountJourneyByUser(req,res){
        favorite.findOne({
            where:{ 'user_id':req.body.user_id, 'jitem_id':req.body.jitem_id }
        }).then( msg => { res.send(msg); })
    },
    // 查询所有水果是否加入收藏
    CountFruitByUser(req,res){
        favorite.findOne({
            where:{ 'user_id':req.body.user_id, 'fitem_id':req.body.fitem_id }
        }).then( msg => { res.send(msg); })
    }
}