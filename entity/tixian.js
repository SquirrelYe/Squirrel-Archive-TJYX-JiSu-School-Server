const Sequelize = require('sequelize');
const conn = require('../orm/orm').connection();

// 模型层定义
let tixian = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  'tixian',
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: { type: Sequelize.INTEGER(11), allowNull: true, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER(11), allowNull: true },
    authen_id: { type: Sequelize.INTEGER(11), allowNull: true },
    stock_id: { type: Sequelize.INTEGER(11), allowNull: true },
    condition: { type: Sequelize.INTEGER(11), allowNull: true },
    money: { type: Sequelize.DOUBLE(11), allowNull: true },
    school_id: { type: Sequelize.INTEGER(11), allowNull: true }
  }
);

module.exports = {
  // 模型实体
  tixian,
  // 查询所有
  findAndCountAll(req, res) {
    tixian
      .findAndCountAll({
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 新建信息
  create(req, res) {
    tixian
      .create({
        id: null,
        user_id: req.body.user_id,
        authen_id: req.body.authen_id,
        stock_id: req.body.stock_id,
        condition: req.body.condition,
        money: req.body.money,
        school_id: req.body.school_id
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 删除信息
  delete(req, res) {
    tixian
      .destroy({
        where: { id: req.body.id }
      })
      .then(msg => {
        res.send(msg);
      });
  },
  //更新信息
  update(req, res) {
    tixian
      .update(
        {
          user_id: req.body.user_id,
          authen_id: req.body.authen_id,
          stock_id: req.body.stock_id,
          condition: req.body.condition,
          money: req.body.money,
          school_id: req.body.school_id
        },
        { where: { id: req.body.id } }
      )
      .then(msg => {
        res.send(msg);
      });
  }
};
