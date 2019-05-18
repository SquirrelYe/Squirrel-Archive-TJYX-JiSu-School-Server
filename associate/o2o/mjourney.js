var co = require('co');
// 导入模型
const journey = require('../../entity/journey').journey;
const mjourney = require('../../entity/mjourney').mjourney
const jitem = require('../../entity/jitem').jitem;
// 关联对象
jitem.belongsTo(mjourney, { foreignKey: 'mjourney_id'});
mjourney.hasMany(jitem)
mjourney.belongsTo(journey, { foreignKey: 'journey_id'});
journey.hasMany(mjourney)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        mjourney.findAndCountAll({
            include:[{ model: jitem },{ model: journey }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        mjourney.findOne({
            where:{ 'id':req.body.id },
            include:[{ model: jitem },{ model: journey }],
        }).then( msg => { res.send(msg); })
    },
    // 按mjourneyid查询
    findByJourneyId(req,res){
        mjourney.findAndCountAll({
            where:{ 'journey_id':req.body.journey_id },
            include:[{ model: jitem },{ model: journey }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        mjourney.findAndCountAll({
            where:{
                'title': {
                    $like: `%${req.body.title}%`
                }
            },
            include:[{ model: jitem },{ model: journey }],
        }).then(msg => { res.send(msg); })
    }
}