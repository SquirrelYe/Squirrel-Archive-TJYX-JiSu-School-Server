var co = require('co');
// 导入模型
const card = require('../../entity/card').card;
const user = require('../../entity/user').user;
const location = require('../../entity/location').location;
// 关联对象
card.belongsTo(user, { foreignKey: 'user_id' });
card.belongsTo(location, { foreignKey: 'location_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        card.findAndCountAll({
            include: [{ model: user }, { model: location }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req, res) {
        card.findOne({
            where: { 'id': req.body.id },
            include: [{ model: user }, { model: location }],
        }).then(msg => { res.send(msg); })
    },
    // 按user_id查询
    findAllByUserId(req, res) {
        card.findAndCountAll({
            where: { 'user_id': req.body.user_id },
            include: [{ model: user }, { model: location }],
        }).then(msg => { res.send(msg); })
    },
    // 模糊查询 location.name
    findAndCountAllLikeByName(req, res) {
        card.findAndCountAll({            
            include: [{ model: user }, 
                { 
                    model: location,
                    where:{
                        'name': {
                            $like: `%${req.body.name}%`
                        }
                    } 
            }],
        }).then(msg => { res.send(msg); })
    }
}