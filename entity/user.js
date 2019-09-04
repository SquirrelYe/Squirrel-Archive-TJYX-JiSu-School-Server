const Sequelize = require('sequelize')
const conn = require('../orm/orm').connection();
const jwt = require('jsonwebtoken')
const secret = require('../utils/key/secret').token

const db = require('../redis/redis')

const info = require('./info').info;
const authen = require('./authen').authen;
const school = require('./school').school;
const stock = require('./stock').stock;

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
        'type': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'mail': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'phone': { 'type': Sequelize.CHAR(255), 'allowNull': true },
        'school_id': { 'type': Sequelize.INTEGER(11), 'allowNull': true },
        'condition': { 'type': Sequelize.INTEGER(11), 'allowNull': true }
    }
);

user.belongsTo(school, { foreignKey: 'school_id' });

stock.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(stock)
info.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(info)
authen.belongsTo(user, { foreignKey: 'user_id' })
user.hasOne(authen)

module.exports = {
    // 模型实体
    user,
    // 查询所有
    findAndCountAll(req, res) {
        user.findAndCountAll().then(msg => { res.send(msg) })
    },
    //查询注册时邮箱是否被占用
    selectUsersByEmail(req, res) {
        user.findAndCountAll({
            'where': { 'mail': req.body.mail }
        }).then(msg => { res.send(msg) })
    },
    //登录
    login(req, res) {
        user.findOne({
                'where': {
                    'name': req.body.name,
                    'pass': req.body.pass
                },
                include: [{ model: info }, { model: authen }, { model: school }, { model: stock }],
            })
            .then(msg => {
                if (msg) {
                    // 利用openid 生成token 并返回 token
                    const { id, openid } = msg.dataValues
                    let encrp = jwt.sign({ openid }, secret, { expiresIn: '1h' })
                    let data = {...msg.dataValues, token: encrp }
                        // redis保存登录态
                    console.log('redis', id, encrp)
                    db.set(`tjyxlogin-${id}`, encrp, null, (err, result) => {
                        if (err) {
                            res.status(251).send("redis服务器异常！！！");
                        } else {
                            res.send(data)
                        }
                    })
                } else res.status(432).send("登录校验失败")
            })
            .catch(err => {
                console.error(err)
            })
    },
    //注册管理员
    create(req, res) {
        user.findOrCreate({
            where: {
                'name': req.body.name,
                'mail': req.body.mail
            },
            defaults: {
                'openid': req.body.openid,
                'sessionid': req.body.sessionid,
                'name': req.body.name,
                'pass': req.body.pass,
                'type': req.body.type,
                'mail': req.body.mail,
                'phone': req.body.phone,
                'condition': req.body.condition,
                'school_id': req.body.school_id,
            }
        }).then(msg => { res.send(msg); })
    },
    //更新密码（密码找回）
    updatePass(req, res) {
        user.update({ 'pass': req.body.pass }, {
            'where': { 'mail': req.body.mail }
        }).then(msg => { res.send(msg); })
    },
    //删除用户
    delete(req, res) {
        user.destroy({
            where: { 'id': req.body.id }
        }).then(msg => { res.send({ 'affectRows': msg }); })
    },
    //更新用户信息
    update(req, res) {
        user.update({
            'openid': req.body.openid,
            'sessionid': req.body.sessionid,
            'name': req.body.name,
            'pass': req.body.pass,
            'type': req.body.type,
            'mail': req.body.mail,
            'phone': req.body.phone,
            'condition': req.body.condition,
            'school_id': req.body.school_id,
        }, {
            'where': { 'id': req.body.id }
        }).then(msg => { res.send(msg); })
    },
    // 注册用户
    cusCreate(req, res) {
        user.findOrCreate({
            where: {
                'phone': req.body.phone
            },
            defaults: {
                'openid': req.body.openid,
                'sessionid': req.body.sessionid,
                'name': req.body.name,
                'pass': req.body.pass,
                'type': 0,
                'mail': req.body.mail,
                'phone': req.body.phone,
                'condition': 0,
                'school_id': req.body.school_id,
            }
        }).then(msg => { res.send(msg); })
    },
    // 用户登录
    cusLogin(req, res) {
        user.findOne({
                'where': {
                    'phone': req.body.phone,
                    'pass': req.body.pass
                },
                include: [{ model: info }, { model: authen }, { model: school }, { model: stock }],
            })
            .then(msg => {
                if (msg) {
                    // 利用openid 生成token 并返回 token
                    const { id, openid } = msg.dataValues
                    let encrp = jwt.sign({ openid }, secret, { expiresIn: '1h' })
                    let data = {...msg.dataValues, token: encrp }
                        // redis保存登录态
                    console.log('redis', id, encrp)
                    db.set(`tjyxlogin-${id}`, encrp, null, (err, result) => {
                        if (err) {
                            res.status(251).send("redis服务器异常！！！");
                        } else {
                            res.send(data)
                        }
                    })
                } else res.status(432).send("登录校验失败")
            })
    },
};