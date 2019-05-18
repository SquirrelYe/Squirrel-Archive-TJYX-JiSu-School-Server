var co = require('co');
// 导入模型
const fitem = require('../../entity/fitem').fitem;
const mfruit = require('../../entity/mfruit').mfruit
// 关联对象
fitem.belongsTo(mfruit, { foreignKey: 'mfruit_id'});
mfruit.hasMany(fitem)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        fitem.findAndCountAll({
            include:[{ model:mfruit}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        fitem.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:mfruit}]
        }).then( msg => { res.send(msg); })
    },
    // 按mfruit_id查询
    findByMfruitId(req,res){
        fitem.findAndCountAll({
            where:{ 'mfruit_id':req.body.mfruit_id },
            include:[{ model:mfruit}],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        fitem.findAndCountAll({
            where:{
                'title': {
                    $like: `%${req.body.name}%`
                }
            },
            include:[{ model:mfruit}],
        }).then(msg => { res.send(msg); })
    }
}