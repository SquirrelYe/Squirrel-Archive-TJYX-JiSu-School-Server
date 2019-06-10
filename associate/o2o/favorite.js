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
    }
}