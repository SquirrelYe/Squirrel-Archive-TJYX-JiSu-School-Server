const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let logistic = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'logistic',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'user_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'location_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'total': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'money': { 'type': Sequelize.DOUBLE(11), 'allowNull': true },
        'time': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'log_from': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'log_to': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'key': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    logistic,
    // 查询所有
    findAndCountAll(req,res){
        logistic.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        logistic.create({
            'id':null,
            'user_id':req.query.user_id,
            'location_id':req.query.location_id,
            'condition':req.query.condition,
            'total':req.query.total,
            'money':req.query.money,
            'time':req.query.time,
            'log_from':req.query.log_from,
            'log_to':req.query.log_to,
            'key':req.query.key
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        logistic.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        logistic.update(
            {
                'user_id':req.query.user_id,
                'location_id':req.query.location_id,
                'condition':req.query.condition,
                'total':req.query.total,
                'money':req.query.money,
                'time':req.query.time,
                'log_from':req.query.log_from,
                'log_to':req.query.log_to,
                'key':req.query.key
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};