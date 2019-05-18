const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let eitem = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'eitem',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'logo': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'title': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'price': { 'type': Sequelize.DOUBLE(10), 'allowNull': true },
        'detail': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'mexam_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    eitem,
    // 查询所有
    findAndCountAll(req,res){
        eitem.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        eitem.create({
            'id':null,
            'logo':req.body.logo,
            'name':req.body.name,
            'title':req.body.title,
            'price':req.body.price,
            'detail':req.body.detail,
            'mexam_id':req.body.mexam_id,
            'condition':req.body.condition
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        eitem.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新信息
    update(req,res){
        eitem.update(
            {
                'logo':req.body.logo,
                'name':req.body.name,
                'title':req.body.title,
                'price':req.body.price,
                'detail':req.body.detail,
                'mexam_id':req.body.mexam_id,
                'condition':req.body.condition
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};