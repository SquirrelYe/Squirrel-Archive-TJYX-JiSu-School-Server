const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let favorite = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'favorite',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'type': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'eitem_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'jitem_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'fitem_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
    }
);

module.exports = {
    // 模型实体
    favorite,
    // 查询所有
    findAndCountAll(req,res){
        favorite.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        favorite.create({
            'id':null,
            'type':req.body.type,
            'eitem_id':req.body.eitem_id,
            'jitem_id':req.body.jitem_id,
            'fitem_id':req.body.fitem_id,
            'user_id':req.body.user_id
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        favorite.destroy(
            { where:{ 'id':req.body.id } }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新信息
    update(req,res){
        favorite.update(
            {
                'type':req.body.type,
                'eitem_id':req.body.eitem_id,
                'jitem_id':req.body.jitem_id,
                'fitem_id':req.body.fitem_id,
                'user_id':req.body.user_id
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};