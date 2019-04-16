const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../associate/o2o/user')
const team = require('../associate/o2o/team')
const statistic = require('../associate/o2o/statistic')
const game = require('../associate/o2o/game')
const day = require('../associate/o2o/day')
const consume = require('../associate/o2o/consume')
const transaction = require('../associate/o2o/transaction')
const route = require('../associate/o2o/route')
const setting = require('../associate/o2o/setting')
const whether = require('../associate/o2o/whether')
const map = require('../associate/o2o/map')

const statistic_module = require('../associate/m2m/statistic_module')

module.exports = router

// 一对一
router.use('/user',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) user.set(req,res);
    if(req.query.judge==1) user.del(req,res);
    if(req.query.judge==2) user.findAndCountAllByType(req,res);
    if(req.query.judge==3) user.findById(req,res);
})
router.use('/team',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) team.set(req,res);
    if(req.query.judge==1) team.del(req,res);
    if(req.query.judge==2) team.findAndCountAll(req,res);
    if(req.query.judge==3) team.findById(req,res);
})
router.use('/statistic',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) statistic.findAndCountAll(req,res);
    if(req.query.judge==1) statistic.findById(req,res);
    if(req.query.judge==2) statistic.findByGameId(req,res);
})
router.use('/game',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) game.findAndCountAll(req,res);
    if(req.query.judge==1) game.findById(req,res);
    if(req.query.judge==2) game.findByCondition(req,res);
})
router.use('/day',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) day.findAndCountAll(req,res);
    if(req.query.judge==1) day.findById(req,res);
})
router.use('/consume',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) consume.findAndCountAll(req,res);
    if(req.query.judge==1) consume.findById(req,res);
})
router.use('/transaction',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) transaction.findAndCountAll(req,res);
    if(req.query.judge==1) transaction.findById(req,res);
    if(req.query.judge==2) transaction.findByMe(req,res);
    if(req.query.judge==3) transaction.findByOther(req,res);
    if(req.query.judge==4) transaction.findByMeOther(req,res);
})
router.use('/route',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) route.findAndCountAll(req,res);
    if(req.query.judge==1) route.findById(req,res);
})
router.use('/setting',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) setting.findAndCountAll(req,res);
    if(req.query.judge==1) setting.findById(req,res);
})
router.use('/whether',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) whether.findAndCountAll(req,res);
    if(req.query.judge==1) whether.findById(req,res);
})
router.use('/map',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) map.findAndCountAll(req,res);
    if(req.query.judge==1) map.findById(req,res);
})
// 一对多

// 多对多
router.use('/statistic_module',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) statistic_module.add(req,res);
    if(req.query.judge==1) statistic_module.findOrCreate(req,res);
    if(req.query.judge==2) statistic_module.update_number(req,res);
    if(req.query.judge==3) statistic_module.findAndCountAll(req,res);
})
