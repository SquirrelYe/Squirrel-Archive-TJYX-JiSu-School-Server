const Sequelize = require('sequelize');
const conn = require('../orm/orm').connection();

const newerTicketNumber = 3;

// 模型层定义
let user_ticket = conn.define(
  // 默认表名（一般这里写单数），生成时会自动转换成复数形式
  // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
  'user_ticket',
  // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
  {
    id: { type: Sequelize.INTEGER(11), allowNull: true, primaryKey: true, autoIncrement: true },
    user_id: { type: Sequelize.INTEGER(11), allowNull: true },
    ticket_id: { type: Sequelize.INTEGER(11), allowNull: true },
    condition: { type: Sequelize.INTEGER(11), allowNull: true }
  }
);

module.exports = {
  // 模型实体
  user_ticket,
  // 查询所有
  findAndCountAll(req, res) {
    user_ticket.findAndCountAll().then(msg => {
      res.send(msg);
    });
  },
  // 新建信息
  create(req, res) {
    user_ticket
      .create({
        id: null,
        user_id: req.body.user_id,
        ticket_id: req.body.ticket_id,
        condition: req.body.condition
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 删除信息
  delete(req, res) {
    user_ticket.destroy({ where: { id: req.body.id } }).then(msg => {
      res.send({ affectRows: msg });
    });
  },
  // 更新信息
  update(req, res) {
    user_ticket
      .update(
        {
          user_id: req.body.user_id,
          ticket_id: req.body.ticket_id,
          condition: req.body.condition
        },
        { where: { id: req.body.id } }
      )
      .then(msg => {
        res.send(msg);
      });
  },
  // 新用户获取优惠券
  ticket(uid, tid, c) {
    return user_ticket.create({ id: null, user_id: uid, ticket_id: tid, condition: c });
  },
  async newerGetTicket(req, res) {
    for (let i = 0; i < newerTicketNumber; i++) {
      await this.ticket(req.body.user_id, req.body.ticket_id, req.body.condition).catch(err => {
        res.send({ code: -1 });
        return;
      });
    }
    res.send({ code: 1 });
  }
};
