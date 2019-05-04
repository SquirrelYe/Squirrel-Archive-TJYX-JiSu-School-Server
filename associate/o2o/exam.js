var co = require('co');
// 导入模型
const eitem = require('../../entity/eitem').eitem;
const exam = require('../../entity/exam').exam
// 关联对象
eitem.belongsTo(exam, { foreignKey: 'exam_id'});
exam.hasMany(eitem)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        exam.findAndCountAll({
            include:[{ model:eitem}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        exam.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:eitem}]
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        exam.findAndCountAll({
            where:{
                'title': {
                    $like: `%${req.body.name}%`
                }
            },
            include:[{ model:eitem}]
        }).then(msg => { res.send(msg); })
    }
}