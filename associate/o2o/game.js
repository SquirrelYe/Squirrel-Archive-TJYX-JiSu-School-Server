var co = require('co');
// 导入模型
const game = require('../../entity/game').game;
const day = require('../../entity/day').day;
const user = require('../../entity/user').user;
const setting = require('../../entity/setting').setting;
const map = require('../../entity/map').map;
// 关联对象
game.belongsTo( day, { foreignKey: 'day_id' });
game.belongsTo( user, { foreignKey: 'user_id' });
game.belongsTo( setting, { foreignKey: 'setting_id' });
game.belongsTo( map, { foreignKey: 'map_id' });

module.exports = {
    // 查询所有 localhost:11111/ass/game?judge=0
    findAndCountAll(req,res){
        game.findAndCountAll({
            include: [{ model: day },{ model : user },{ model : setting },{ model : map }] 
        }).then( msg => { res.send(msg); })
    },
    // 按id查询 localhost:11111/ass/game?judge=1&game_id=1
    findById(req,res){
        game.findOne({
            where:{ 'id':req.query.game_id },
            include: [{ model: day },{ model : user },{ model : setting },{ model : map }]
        }).then( msg => { res.send(msg); })
    },
    // 按condition查询 localhost:11111/ass/game?judge=2&condition=1
    findByCondition(req,res){
        game.findAndCountAll({
            where:{ 'condition':req.query.condition },
            include: [{ model: day },{ model : user },{ model : setting },{ model : map }]
        }).then( msg => { res.send(msg); })
    },
}