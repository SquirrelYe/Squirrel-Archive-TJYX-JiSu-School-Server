var co = require('co');
// 导入模型
const exam = require('../../entity/exam').exam
const mexam = require('../../entity/mexam').mexam
// 关联对象
mexam.belongsTo(exam, { foreignKey: 'exam_id'});
exam.hasMany(mexam)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        exam.findAndCountAll({
            include:[{ model:mexam}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        exam.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:mexam}]
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
            include:[{ model:mexam}]
        }).then(msg => { res.send(msg); })
    }
}