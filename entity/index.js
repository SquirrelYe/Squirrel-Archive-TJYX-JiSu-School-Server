const Sequelize = require('sequelize');
const conn = require('../orm/orm').connection();

// 模型层定义
let index = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  'index',
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: { type: Sequelize.INTEGER(11), allowNull: true, primaryKey: true, autoIncrement: true },
    type: { type: Sequelize.INTEGER(11), allowNull: true },
    icon: { type: Sequelize.CHAR(255), allowNull: true },
    kind: { type: Sequelize.INTEGER(11), allowNull: true },
    eitem_id: { type: Sequelize.INTEGER(11), allowNull: true },
    jitem_id: { type: Sequelize.INTEGER(11), allowNull: true },
    fitem_id: { type: Sequelize.INTEGER(11), allowNull: true },
    condition: { type: Sequelize.INTEGER(11), allowNull: true },
    school_id: { type: Sequelize.INTEGER(11), allowNull: true }
  }
);

module.exports = {
  // 模型实体
  index,
  // 查询所有
  findAndCountAll(req, res) {
    index.findAndCountAll().then(msg => {
      res.send(msg);
    });
  },
  // 新建信息
  create(req, res) {
    index
      .create({
        id: null,
        type: req.body.type,
        icon: req.body.icon,
        kind: req.body.kind,
        eitem_id: req.body.eitem_id,
        jitem_id: req.body.jitem_id,
        fitem_id: req.body.fitem_id,
        condition: req.body.condition,
        school_id: req.body.school_id
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 删除信息
  delete(req, res) {
    index
      .destroy({
        where: { id: req.body.id }
      })
      .then(msg => {
        res.send({ affectRows: msg });
      });
  },
  //更新信息
  update(req, res) {
    index
      .update(
        {
          type: req.body.type,
          icon: req.body.icon,
          kind: req.body.kind,
          eitem_id: req.body.eitem_id,
          jitem_id: req.body.jitem_id,
          fitem_id: req.body.fitem_id,
          condition: req.body.condition,
          school_id: req.body.school_id
        },
        { where: { id: req.body.id } }
      )
      .then(msg => {
        res.send(msg);
      });
  }
};
