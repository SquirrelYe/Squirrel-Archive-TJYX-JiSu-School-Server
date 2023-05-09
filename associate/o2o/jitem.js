var co = require('co');
// 导入模型
const jitem = require('../../entity/jitem').jitem;
const mjourney = require('../../entity/mjourney').mjourney;
// 关联对象
jitem.belongsTo(mjourney, { foreignKey: 'mjourney_id' });
mjourney.hasMany(jitem);

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    jitem
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
    jitem
      .findOne({
        where: { id: req.body.id },
        include: [{ model: mjourney }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按mjourney_id查询
  findByMjourneyId(req, res) {
    jitem
      .findAndCountAll({
        where: { mjourney_id: req.body.mjourney_id },
        include: [{ model: mjourney }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 查询所有 by school
  findBySchoolId(req, res) {
    jitem
      .findAndCountAll({
        include: [{ model: mjourney }],
        where: { school_id: req.body.school_id },
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 模糊查询 name
  findAndCountAllLikeByNameSchool(req, res) {
    jitem
      .findAndCountAll({
        where: {
          name: {
            $like: `%${req.body.name}%`
          },
          school_id: req.body.school_id
        },
        include: [{ model: mjourney }]
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
