const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let authen = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'authen',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'school_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'xuehao': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'phone': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'card': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'rz_icon': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    authen,
    // 查询所有
    findAndCountAll(req,res){
        authen.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        authen.create({
            'id':null,
            'user_id':req.body.user_id,
            'condition':0,
            'name':req.body.name,
            'school_id':req.body.school_id,
            'xuehao':req.body.xuehao,
            'phone':req.body.phone,
            'card':req.body.card,
            'rz_icon':req.body.rz_icon
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        authen.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        authen.update(
            {
                'user_id':req.body.user_id,
                'condition':req.body.condition,
                'name':req.body.name,
                'school_id':req.body.school_id,
                'xuehao':req.body.xuehao,
                'phone':req.body.phone,
                'card':req.body.card,
                'rz_icon':req.body.rz_icon
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};