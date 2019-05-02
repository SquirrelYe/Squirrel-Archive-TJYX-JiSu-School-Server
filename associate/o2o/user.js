var co = require('co');
// 导入模型
const user = require('../../entity/user').user;
const info = require('../../entity/info').info;
const authen = require('../../entity/authen').authen;
const school = require('../../entity/school').school;
const stock = require('../../entity/stock').stock;
// 关联对象
user.belongsTo(info, { foreignKey: 'info_id' });
user.belongsTo(authen, { foreignKey: 'authen_id' });
user.belongsTo(school, { foreignKey: 'school_id' });

stock.belongsTo(user,{ foreignKey: 'user_id' })
user.hasOne(stock)

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        user.findAndCountAll({
            include:[{model:info}, {model:authen}, {model:school}, {model:stock}]
        }).then( msg => { res.send(msg); })
    },
    // 按用户类型查询
    findAndCountAllByType(req,res){
        user.findAndCountAll({
            where:{ 'type':req.query.type },
            include:[{model:info}, {model:authen}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
    // 按学校查询
    findAndCountAllBySchool(req,res){
        user.findAndCountAll({
            where:{ 'school_id':req.query.school_id },
            include:[{model:info}, {model:authen}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req,res){
        user.findOne({
            where:{ 'id':req.query.user_id },
            include:[{model:info}, {model:authen}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
    // 按openidid查询
    findOneByOpenId(req,res){
        user.findOne({
            where:{ 'openid':req.query.openid },
            include:[{model:info}, {model:authen}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
}