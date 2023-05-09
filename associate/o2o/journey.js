var co = require('co');
// 导入模型
const mjourney = require('../../entity/mjourney').mjourney;
const journey = require('../../entity/journey').journey;
// 关联对象
mjourney.belongsTo(journey, { foreignKey: 'journey_id' });
journey.hasMany(mjourney);

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    journey
      .findAndCountAll({
        include: [{ model: mjourney }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按id查询
  findById(req, res) {
    journey
      .findOne({
        where: { id: req.body.id },
        include: [{ model: mjourney }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊查询 name
  findAndCountAllLikeByNameSchool(req, res) {
    journey
      .findAndCountAll({
        where: {
          title: {
            $like: `%${req.body.title}%`
          },
          school_id: req.body.school_id
        },
        include: [{ model: mjourney }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 查询所有 by school
  findBySchoolId(req, res) {
    journey
      .findAndCountAll({
        include: [{ model: mjourney }],
        where: { school_id: req.body.school_id },
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
