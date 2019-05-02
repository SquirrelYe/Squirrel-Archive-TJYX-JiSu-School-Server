var co = require('co');
// 导入模型
const logistic = require('../../entity/logistic').logistic;
const user = require('../../entity/user').user;
const location = require('../../entity/location').location;
// 关联对象
logistic.belongsTo(user, { foreignKey: 'user_id' });
logistic.belongsTo(location, { foreignKey: 'location_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        logistic.findAndCountAll({
            include:[{model:user}, {model:location}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        logistic.findOne({
            where:{ 'id':req.query.id },
            include:[{model:user}, {model:location}]
        }).then( msg => { res.send(msg); })
    },
    // 按user查询
    findByUserId(req,res){
        logistic.findAndCountAll({
            where:{ 'user_id':req.query.user_id },
            include:[{model:user}, {model:location}]
        }).then( msg => { res.send(msg); })
    }
}