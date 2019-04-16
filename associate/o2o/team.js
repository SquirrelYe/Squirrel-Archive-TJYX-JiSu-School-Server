var co = require('co');
// 导入模型
const team = require('../../entity/team').team;
const game = require('../../entity/game').game;
// 关联对象
team.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 绑定实体关系
    set(req, res) {
        co( function* () {
            var m = yield team.findById(req.query.team_id); 
            var o = yield game.findById(req.query.game_id)  
            yield m.setGame(o)
            .then( msg => { res.send(msg); })
        })
    },
    // 删除实体关系
    del(req, res) {
        co( function* () {
            var m = yield team.findById(req.query.team_id); 
            yield m.setGame(null) 
            .then( msg => { res.send(msg); })
        })
    }, 
    // 查询所有  localhost:11111/ass/team?judge=2
    findAndCountAll(req,res){
        team.findAndCountAll({
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
    // 按id查询  localhost:11111/ass/team?judge=3&team_id=1
    findById(req,res){
        team.findOne({
            where:{ 'id':req.query.team_id },
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
}