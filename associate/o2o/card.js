var co = require('co');
// 导入模型
const card = require('../../entity/card').card;
const user = require('../../entity/user').user;
// 关联对象
card.belongsTo(user, { foreignKey: 'user_id' });

module.exports = {
  // 查询所有
  findAndCountAllBySchool(req, res) {
    card
      .findAndCountAll({
        include: [{ model: user }],
        where: { school: req.body.school_id, condition: { $notIn: [-1] } },
        order: [
          ['condition', 'ASC'],
          ['updated_at', 'DESC']
        ],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按id查询
  findOneById(req, res) {
    card
      .findOne({
        where: { id: req.body.id },
        include: [{ model: user }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按user_id查询
  findAllByUserId(req, res) {
    card
      .findAndCountAll({
        where: { user_id: req.body.user_id },
        include: [{ model: user }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊查询 location.name school
  findAndCountAllLikeByNameSchool(req, res) {
    card
      .findAndCountAll({
        include: [{ model: user }],
        where: {
          name: {
            $like: `%${req.body.name}%`
          },
          school: req.body.school_id
        }
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
