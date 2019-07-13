var co = require('co');
// 导入模型
const stock = require('../../entity/stock').stock;
const user = require('../../entity/user').user
// 关联对象
stock.belongsTo(user, { foreignKey: 'user_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        stock.findAndCountAll({
            include:[{ model:user}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        stock.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:user}]
        }).then( msg => { res.send(msg); })
    },
    // 按user查询(用户)
    findByUserId(req,res){
        stock.findOne({
            where:{ 'user_id':req.body.user_id },
            include:[{ model:user}]
        }).then( msg => { 
            res.send(msg); 
            // res.status(250).send("被迫下线") 
        })
    },
}