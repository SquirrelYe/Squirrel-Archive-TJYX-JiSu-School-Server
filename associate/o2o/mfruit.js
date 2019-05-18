var co = require('co');
// 导入模型
const fruit = require('../../entity/fruit').fruit
const mfruit = require('../../entity/mfruit').mfruit
const fitem = require('../../entity/fitem').fitem;
// 关联对象
fitem.belongsTo(mfruit, { foreignKey: 'mfruit_id'});
mfruit.hasMany(fitem)
mfruit.belongsTo(fruit, { foreignKey: 'fruit_id'});
fruit.hasMany(mfruit)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        mfruit.findAndCountAll({
            include:[{ model: fitem },{ model: fruit }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        mfruit.findOne({
            where:{ 'id':req.body.id },
            include:[{ model: fitem },{ model: fruit }],
        }).then( msg => { res.send(msg); })
    },
    // 按mfruitid查询
    findByFruitId(req,res){
        mfruit.findAndCountAll({
            where:{ 'fruit_id':req.body.fruit_id },
            include:[{ model: fitem },{ model: fruit }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        mfruit.findAndCountAll({
            where:{
                'title': {
                    $like: `%${req.body.title}%`
                }
            },
            include:[{ model: fitem },{ model: fruit }],
        }).then(msg => { res.send(msg); })
    }
}