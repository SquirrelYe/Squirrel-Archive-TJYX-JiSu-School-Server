const Sequelize = require('sequelize');
const conn = require('../orm/orm').connection();

// 模型层定义
let logistic = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  'logistic',
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: { type: Sequelize.INTEGER(11), allowNull: true, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER(11), allowNull: true },
    take: { type: Sequelize.INTEGER(11), allowNull: true },
    from: { type: Sequelize.CHAR(255), allowNull: true },
    location_id: { type: Sequelize.INTEGER(11), allowNull: true },
    condition: { type: Sequelize.INTEGER(11), allowNull: true },
    total: { type: Sequelize.INTEGER(11), allowNull: true },
    money: { type: Sequelize.DOUBLE(11), allowNull: true },
    icon: { type: Sequelize.CHAR(255), allowNull: true },
    key: { type: Sequelize.CHAR(255), allowNull: true },
    school_id: { type: Sequelize.INTEGER(11), allowNull: true }
  }
);

module.exports = {
  // 模型实体
  logistic,
  // 查询所有
  findAndCountAll(req, res) {
    logistic.findAndCountAll().then(msg => {
      res.send(msg);
    });
  },
  // 新建信息
  create(req, res) {
    logistic
      .create({
        id: null,
        user_id: req.body.user_id,
        take: req.body.take,
        from: req.body.from,
        location_id: req.body.location_id,
        condition: 0,
        total: req.body.total,
        money: req.body.money,
        icon: req.body.icon,
        key: req.body.key,
        school_id: req.body.school_id
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 删除信息
  delete(req, res) {
    logistic
      .destroy({
        where: { id: req.body.id }
      })
      .then(msg => {
        res.send(msg);
      });
  },
  //更新信息
  update(req, res) {
    logistic
      .update(
        {
          user_id: req.body.user_id,
          take: req.body.take,
          from: req.body.from,
          location_id: req.body.location_id,
          condition: req.body.condition,
          total: req.body.total,
          money: req.body.money,
          icon: req.body.icon,
          key: req.body.key,
          school_id: req.body.school_id
        },
        { where: { id: req.body.id } }
      )
      .then(msg => {
        res.send(msg);
      });
  }
};
