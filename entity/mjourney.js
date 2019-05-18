const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let mjourney = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'mjourney',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'journey_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'title': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    mjourney,
    // 查询所有
    findAndCountAll(req,res){
        mjourney.findAndCountAll().then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        mjourney.create({
            'id':null,
            'journey_id':req.body.journey_id,
            'title':req.body.title,
            'condition':req.body.condition
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        mjourney.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新信息
    update(req,res){
        mjourney.update(
            {
                'title':req.body.title,
                'condition':req.body.condition,
                'journey_id':req.body.journey_id
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};