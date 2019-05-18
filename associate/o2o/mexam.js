var co = require('co');
// 导入模型
const mexam = require('../../entity/mexam').mexam
const eitem = require('../../entity/eitem').eitem;
// 关联对象
eitem.belongsTo(mexam, { foreignKey: 'mexam_id'});
mexam.hasMany(eitem)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        mexam.findAndCountAll({
            include:[{ model: eitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        mexam.findOne({
            where:{ 'id':req.body.id },
            include:[{ model: eitem }],
        }).then( msg => { res.send(msg); })
    },
    // 按mexamid查询
    findByExamId(req,res){
        mexam.findAndCountAll({
            where:{ 'exam_id':req.body.exam_id },
            include:[{ model: eitem }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        mexam.findAndCountAll({
            where:{
                'title': {
                    $like: `%${req.body.title}%`
                }
            },
            include:[{ model: eitem }],
        }).then(msg => { res.send(msg); })
    }
}