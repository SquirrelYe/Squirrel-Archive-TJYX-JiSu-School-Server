const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let school = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'school',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'name': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'detail': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'province': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

module.exports = {
    // 模型实体
    school,
    // 查询所有
    findAndCountAll(req,res){
        school.findAndCountAll({
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then( msg => { res.send(msg) })       
    },    
    // 新建信息
    create(req,res){
        school.create({
            'id':null,
            'name':req.body.name,
            'detail':req.body.detail,
            'province':req.body.province
        }).then( msg=>{ res.send(msg); })
    },
    // 删除信息
    delete(req,res){
        school.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新信息
    update(req,res){
        school.update(
            {
                'name':req.body.name,
                'detail':req.body.detail,
                'province':req.body.province
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    },
    // 模糊搜索 name
    findAndCountAllLikeByName(req,res){
        school.findAndCountAll({
            where:{
                'name':{
                    $like:`%${req.body.name}%`
                }
            },
        }).then(msg => { res.send(msg); })
    },
    // 获取学校列表
    findAndCountAllOnlyIdName(req,res){
        school.findAndCountAll({
        attributes:['id','name','province']
        }).then(msg => { res.send(msg); })
    }
};