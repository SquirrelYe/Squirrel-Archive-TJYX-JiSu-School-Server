const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../entity/user')
const authen = require('../entity/authen')
const card = require('../entity/card')
const cart = require('../entity/cart')
const eitem = require('../entity/eitem')
const exam = require('../entity/exam')
const fitem = require('../entity/fitem')
const fruit = require('../entity/fruit')
const info = require('../entity/info')
const jitem = require('../entity/jitem')
const journey = require('../entity/journey')
const location = require('../entity/location')
const logistic = require('../entity/logistic')
const order = require('../entity/order')
const school = require('../entity/school')
const stock = require('../entity/stock')
const tran = require('../entity/transaction')


module.exports = router

// -------------接口导出-------------

// 用户&管理员
router.use('/user', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) user.findAndCountAll(req,res)
    if(req.query.judge==1) user.create(req,res)
    if(req.query.judge==2) user.delete(req,res)
    if(req.query.judge==3) user.update(req,res)
    if(req.query.judge==4) user.selectUsersByEmail(req,res)
    if(req.query.judge==5) user.login(req,res)
    if(req.query.judge==6) user.updatePass(req,res)
});
// 学校
router.use('/school', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) school.findAndCountAll(req, res)
    if(req.query.judge==1) school.create(req, res)
    if(req.query.judge==2) school.delete(req,res)
    if(req.query.judge==3) school.update(req,res)
});
// 认证信息
router.use('/authen', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) authen.findAndCountAll(req, res)
    if(req.query.judge==1) authen.create(req, res)
    if(req.query.judge==2) authen.delete(req,res)
    if(req.query.judge==3) authen.update(req,res)
});
// 用户信息
router.use('/info', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) info.findAndCountAll(req, res)
    if(req.query.judge==1) info.create(req, res)
    if(req.query.judge==2) info.delete(req,res)
    if(req.query.judge==3) info.update(req,res)
});
// 地址信息
router.use('/location', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) location.findAndCountAll(req, res)
    if(req.query.judge==1) location.create(req, res)
    if(req.query.judge==2) location.delete(req,res)
    if(req.query.judge==3) location.update(req,res)
});
// 开卡信息
router.use('/card', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) card.findAndCountAll(req, res)
    if(req.query.judge==1) card.create(req, res)
    if(req.query.judge==2) card.delete(req,res)
    if(req.query.judge==3) card.update(req,res)
});
// 快递信息
router.use('/logistic', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) logistic.findAndCountAll(req, res)
    if(req.query.judge==1) logistic.create(req, res)
    if(req.query.judge==2) logistic.delete(req,res)
    if(req.query.judge==3) logistic.update(req,res)
});
// 跑腿订单信息
router.use('/order', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) order.findAndCountAll(req, res)
    if(req.query.judge==1) order.create(req, res)
    if(req.query.judge==2) order.delete(req,res)
    if(req.query.judge==3) order.update(req,res)
});
// 考试一级信息
router.use('/exam', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) exam.findAndCountAll(req, res)
    if(req.query.judge==1) exam.create(req, res)
    if(req.query.judge==2) exam.delete(req,res)
    if(req.query.judge==3) exam.update(req,res)
});
// 考试二级信息
router.use('/eitem', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) eitem.findAndCountAll(req, res)
    if(req.query.judge==1) eitem.create(req, res)
    if(req.query.judge==2) eitem.delete(req,res)
    if(req.query.judge==3) eitem.update(req,res)
});
// 旅游一级信息
router.use('/journey', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) journey.findAndCountAll(req, res)
    if(req.query.judge==1) journey.create(req, res)
    if(req.query.judge==2) journey.delete(req,res)
    if(req.query.judge==3) journey.update(req,res)
});
// 旅游二级信息
router.use('/jitem', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) jitem.findAndCountAll(req, res)
    if(req.query.judge==1) jitem.create(req, res)
    if(req.query.judge==2) jitem.delete(req,res)
    if(req.query.judge==3) jitem.update(req,res)
});
// 水果一级信息
router.use('/fruit', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) fruit.findAndCountAll(req, res)
    if(req.query.judge==1) fruit.create(req, res)
    if(req.query.judge==2) fruit.delete(req,res)
    if(req.query.judge==3) fruit.update(req,res)
});
// 水果二级信息
router.use('/fitem', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) fitem.findAndCountAll(req, res)
    if(req.query.judge==1) fitem.create(req, res)
    if(req.query.judge==2) fitem.delete(req,res)
    if(req.query.judge==3) fitem.update(req,res)
});
// 购物车信息
router.use('/cart', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) cart.findAndCountAll(req, res)
    if(req.query.judge==1) cart.create(req, res)
    if(req.query.judge==2) cart.delete(req,res)
    if(req.query.judge==3) cart.update(req,res)
});
// 总订单信息
router.use('/tran', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) tran.findAndCountAll(req, res)
    if(req.query.judge==1) tran.create(req, res)
    if(req.query.judge==2) tran.delete(req,res)
    if(req.query.judge==3) tran.update(req,res)
});
// 资金信息
router.use('/stock', function (req, res) { 
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.query.judge==0) stock.findAndCountAll(req, res)
    if(req.query.judge==1) stock.create(req, res)
    if(req.query.judge==2) stock.delete(req,res)
    if(req.query.judge==3) stock.update(req,res)
});