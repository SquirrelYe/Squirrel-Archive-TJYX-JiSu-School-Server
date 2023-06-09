var co = require('co');
// 导入模型
const logistic = require('../../entity/logistic').logistic;
const user = require('../../entity/user').user;
const location = require('../../entity/location').location;
const info = require('../../entity/info').info;
// 关联对象
logistic.belongsTo(user, { foreignKey: 'user_id', as: 'cus' });
logistic.belongsTo(user, { foreignKey: 'take', as: 'tak' });
logistic.belongsTo(location, { foreignKey: 'location_id' });

info.belongsTo(user, { foreignKey: 'user_id' });
user.hasOne(info);

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    logistic
      .findAndCountAll({
        include: [{ model: user, as: 'cus' }, { model: user, as: 'tak' }, { model: location }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按id查询
  findById(req, res) {
    logistic
      .findOne({
        where: { id: req.body.id },
        include: [{ model: user, as: 'cus' }, { model: user, as: 'tak' }, { model: location }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按user查询
  findByUserId(req, res) {
    logistic
      .findAndCountAll({
        where: { user_id: req.body.user_id },
        include: [{ model: user, as: 'cus' }, { model: user, as: 'tak' }, { model: location }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊查询 name
  findAndCountAllLikeByName(req, res) {
    logistic
      .findAndCountAll({
        include: [
          {
            model: user,
            as: 'cus',
            where: {
              name: {
                $like: `%${req.body.name}%`
              }
            }
          },
          { model: user, as: 'tak' },
          { model: location }
        ]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按school查询
  findBySchoolId(req, res) {
    logistic
      .findAndCountAll({
        where: { school_id: req.body.school_id, condition: { $notIn: [-1] } },
        include: [
          {
            model: user,
            as: 'cus',
            include: [{ model: info }]
          },
          { model: user, as: 'tak' },
          { model: location }
        ],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit),
        order: [
          ['condition', 'ASC'],
          ['updated_at', 'DESC']
        ]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按school condition查询
  findBySchoolIdCondition(req, res) {
    logistic
      .findAndCountAll({
        where: { school_id: req.body.school_id, condition: req.body.condition },
        include: [
          {
            model: user,
            as: 'cus',
            include: [{ model: info }]
          },
          { model: user, as: 'tak' },
          { model: location }
        ],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit),
        order: [
          ['condition', 'ASC'],
          ['updated_at', 'DESC']
        ]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按take查询
  findByTake(req, res) {
    logistic
      .findAndCountAll({
        where: { take: req.body.take },
        include: [{ model: user, as: 'cus', include: [{ model: info }] }, { model: user, as: 'tak' }, { model: location }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
