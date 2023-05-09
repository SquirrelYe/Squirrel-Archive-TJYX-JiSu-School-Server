const Sequelize = require('sequelize');
const conn = require('../orm/orm').connection();

// 模型层定义
let info = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  'info',
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: { type: Sequelize.INTEGER(11), allowNull: true, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER(11), allowNull: true },
    nickName: { type: Sequelize.CHAR(255), allowNull: true },
    avatarUrl: { type: Sequelize.CHAR(255), allowNull: true },
    gender: { type: Sequelize.INTEGER(11), allowNull: true },
    province: { type: Sequelize.CHAR(255), allowNull: true },
    city: { type: Sequelize.CHAR(255), allowNull: true },
    country: { type: Sequelize.CHAR(255), allowNull: true }
  }
);

module.exports = {
  // 模型实体
  info,
  // 查询所有
  findAndCountAll(req, res) {
    info.findAndCountAll().then(msg => {
      res.send(msg);
    });
  },
  // 新建信息
  create(req, res) {
    info
      .create({
        id: null,
        user_id: req.body.user_id,
        nickName: req.body.nickName,
        avatarUrl: req.body.avatarUrl,
        gender: req.body.gender,
        province: req.body.province,
        city: req.body.city,
        country: req.body.country
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 删除信息
  delete(req, res) {
    info
      .destroy({
        where: { id: req.body.id }
      })
      .then(msg => {
        res.send(msg);
      });
  },
  //更新信息
  update(req, res) {
    info
      .update(
        {
          user_id: req.body.user_id,
          nickName: req.body.nickName,
          avatarUrl: req.body.avatarUrl,
          gender: req.body.gender,
          province: req.body.province,
          city: req.body.city,
          country: req.body.country
        },
        { where: { id: req.body.id } }
      )
      .then(msg => {
        res.send(msg);
      });
  }
};
