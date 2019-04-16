const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../entity/user')
const team = require('../entity/team')
const statistic = require('../entity/statistic')
const modul = require('../entity/module')
const game = require('../entity/game')
const day = require('../entity/day')
const consume = require('../entity/consume')
const transaction = require('../entity/transaction')
const route = require('../entity/route')
const setting = require('../entity/setting')
const whether = require('../entity/whether')
const map = require('../entity/map')

module.exports = router

// -------------接口导出-------------

// 用户&管理员
router.use('/user', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) user.findAndCountAll(req, res)
    if(req.query.judge==1) user.create(req, res)
    if(req.query.judge==2) user.delete(req,res)
    if(req.query.judge==3) user.update(req,res)
    if(req.query.judge==4) user.selectUsersByEmail(req,res)
    if(req.query.judge==5) user.selectUsersHaveTeam(req,res)
    if(req.query.judge==6) user.login(req,res)
    if(req.query.judge==7) user.updatePass(req,res)
    if(req.query.judge==8) user.findByTeamId(req,res)
});
// 团队
router.use('/team', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) team.findAndCountAll(req, res)
    if(req.query.judge==1) team.create(req, res)
    if(req.query.judge==2) team.delete(req,res)
    if(req.query.judge==3) team.update(req,res)
});
// 背包
router.use('/statistic', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) statistic.findAndCountAll(req, res)
    if(req.query.judge==1) statistic.create(req, res)
    if(req.query.judge==2) statistic.delete(req,res)
    if(req.query.judge==3) statistic.update(req,res)
    if(req.query.judge==4) statistic.deleteAllByGameId(req,res)
});
// 游戏物品
router.use('/module', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) modul.findAndCountAll(req, res)
    if(req.query.judge==1) modul.create(req, res)
    if(req.query.judge==2) modul.delete(req,res)
    if(req.query.judge==3) modul.update(req,res)
});
// 游戏系统
router.use('/game', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) game.findAndCountAll(req, res)
    if(req.query.judge==1) game.create(req, res)
    if(req.query.judge==2) game.delete(req,res)
    if(req.query.judge==3) game.update(req,res)
});
// 天数（导入25天天气信息ecxel）
router.use('/day', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) day.findAndCountAll(req, res)
    if(req.query.judge==1) day.create(req, res)
    if(req.query.judge==2) day.delete(req,res)
    if(req.query.judge==3) day.update(req,res)
});
// 不同天气消耗
router.use('/consume', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) consume.findAndCountAll(req, res)
    if(req.query.judge==1) consume.create(req, res)
    if(req.query.judge==2) consume.delete(req,res)
    if(req.query.judge==3) consume.update(req,res)
});
// 交易
router.use('/transaction', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) transaction.findAndCountAll(req, res)
    if(req.query.judge==1) transaction.create(req, res)
    if(req.query.judge==2) transaction.delete(req,res)
    if(req.query.judge==3) transaction.update(req,res)
});
// 团队历史行走路线
router.use('/route', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) route.findAndCountAll(req, res)
    if(req.query.judge==1) route.create(req, res)
    if(req.query.judge==2) route.delete(req,res)
    if(req.query.judge==3) route.update(req,res)
});
// 游戏系统设置
router.use('/setting', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) setting.findAndCountAll(req, res)
    if(req.query.judge==1) setting.create(req, res)
    if(req.query.judge==2) setting.delete(req,res)
    if(req.query.judge==3) setting.update(req,res)
});
// 天气信息
router.use('/whether', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) whether.findAndCountAll(req, res)
    if(req.query.judge==1) whether.create(req, res)
    if(req.query.judge==2) whether.delete(req,res)
    if(req.query.judge==3) whether.update(req,res)
});
// 游戏地图
router.use('/map', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) map.findAndCountAll(req, res)
    if(req.query.judge==1) map.create(req, res)
    if(req.query.judge==2) map.delete(req,res)
    if(req.query.judge==3) map.update(req,res)
});