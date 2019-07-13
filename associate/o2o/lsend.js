var co = require('co');
// 导入模型
const lsend = require('../../entity/lsend').lsend;
const user = require('../../entity/user').user;
const location = require('../../entity/location').location;
const school = require('../../entity/school').school;
const info = require('../../entity/info').info;
// 关联对象
lsend.belongsTo(user, { foreignKey: 'user_id' ,as:'cus'  });
lsend.belongsTo(user, { foreignKey: 'take' ,as:'tak' });
lsend.belongsTo(location, { foreignKey: 'location_id' });
lsend.belongsTo(school, { foreignKey: 'school_id' });

info.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(info)

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        lsend.findAndCountAll({
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:location}, {model:school} ],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findById(req, res) {
        lsend.findOne({
            where: { 'id': req.body.id },
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:location}, {model:school} ],
        }).then(msg => { res.send(msg); })
    },
    // 按user查询
    findByUserId(req, res) {
        lsend.findAndCountAll({
            where: { 'user_id': req.body.user_id },
            include:[{ model:user,as:'cus'}, {model:user,as:'tak'}, {model:location}, {model:school} ],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按school查询
    findBySchoolId(req, res) {
        lsend.findAndCountAll({
            where: { 'school_id': req.body.school_id, 'condition':{ $notIn:[-1]} },
            include:[{ 
                model:user,
                as:'cus',
                include:[{ model: info }]
            }, {model:user,as:'tak'}, {model:location}, {model:school} ],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
            order:[['condition', 'ASC'],['updated_at', 'DESC']]
        }).then(msg => { res.send(msg); })
    },
    // 模糊查询 cus name
    findAndCountAllLikeByCusName(req, res) {
        lsend.findAndCountAll({
            include: [
                { 
                    model: user,
                    as:'cus',
                    where:{
                        'name': {
                            $like: `%${req.body.name}%`
                        }
                    } 
            }, {model:user,as:'tak'}, {model:location}, {model:school} ],
            where: { 'school_id': req.body.school_id },
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 模糊查询 tak name
    findAndCountAllLikeByTakName(req, res) {
        lsend.findAndCountAll({
            include: [ {model:user,as:'cus'},{
                model: user,
                as:'tak',
                where:{
                    'name': {
                        $like: `%${req.body.name}%`
                    }
                } 
            }, {model:location}, {model:school} ],
            where: { 'school_id': req.body.school_id },
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按take查询
    findByTake(req, res) {
        lsend.findAndCountAll({
            where: { 'take': req.body.take },
            include:[{ model:user,as:'cus',include:[{ model: info}] }, {model:user,as:'tak'}, {model:location}, {model:school} ],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
}