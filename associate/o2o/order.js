var co = require('co');
// 导入模型
const order = require('../../entity/order').order;
const user = require('../../entity/user').user;
const logistic = require('../../entity/logistic').logistic;
// 关联对象
order.belongsTo(user, { foreignKey: 'me',as:'cus' });
order.belongsTo(user, { foreignKey: 'other',as:'tak' });
order.belongsTo(logistic, { foreignKey: 'logistic_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        order.findAndCountAll({
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:logistic}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        order.findOne({
            where:{ 'id':req.query.id },
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:logistic}]
        }).then( msg => { res.send(msg); })
    },
    // 按user查询(用户)
    findByMe(req,res){
        order.findAndCountAll({
            where:{ 'me':req.query.me },
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:logistic}]
        }).then( msg => { res.send(msg); })
    },
    // 按user查询(校园大使)
    findByOther(req,res){
        order.findAndCountAll({
            where:{ 'me':req.query.other },
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:logistic}]
        }).then( msg => { res.send(msg); })
    }
}