var co = require('co');
// 导入模型
const user = require('../../entity/user').user;
const info = require('../../entity/info').info;
const authen = require('../../entity/authen').authen;
const school = require('../../entity/school').school;
const stock = require('../../entity/stock').stock;
// 关联对象
user.belongsTo(school, { foreignKey: 'school_id' });

stock.belongsTo(user, { foreignKey: 'user_id' });
user.hasOne(stock);
info.belongsTo(user, { foreignKey: 'user_id' });
user.hasOne(info);
authen.belongsTo(user, { foreignKey: 'user_id' });
user.hasOne(authen);

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    user
      .findAndCountAll({
        include: [{ model: info }, { model: authen }, { model: school }, { model: stock }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按用户类型查询
  findAndCountAllByTypeSchool(req, res) {
    user
      .findAndCountAll({
        where: { type: req.body.type, school_id: req.body.school_id },
        include: [{ model: info }, { model: authen }, { model: school }, { model: stock }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按学校查询
  findAndCountAllBySchool(req, res) {
    user
      .findAndCountAll({
        where: { school_id: req.body.school_id },
        include: [{ model: info }, { model: authen }, { model: school }, { model: stock }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按id查询
  findOneById(req, res) {
    user
      .findOne({
        where: { id: req.body.user_id },
        include: [{ model: info }, { model: authen }, { model: school }, { model: stock }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按openidid查询
  findOneByOpenId(req, res) {
    user
      .findOne({
        where: { openid: req.body.openid },
        include: [{ model: info }, { model: authen }, { model: school }, { model: stock }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊搜索 name
  findAndCountAllByTypeLikeByNameSchool(req, res) {
    user
      .findAndCountAll({
        where: {
          name: {
            $like: `%${req.body.name}%`
          },
          type: req.body.type,
          school_id: req.body.school_id
        },
        include: [{ model: info }, { model: authen }, { model: school }, { model: stock }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 查询所有校园大使
  findAndCountAllXYDS(req, res) {
    user
      .findAndCountAll({
        where: {
          type: req.body.type,
          school_id: req.body.school_id
        },
        offset: Number(req.body.offset),
        limit: Number(req.body.limit),
        include: [
          { model: info },
          {
            model: authen,
            where: {
              id: { $not: null }
            }
          },
          { model: school },
          { model: stock }
        ]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊搜索 name
  findAndCountAllXYDSByNameSchool(req, res) {
    user
      .findAndCountAll({
        where: {
          name: {
            $like: `%${req.body.name}%`
          },
          type: req.body.type,
          school_id: req.body.school_id
        },
        include: [
          { model: info },
          {
            model: authen,
            where: {
              id: { $not: null }
            }
          },
          { model: school },
          { model: stock }
        ]
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
