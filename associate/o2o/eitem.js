var co = require('co');
// 导入模型
const eitem = require('../../entity/eitem').eitem;
const mexam = require('../../entity/mexam').mexam
// 关联对象
eitem.belongsTo(mexam, { foreignKey: 'mexam_id'});
mexam.hasMany(eitem)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        eitem.findAndCountAll({
            include:[{ model:mexam}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        eitem.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:mexam}]
        }).then( msg => { res.send(msg); })
    },
    // 按mexamid查询
    findByMexamId(req,res){
        eitem.findAndCountAll({
            where:{ 'mexam_id':req.body.mexam_id },
            include:[{ model:mexam}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 查询所有 by school 
    findBySchoolId(req,res){
        eitem.findAndCountAll({
            include:[{ model:mexam}],
            where:{ 'school_id': req.body.school_id },
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByNameSchool(req, res) {
        eitem.findAndCountAll({
            where:{
                'name': {
                    $like: `%${req.body.name}%`
                },
                'school_id': req.body.school_id
            },
            include:[{ model:mexam}]
        }).then(msg => { res.send(msg); })
    }
}