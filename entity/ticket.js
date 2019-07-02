const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let ticket = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'ticket',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'title': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'start': { 'type': Sequelize.DATE(0), 'allowNull': true },
        'end': { 'type': Sequelize.DATE(0), 'allowNull': true },
        'fill': { 'type': Sequelize.DOUBLE(11), 'allowNull': true },
        'short': { 'type': Sequelize.DOUBLE(11), 'allowNull': true },
        'details': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'school_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
    }
);

module.exports = {
    // 模型实体
    ticket,
    // 查询所有
    findAndCountAll(req,res){
        ticket.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        ticket.create({
            'id':null,
            'title':req.body.title,
            'start':req.body.start,
            'end':req.body.end,
            'fill':req.body.fill,
            'short':req.body.short,
            'details':req.body.details,
            'school_id':req.body.school_id,
            'condition':req.body.condition
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        ticket.destroy(
            { where:{ 'id':req.body.id } }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        ticket.update(
            {
                'title':req.body.title,
                'start':req.body.start,
                'end':req.body.end,
                'fill':req.body.fill,
                'short':req.body.short,
                'details':req.body.details,
                'school_id':req.body.school_id,
                'condition':req.body.condition
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    },
    // 查询新用户优惠券 by school_id condition type
    findOneBySchoolConditionType(req,res){
        ticket.findOne({
            'where':{ 
                'school_id':req.body.school_id,
                'condition':req.body.condition,
                'type':req.body.type
            }
        }).then( msg=>{ res.send(msg); })
    }
};