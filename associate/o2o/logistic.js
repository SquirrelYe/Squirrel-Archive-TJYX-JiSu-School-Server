var co = require('co');
// 导入模型
const logistic = require('../../entity/logistic').logistic;
const user = require('../../entity/user').user;
const location = require('../../entity/location').location;
const order = require('../../entity/order').order;
// 关联对象
logistic.belongsTo(user, { foreignKey: 'user_id' });
logistic.belongsTo(location, { foreignKey: 'location_id' });

order.belongsTo(logistic, { foreignKey: 'logistic_id' })
logistic.hasOne(order)

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        logistic.findAndCountAll({
            include: [{ model: user }, { model: location }, { model: order }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findById(req, res) {
        logistic.findOne({
            where: { 'id': req.body.id },
            include: [{ model: user }, { model: location }, { model: order }],
        }).then(msg => { res.send(msg); })
    },
    // 按user查询
    findByUserId(req, res) {
        logistic.findAndCountAll({
            where: { 'user_id': req.body.user_id },
            include: [{ model: user }, { model: location }, { model: order }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 模糊查询 name
    findAndCountAllLikeByName(req, res) {
        logistic.findAndCountAll({
            include: [ { model: location }, { model: order },
                { 
                    model: user,
                    where:{
                        'name': {
                            $like: `%${req.body.name}%`
                        }
                    } 
            }],
        }).then(msg => { res.send(msg); })
    }
}