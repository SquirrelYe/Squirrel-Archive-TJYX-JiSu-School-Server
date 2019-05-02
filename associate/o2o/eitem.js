var co = require('co');
// 导入模型
const eitem = require('../../entity/eitem').eitem;
const exam = require('../../entity/exam').exam
// 关联对象
eitem.belongsTo(exam, { foreignKey: 'exam_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        eitem.findAndCountAll({
            include:[{ model:exam}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        eitem.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:exam}]
        }).then( msg => { res.send(msg); })
    },
    // 按examid查询
    findByExamId(req,res){
        eitem.findAndCountAll({
            where:{ 'exam_id':req.body.exam_id },
            include:[{ model:exam}]
        }).then( msg => { res.send(msg); })
    },
}