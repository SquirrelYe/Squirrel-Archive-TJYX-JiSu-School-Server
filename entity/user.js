const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();

// 模型层定义
let user = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'user',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'id': { 'type': Sequelize.INTEGER(11), 'allowNull': true, 'primaryKey': true, 'autoIncrement': true },
        'openid': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'sessionid': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'name': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'pass': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'type': { 'type': Sequelize.INTEGER(1), 'allowNull': true },
        'mail': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'phone': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'info_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'authen_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'school_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);


module.exports = {
    // 模型实体
    user,
    // 查询所有
    findAndCountAll(req,res){
        user.findAndCountAll().then( msg => { res.send(msg) })       
    },
    //查询注册时邮箱是否被占用
    selectUsersByEmail(req,res){
        user.findAndCountAll({ 
            'where':{ 'mail':req.body.mail }
         }).then( msg=>{ res.send(msg)  })       
    },  
    //登录
    login(req,res){
        user.findOne({
            'where':{
                'name':req.body.name,
                'pass':req.body.pass
            }
        }).then( msg=>{ res.send(msg); })
    },    
    //注册用户
    create(req,res){
        user.findOrCreate({
            where: {
                'name':req.body.name,
                'mail':req.body.mail
            },
            defaults: {             
                'cname':req.body.cname,    
                'name':req.body.name,
                'pass':req.body.pass,
                'type':req.body.type,
                'mail':req.body.mail,
                'phone':req.body.phone,
                'condition':req.body.condition,
                'openid':req.body.openid,
                'sessionid':req.body.sessionid
            }
        }).then( msg=>{ res.send(msg); })
    },
    //更新密码（密码找回）
    updatePass(req,res){
        user.update(
            { 'pass':req.body.pass },
            {
                'where':{ 'mail':req.body.mail }
            }).then( msg=>{ res.send(msg); })
    },
    //删除用户
    delete(req,res){
        user.destroy(
            {
                where:{ 'id':req.body.id }
            }
        ).then( msg=>{ res.send({'affectRows':msg}); })
    },
    //更新用户信息
    update(req,res){
        user.update(
            {
                'cname':req.body.cname,    
                'name':req.body.name,
                'pass':req.body.pass,
                'type':req.body.type,
                'mail':req.body.mail,
                'phone':req.body.phone,
                'condition':req.body.condition,
                'team_id':req.body.team_id,
                'job':req.body.job,
                'openid':req.body.openid,
                'sessionid':req.body.sessionid
            },
            {   'where':{ 'id':req.body.id }
        }).then( msg=>{ res.send(msg); })
    }
};