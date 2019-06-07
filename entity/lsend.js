const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let lsend = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'lsend',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'take': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'location_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'weight': { 'type': Sequelize.DOUBLE(11), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'phone': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'arrive': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'money': { 'type': Sequelize.DOUBLE(11), 'allowNull': true },
        'code': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'school_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
    }
);

module.exports = {
    // 模型实体
    lsend,
    // 查询所有
    findAndCountAll(req,res){
        lsend.findAndCountAll({
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg) })       
    },
    // 新建信息
    create(req,res){
        lsend.create({
            'id': null,
            'user_id': req.body.user_id,
            'take': req.body.take,
            'location_id': req.body.location_id,
            'condition': req.body.condition,
            'weight': req.body.weight,
            'name': req.body.name,
            'phone': req.body.phone,
            'arrive': req.body.arrive,
            'money': req.body.money,
            'code': req.body.code,
            'school_id': req.body.school_id,
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        lsend.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        lsend.update(
            {
                'user_id': req.body.user_id,
                'take': req.body.take,
                'location_id': req.body.location_id,
                'condition': req.body.condition,
                'weight': req.body.weight,
                'name': req.body.name,
                'phone': req.body.phone,
                'arrive': req.body.arrive,
                'money': req.body.money,
                'code': req.body.code,
                'school_id': req.body.school_id
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};