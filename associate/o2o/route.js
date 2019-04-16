var co = require('co');
// 导入模型
const route = require('../../entity/route').route;
const team = require('../../entity/team').team;
const game = require('../../entity/game').game;
// 关联对象
route.belongsTo( team, { foreignKey: 'team_id' });
route.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        route.findAndCountAll({
            include: [{ model: team },{ model: game }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        route.findOne({
            where:{ 'id':req.query.route_id },
            include: [{ model: team },{ model: game }]
        }).then( msg => { res.send(msg); })
    },
}