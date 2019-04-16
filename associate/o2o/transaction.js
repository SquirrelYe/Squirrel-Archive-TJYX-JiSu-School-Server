var co = require('co');
// 导入模型
const transaction = require('../../entity/transaction').transaction;
const game = require('../../entity/game').game;
const team = require('../../entity/team').team;
const modul = require('../../entity/module').modul;
// 关联对象
transaction.belongsTo( game, { foreignKey: 'game_id' });
transaction.belongsTo( team, { foreignKey: 'me',as:'out' });
transaction.belongsTo( team, { foreignKey: 'other',as:'in' });
transaction.belongsTo( modul, { foreignKey: 'module_id' });

module.exports = {
    // 查询所有 localhost:11111/ass/transaction?judge=0
    findAndCountAll(req,res){
        transaction.findAndCountAll({
            include: [{ model: game },{ model: team,as:'out' },{ model: team,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询 localhost:11111/ass/transaction?judge=1&transaction_id=1
    findById(req,res){
        transaction.findOne({
            where:{ 'id':req.query.transaction_id },
            include: [{ model: game },{ model: team,as:'out' },{ model: team,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按me_id查询 localhost:11111/ass/transaction?judge=2&team_id=1
    findByMe(req,res){
        transaction.findAndCountAll({
            where:{ 'me':req.query.team_id },
            include: [{ model: game },{ model: team,as:'out' },{ model: team,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按other_id查询 localhost:11111/ass/transaction?judge=3&team_id=1
    findByOther(req,res){
        transaction.findAndCountAll({
            where:{ 'other':req.query.team_id },
            include: [{ model: game },{ model: team,as:'out' },{ model: team,as:'in' },{ model: modul }]
        }).then( msg => { res.send(msg); })
    },
    // 按other_id查询 localhost:11111/ass/transaction?judge=4&team_id=1
    findByMeOther(req,res){
        transaction.findAndCountAll({
            where:{ 
                    $or:[
                        {'me':req.query.team_id},
                        {'other':req.query.team_id}
                    ] 
                },
                include: [{ model: game },{ model: team,as:'out' },{ model: team,as:'in' },{ model: modul }]
            }).then( msg => { res.send(msg); })
    },
}