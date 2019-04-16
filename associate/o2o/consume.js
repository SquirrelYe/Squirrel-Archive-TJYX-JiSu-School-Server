var co = require('co');
// 导入模型
const consume = require('../../entity/consume').consume;
const game = require('../../entity/game').game;
const whether = require('../../entity/whether').whether;
// 关联对象
consume.belongsTo( game, { foreignKey: 'game_id' });
consume.belongsTo( whether, { foreignKey: 'whether_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        consume.findAndCountAll({
            include: [{ model: game },{ model: whether }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        consume.findOne({
            where:{ 'id':req.query.consume_id },
            include: [{ model: game },{ model: whether }]
        }).then( msg => { res.send(msg); })
    },
}