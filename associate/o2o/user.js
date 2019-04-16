var co = require('co');
// 导入模型
const user = require('../../entity/user').user;
const team = require('../../entity/team').team;
// 关联对象
user.belongsTo(team, { foreignKey: 'team_id' });

module.exports = {
    // 绑定实体关系
    set(req, res) {
        co( function* () {
            var u = yield user.findById(req.query.user_id); 
            var t = yield team.findById(req.query.team_id)  
            yield u.setTeam(t)
            .then( msg => { res.send(msg); })
        })
    },
    // 删除实体关系
    del(req, res) {
        co( function* () {
            var u = yield user.findById(req.query.user_id); 
            yield u.setTeam(null) 
            .then( msg => { res.send(msg); })
        })
    },
    // 按type查询  localhost:11111/ass/user?judge=2&type=1
    findAndCountAllByType(req,res){
        user.findAndCountAll({
            where:{ 'type':req.query.type },
            include: { model: team }
        }).then( msg => { res.send(msg); })
    },
    // 按id查询  localhost:11111/ass/user?judge=3&user_id=1
    findById(req,res){
        user.findOne({
            where:{ 'id':req.query.user_id },
            include: { model: team }
        }).then( msg => { res.send(msg); })
    },
}