var co = require('co');
// 导入模型
const fruit = require('../../entity/fruit').fruit
const mfruit = require('../../entity/mfruit').mfruit;
// 关联对象
mfruit.belongsTo(fruit, { foreignKey: 'fruit_id'});
fruit.hasMany(mfruit)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        fruit.findAndCountAll({
            include:[{ model:mfruit}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        fruit.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:mfruit}]
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByNameSchool(req, res) {
        fruit.findAndCountAll({
            where:{
                'title': {
                    $like: `%${req.body.title}%`
                },
                'school_id': req.body.school_id
            },
            include:[{ model:mfruit}],
        }).then(msg => { res.send(msg); })
    },
    // 查询所有 by school 
    findBySchoolId(req,res){
        fruit.findAndCountAll({
            include:[{ model:mfruit}],
            where:{ 'school_id': req.body.school_id },
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    }
}