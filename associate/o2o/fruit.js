var co = require('co');
// 导入模型
const fitem = require('../../entity/fitem').fitem;
const fruit = require('../../entity/fruit').fruit
// 关联对象
fitem.belongsTo(fruit, { foreignKey: 'fruit_id'});
fruit.hasMany(fitem)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        fruit.findAndCountAll({
            include:[{ model:fitem}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        fruit.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:fitem}]
        }).then( msg => { res.send(msg); })
    }
}