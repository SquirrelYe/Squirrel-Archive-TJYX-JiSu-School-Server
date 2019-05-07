var co = require('co');
// 导入模型
const jitem = require('../../entity/jitem').jitem;
const journey = require('../../entity/journey').journey
// 关联对象
jitem.belongsTo(journey, { foreignKey: 'journey_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        jitem.findAndCountAll({
            include:[{ model:journey}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        jitem.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:journey}]
        }).then( msg => { res.send(msg); })
    },
    // 按examid查询
    findByJourneyId(req,res){
        jitem.findAndCountAll({
            where:{ 'journey_id':req.body.journey_id },
            include:[{ model:journey}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        jitem.findAndCountAll({
            where:{
                'name': {
                    $like: `%${req.body.name}%`
                }
            },
            include:[{ model:journey}],
        }).then(msg => { res.send(msg); })
    }
}