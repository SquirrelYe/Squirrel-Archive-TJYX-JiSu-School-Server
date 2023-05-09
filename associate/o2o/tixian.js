// 导入模型
const tixian = require('../../entity/tixian').tixian;
const user = require('../../entity/user').user;
const authen = require('../../entity/authen').authen;
const stock = require('../../entity/stock').stock;
const school = require('../../entity/school').school;
// 关联对象
tixian.belongsTo(user, { foreignKey: 'user_id' });
tixian.belongsTo(authen, { foreignKey: 'authen_id' });
tixian.belongsTo(stock, { foreignKey: 'stock_id' });
tixian.belongsTo(school, { foreignKey: 'school_id' });

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    tixian
      .findAndCountAll({
        include: [{ model: user }, { model: authen }, { model: stock }, { model: school }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按id查询
  findById(req, res) {
    tixian
      .findOne({
        where: { id: req.body.id },
        include: [{ model: user }, { model: authen }, { model: stock }, { model: school }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按user查询
  findByUserId(req, res) {
    tixian
      .findAndCountAll({
        where: { user_id: req.body.user_id },
        include: [{ model: user }, { model: authen }, { model: stock }, { model: school }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按school查询
  findBySchoolId(req, res) {
    tixian
      .findAndCountAll({
        where: { school_id: req.body.school_id },
        include: [{ model: user }, { model: authen }, { model: stock }, { model: school }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊查询 user name school
  findAndCountAllLikeByUserNameSchool(req, res) {
    tixian
      .findAndCountAll({
        include: [
          { model: user },
          {
            model: authen,
            where: {
              name: {
                $like: `%${req.body.name}%`
              },
              school_id: req.body.school_id
            }
          },
          { model: stock },
          { model: school }
        ],
        where: { school_id: req.body.school_id },
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
