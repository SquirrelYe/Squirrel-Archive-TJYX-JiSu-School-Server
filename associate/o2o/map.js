var co = require('co');
// 导入模型
const map = require('../../entity/map').map;
const game = require('../../entity/game').game;
// 关联对象
map.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        map.findAndCountAll({
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        map.findOne({
            where:{ 'id':req.query.map_id },
            include: { model: game }
        }).then( msg => { res.send(msg); })
    },
}