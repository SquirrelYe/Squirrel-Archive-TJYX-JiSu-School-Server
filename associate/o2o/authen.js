var co = require('co');
// 导入模型
const authen = require('../../entity/authen').authen;
const user = require('../../entity/user').user;
const school = require('../../entity/school').school;
// 关联对象
authen.belongsTo(user, { foreignKey: 'user_id'});
authen.belongsTo(school, { foreignKey: 'school_id'});

module.exports = {
    // 查询所有
    findAndCountAll(req,res){
        authen.findAndCountAll({
            include:[{ model:user}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
    // 按id查询
    findById(req,res){
        authen.findOne({
            where:{ 'id':req.body.id },
            include:[{ model:user}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
    // 按user查询(用户)
    findByUserId(req,res){
        authen.findOne({
            where:{ 'user_id':req.body.user_id },
            include:[{ model:user}, {model:school}]
        }).then( msg => { res.send(msg); })
    },
    // 按school查询
    findBySchoolId(req,res){
        authen.findAndCountAll({
            where:{ 'school_id':req.body.school_id },
            include:[{ model:user}, {model:school}]
        }).then( msg => { res.send(msg); })
    }
}