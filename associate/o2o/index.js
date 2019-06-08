var co = require('co');
// 导入模型
const index = require('../../entity/index').index;
const eitem = require('../../entity/eitem').eitem;
const jitem = require('../../entity/jitem').jitem;
const fitem = require('../../entity/fitem').fitem;
const school = require('../../entity/school').school;
// 关联对象
index.belongsTo( eitem, { foreignKey: 'eitem_id'});
index.belongsTo( jitem, { foreignKey: 'jitem_id'});
index.belongsTo( fitem, { foreignKey: 'fitem_id' });
index.belongsTo( school, { foreignKey: 'school_id' });

module.exports = {
    // 查询所有
    findAndCountAllBySchool(req,res){
        index.findAndCountAll({
            include: [{ model: eitem },{ model: jitem},{ model: fitem },{  model: school }],
            where:{ 'school_id':req.body.school_id},
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        index.findOne({
            where:{ 'id':req.body.id },
            include: [{ model: eitem },{ model: jitem},{ model: fitem },{  model: school }],
        }).then( msg => { res.send(msg); })
    }
}