const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let tran = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'tran',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'type': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'number': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'eitem_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'jitem_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'fitem_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    tran,
    // 查询所有
    findAndCountAll(req,res){
        tran.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        tran.create({
            'id':null,
            'user_id':req.query.user_id,
            'type':req.query.type,
            'number':req.query.number,
            'eitem_id':req.query.eitem_id,
            'jitem_id':req.query.jitem_id,
            'fitem_id':req.query.fitem_id,
            'condition':req.query.condition
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        tran.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        tran.update(
            {
                'user_id':req.query.user_id,
                'type':req.query.type,
                'number':req.query.number,
                'eitem_id':req.query.eitem_id,
                'jitem_id':req.query.jitem_id,
                'fitem_id':req.query.fitem_id,
                'condition':req.query.condition
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};