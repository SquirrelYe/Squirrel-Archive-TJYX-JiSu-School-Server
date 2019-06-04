const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let activity = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'activity',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'type': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'title': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'icon': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'detail': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'school_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    activity,
    // 查询所有
    findAndCountAllBySchool(req,res){
        activity.findAndCountAll({
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            where:{ 'school_id':req.body.school_id },
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg) })       
    },
    // 新建信息
    create(req,res){
        activity.create({
            'id':null,
            'type':req.body.type,
            'title':req.body.title,
            'icon':req.body.icon,
            'detail':req.body.detail,
            'condition':req.body.condition,
            'school_id':req.body.school_id
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        activity.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新信息
    update(req,res){
        activity.update(
            {
                'type':req.body.type,
                'title':req.body.title,
                'icon':req.body.icon,
                'detail':req.body.detail,
                'condition':req.body.condition,
                'school_id':req.body.school_id
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    },
    // 模糊搜索 name
    findAndCountAllLikeByTitleSchool(req,res){
        activity.findAndCountAll({
            where:{
                'title':{
                    $like:`%${req.body.title}%`
                },
                'school_id':req.body.school_id
            },
        }).then(msg => { res.send(msg); })
    },
    // 学校、类型查找
    findAndCountAllBySchoolType(req,res){
        activity.findAndCountAll({
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            where:{ 'school_id':req.body.school_id, 'type':req.body.type },
            order:[['updated_at', 'DESC']]
        }).then( msg => { res.send(msg) })       
    },
};