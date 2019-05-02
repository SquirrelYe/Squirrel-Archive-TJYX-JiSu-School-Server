const express = require('express')
const router = express.Router()

// -------------实体导入-------------
const user = require('../associate/o2o/user')
const authen = require('../associate/o2o/authen')
const card = require('../associate/o2o/card')
const cart = require('../associate/o2o/cart')
const eitem = require('../associate/o2o/eitem')
const fitem = require('../associate/o2o/fitem')
const info = require('../associate/o2o/info')
const jitem = require('../associate/o2o/jitem')
const location = require('../associate/o2o/location')
const logistic = require('../associate/o2o/logistic')
const order = require('../associate/o2o/order')
const stock = require('../associate/o2o/stock')
const tran = require('../associate/o2o/transaction')


module.exports = router

// 一对一
router.use('/user',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) user.findAndCountAll(req,res);
    if(req.body.judge==1) user.findOneById(req,res);
    if(req.body.judge==2) user.findOneByOpenId(req,res);
    if(req.body.judge==3) user.findAndCountAllByType(req,res);
    if(req.body.judge==4) user.findAndCountAllBySchool(req,res);
})
router.use('/authen',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) authen.findAndCountAll(req,res);
    if(req.body.judge==1) authen.findById(req,res);
    if(req.body.judge==2) authen.findByUserId(req,res);
    if(req.body.judge==3) authen.findBySchoolId(req,res);
})
router.use('/info',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) info.findAndCountAll(req,res);
    if(req.body.judge==1) info.findById(req,res);
    if(req.body.judge==2) info.findByUserId(req,res);
})
router.use('/location',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) location.findAndCountAll(req,res);
    if(req.body.judge==1) location.findById(req,res);
    if(req.body.judge==2) location.findByUserId(req,res);
})
router.use('/card',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) card.findAndCountAll(req,res);
    if(req.body.judge==1) card.findOneById(req,res);
    if(req.body.judge==2) card.findOneByUserId(req,res);
})
router.use('/logistic',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) logistic.findAndCountAll(req,res);
    if(req.body.judge==1) logistic.findById(req,res);
    if(req.body.judge==2) logistic.findByUserId(req,res);
})
router.use('/order',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) order.findAndCountAll(req,res);
    if(req.body.judge==1) order.findById(req,res);
    if(req.body.judge==2) order.findByMe(req,res);
    if(req.body.judge==3) order.findByOther(req,res);
})
router.use('/eitem',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) eitem.findAndCountAll(req,res);
    if(req.body.judge==1) eitem.findById(req,res);
    if(req.body.judge==2) eitem.findByExamId(req,res);
})
router.use('/jitem',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) jitem.findAndCountAll(req,res);
    if(req.body.judge==1) jitem.findById(req,res);
    if(req.body.judge==2) jitem.findByJourneyId(req,res);
})
router.use('/fitem',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) fitem.findAndCountAll(req,res);
    if(req.body.judge==1) fitem.findById(req,res);
    if(req.body.judge==2) fitem.findByFruitId(req,res);
})
router.use('/cart',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) cart.findAndCountAll(req,res);
    if(req.body.judge==1) cart.findById(req,res);
    if(req.body.judge==2) cart.findByUserId(req,res);
    if(req.body.judge==3) cart.findByExam(req,res);
    if(req.body.judge==4) cart.findByJourney(req,res);
    if(req.body.judge==5) cart.findByFruit(req,res);
})
router.use('/tran',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) tran.findAndCountAll(req,res);
    if(req.body.judge==1) tran.findById(req,res);
    if(req.body.judge==2) tran.findByUserId(req,res);
    if(req.body.judge==3) tran.findByExam(req,res);
    if(req.body.judge==4) tran.findByJourney(req,res);
    if(req.body.judge==5) tran.findByFruit(req,res);
})
router.use('/stock',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(req.body.judge==0) stock.findAndCountAll(req,res);
    if(req.body.judge==1) stock.findById(req,res);
    if(req.body.judge==2) stock.findByUserId(req,res);
})