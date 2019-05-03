var co = require('co');
// 导入模型
const jitem = require('../../entity/jitem').jitem;
const journey = require('../../entity/journey').journey
// 关联对象
jitem.belongsTo(journey, { foreignKey: 'journey_id'});
journey.hasMany(jitem)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        journey.findAndCountAll({
            include:[{ model:jitem}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        journey.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:jitem}]
        }).then( msg => { res.send(msg); })
    }
}