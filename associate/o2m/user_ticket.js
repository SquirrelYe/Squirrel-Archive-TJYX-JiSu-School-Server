var co = require('co');
// 导入模型
const user_ticket = require('../../entity/user_tickets').user_ticket;
const user = require('../../entity/user').user;
const ticket = require('../../entity/ticket').ticket;
// 关联对象
user_ticket.belongsTo(user, { foreignKey: 'user_id' });
user_ticket.belongsTo(ticket, { foreignKey: 'ticket_id' });

module.exports = {
  // 查询所有
  findAndCountAll(req, res) {
    user_ticket
      .findAndCountAll({
        include: [{ model: user }, { model: ticket }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按用户查询
  findAndCountAllByUser(req, res) {
    user_ticket
      .findAndCountAll({
        where: { user_id: req.body.user_id },
        include: [{ model: user }, { model: ticket }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  },
  // 按优惠券查询
  findAndCountAllByTicket(req, res) {
    user_ticket
      .findAndCountAll({
        where: { ticket_id: req.body.ticket_id },
        include: [{ model: user }, { model: ticket }],
        offset: Number(req.body.offset),
        limit: Number(req.body.limit)
      })
      .then(msg => {
        res.send(msg);
      });
  }
};
