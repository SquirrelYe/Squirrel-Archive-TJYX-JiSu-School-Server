const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let card = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'card',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'price': { 'type': Sequelize.DOUBLE(10,2), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'phone': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'school': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'dom': { 'type': Sequelize.CHAR(255), 'allowNull': true }  ,
        'detail': { 'type': Sequelize.CHAR(255), 'allowNull': true }         
    }
);

module.exports = {
    // 模型实体
    card,
    // 查询所有
    findAndCountAll(req,res){
        card.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        card.create({
            'id':null,
            'user_id':req.body.user_id,
            'price':req.body.price,
            'condition':req.body.condition,
            'name':req.body.name,
            'phone':req.body.phone,
            'school':req.body.school,
            'dom':req.body.dom,
            'detail':req.body.detail
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        card.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新信息
    update(req,res){
        card.update(
            {
                'user_id':req.body.user_id,
                'price':req.body.price,
                'condition':req.body.condition,
                'name':req.body.name,
                'phone':req.body.phone,
                'school':req.body.school,
                'dom':req.body.dom,
                'detail':req.body.detail
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};