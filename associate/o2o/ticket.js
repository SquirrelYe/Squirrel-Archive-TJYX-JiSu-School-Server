var co = require('co');
// 导入模型
const school = require('../../entity/school').school;
const ticket = require('../../entity/ticket').ticket;
// 关联对象
ticket.belongsTo(school, { foreignKey: 'school_id' });

module.exports = {
    // 查询所有
    findAndCountAll(req, res) {
        ticket.findAndCountAll({
            include: [{ model: school }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按id查询
    findOneById(req, res) {
        ticket.findById({
            include: [{ model: school }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    },
    // 按学校查询
    findAndCountAllBySchool(req, res) {
        ticket.findAndCountAll({
            where: { 'school_id': req.body.school_id },
            include: [{ model: school }],
            offset: Number(req.body.offset),
            limit: Number(req.body.limit),
        }).then(msg => { res.send(msg); })
    }
}