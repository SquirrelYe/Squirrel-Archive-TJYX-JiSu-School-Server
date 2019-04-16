var co = require('co');
// 导入模型
const day = require('../../entity/day').day;
const game = require('../../entity/game').game;
// 关联对象
day.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        day.findAndCountAll({
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        day.findOne({
            where:{ 'id':req.query.game_id },
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
}