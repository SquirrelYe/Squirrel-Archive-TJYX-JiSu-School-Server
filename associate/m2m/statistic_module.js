var co = require('co');
// 导入模型
const statistic = require('../../entity/statistic').statistic;
const modul = require('../../entity/module').modul;
const statistic_module = require('../../entity/statistic_module').statistic_module;
// 关联对象 n:m
statistic.belongsToMany( modul, {'through': statistic_module} );
modul.belongsToMany( statistic, {'through': statistic_module} );

module.exports = {
    // 新创建关联 localhost:11111/ass/statistic_module?judge=0&statistic_id=1&module_id=1
    add(req, res) {
        co(function* () {
            var s = yield statistic.findById(req.query.statistic_id)
            var m = yield modul.findById(req.query.module_id);
            yield s.addModule(m)
            .then(msg => { res.send(msg); });
        })
    },
    // 查询后创建  localhost:11111/ass/statistic_module?judge=1&statistic_id=1&module_id=1
    findOrCreate(req,res){
        statistic_module.findOrCreate({
            where: {
                'statistic_id':req.query.statistic_id,
                'module_id':req.query.module_id
            },
            defaults: {                
                'id':null,
                'statistic_id':req.query.statistic_id,
                'module_id':req.query.module_id,
                'number':req.query.number
            }
        }).then(msg=>{ res.send(msg); })
    },
    // 更新数量 localhost:11111/ass/statistic_module?judge=2&statistic_module_id=1&number=2
    update_number(req,res){
        statistic_module.update(
            { 'number':req.query.number },
            { 
                'where':{ 'id':req.query.statistic_module_id }
            })
            .then(msg=>{ res.send(msg); })
    },
    // 查询所有 localhost:11111/ass/statistic_module?judge=3
    findAndCountAll(req, res) {
        statistic.findAndCountAll({
            include: { model: modul }
        }).then(msg=>{ res.send(msg); })
    }

}