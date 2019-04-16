const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let order = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'order',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'me': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'other': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'location_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'get_at': { 'type': Sequelize.DATE(0), 'allowNull': true },
        'post_at': { 'type': Sequelize.DATE(0), 'allowNull': true },
        'accept_at': { 'type': Sequelize.DATE(0), 'allowNull': true },
        'callback_at': { 'type': Sequelize.DATE(0), 'allowNull': true },
        'me_callback': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'other_callback': { 'type': Sequelize.CHAR(255), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    order,
    // 查询所有
    findAndCountAll(req,res){
        order.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        order.create({
            'id':null,
            'me':req.query.me,
            'other':req.query.other,
            'location_id':req.query.location_id,
            'condition':req.query.condition,
            'get_at':req.query.get_at,
            'post_at':req.query.post_at,
            'accept_at':req.query.accept_at,
            'callback_at':req.query.callback_at,
            'me_callback':req.query.me_callback,
            'other_callback':req.query.other_callback
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        order.destroy(
            {
                where:{ 'id':req.query.id }
            }
        ).then( msg=>{ res.send(msg); })
    },
    //更新信息
    update(req,res){
        order.update(
            {
                'me':req.query.me,
                'other':req.query.other,
                'location_id':req.query.location_id,
                'condition':req.query.condition,
                'get_at':req.query.get_at,
                'post_at':req.query.post_at,
                'accept_at':req.query.accept_at,
                'callback_at':req.query.callback_at,
                'me_callback':req.query.me_callback,
                'other_callback':req.query.other_callback
            },
            {   'where':{ 'id':req.query.id }
        }).then( msg=>{ res.send(msg); })
    }
};