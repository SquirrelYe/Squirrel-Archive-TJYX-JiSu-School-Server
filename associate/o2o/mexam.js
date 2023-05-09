var co = require('co');
// 导入模型
const exam = require('../../entity/exam').exam;
const mexam = require('../../entity/mexam').mexam;
const eitem = require('../../entity/eitem').eitem;
// 关联对象
eitem.belongsTo(mexam, { foreignKey: 'mexam_id' });
mexam.hasMany(eitem);
mexam.belongsTo(exam, { foreignKey: 'exam_id' });
exam.hasMany(mexam);

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    mexam
      .findAndCountAll({
        include: [{ model: eitem }, { model: exam }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按id查询
  findById(req, res) {
    mexam
      .findOne({
        where: { id: req.body.id },
        include: [{ model: eitem }, { model: exam }]
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按mexamid查询
  findByExamId(req, res) {
    mexam
      .findAndCountAll({
        where: { exam_id: req.body.exam_id },
        include: [{ model: eitem }, { model: exam }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 查询所有 by school
  findBySchoolId(req, res) {
    mexam
      .findAndCountAll({
        include: [{ model: eitem }, { model: exam }],
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
    mexam
      .findAndCountAll({
        where: {
          title: {
            $like: `%${req.body.title}%`
          },
          school_id: req.body.school_id
        },
        include: [{ model: eitem }, { model: exam }]
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
