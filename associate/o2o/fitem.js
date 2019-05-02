var co = require('co');
// 导入模型
const fitem = require('../../entity/fitem').fitem;
const fruit = require('../../entity/fruit').fruit
// 关联对象
fitem.belongsTo(fruit, { foreignKey: 'fruit_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        fitem.findAndCountAll({
            include:[{ model:fruit}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        fitem.findOne({
            where:{ 'id':req.query.id },
            include:[{ model:fruit}]
        }).then( msg => { res.send(msg); })
    },
    // 按examid查询
    findByFruitId(req,res){
        fitem.findAndCountAll({
            where:{ 'exam_id':req.query.exam_id },
            include:[{ model:fruit}]
        }).then( msg => { res.send(msg); })
    },
}