var co = require('co');
// 导入模型
const setting = require('../../entity/setting').setting;
const user = require('../../entity/user').user;
const game = require('../../entity/game').game;
// 关联对象
setting.belongsTo( user, { foreignKey: 'user_id' });
setting.belongsTo( game, { foreignKey: 'game_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        setting.findAndCountAll({
            include: [{ model: user },{ model: game }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        setting.findOne({
            where:{ 'id':req.query.setting_id },
            include: [{ model: user },{ model: game }]
        }).then( msg => { res.send(msg); })
    },
}