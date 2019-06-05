const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = require('../utils/key/secret').interface  // token 密钥

// -------------实体导入-------------
const user = require('../associate/o2o/user')
const authen = require('../associate/o2o/authen')
const info = require('../associate/o2o/info')
const card = require('../associate/o2o/card')
const cart = require('../associate/o2o/cart')
const exam = require('../associate/o2o/exam')
const mexam = require('../associate/o2o/mexam')
const eitem = require('../associate/o2o/eitem')
const fruit = require('../associate/o2o/fruit')
const mfruit = require('../associate/o2o/mfruit')
const fitem = require('../associate/o2o/fitem')
const journey = require('../associate/o2o/journey')
const mjourney = require('../associate/o2o/mjourney')
const jitem = require('../associate/o2o/jitem')
const location = require('../associate/o2o/location')
const logistic = require('../associate/o2o/logistic')
const order = require('../associate/o2o/order')
const stock = require('../associate/o2o/stock')
const tran = require('../associate/o2o/transaction')
const lsend = require('../associate/o2o/lsend')
const tixian = require('../associate/o2o/tixian')


module.exports = router
// 解密
router.use((req, res, next) => {
    if(req.body.ceshi) next();
    else{
        let encrp = req.body.data
        jwt.verify(encrp, secret, (err, dec) => {
            if (err) res.status(430).send(`接口请求参数解密失败,${err}`)
            else {
                req.body = {...dec }  //  'school_id':req.get("school_id") 
                next()
            }
        })
    }
})
// 一对一
router.use('/user', function (req, res) {
    if (req.body.judge == 0) user.findAndCountAll(req, res);
    if (req.body.judge == 1) user.findOneById(req, res);
    if (req.body.judge == 2) user.findOneByOpenId(req, res);
    if (req.body.judge == 3) user.findAndCountAllByTypeSchool(req, res);
    if (req.body.judge == 4) user.findAndCountAllBySchool(req, res);
    if (req.body.judge == 5) user.findAndCountAllByTypeLikeByNameSchool(req, res);
    if (req.body.judge == 6) user.findAndCountAllXYDS(req, res);
    if (req.body.judge == 7) user.findAndCountAllXYDSByNameSchool(req, res);
})
router.use('/authen', function (req, res) {
    if (req.body.judge == 0) authen.findAndCountAll(req, res);
    if (req.body.judge == 1) authen.findById(req, res);
    if (req.body.judge == 2) authen.findByUserId(req, res);
    if (req.body.judge == 3) authen.findBySchoolId(req, res);
    if (req.body.judge == 4) authen.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/info', function (req, res) {
    if (req.body.judge == 0) info.findAndCountAll(req, res);
    if (req.body.judge == 1) info.findById(req, res);
    if (req.body.judge == 2) info.findByUserId(req, res);
})
router.use('/location', function (req, res) {
    if (req.body.judge == 0) location.findAndCountAll(req, res);
    if (req.body.judge == 1) location.findById(req, res);
    if (req.body.judge == 2) location.findByUserId(req, res);
})
router.use('/card', function (req, res) {
    if (req.body.judge == 0) card.findAndCountAllBySchool(req, res);
    if (req.body.judge == 1) card.findOneById(req, res);
    if (req.body.judge == 2) card.findAllByUserId(req, res);
    if (req.body.judge == 3) card.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/logistic', function (req, res) {
    if (req.body.judge == 0) logistic.findAndCountAll(req, res);
    if (req.body.judge == 1) logistic.findById(req, res);
    if (req.body.judge == 2) logistic.findByUserId(req, res);
    if (req.body.judge == 3) logistic.findAndCountAllLikeByName(req, res);
    if (req.body.judge == 4) logistic.findBySchoolId(req, res);
    if (req.body.judge == 5) logistic.findBySchoolIdCondition(req, res);
})
router.use('/lsend', function (req, res) {
    if (req.body.judge == 0) lsend.findAndCountAll(req, res);
    if (req.body.judge == 1) lsend.findById(req, res);
    if (req.body.judge == 2) lsend.findByUserId(req, res);
    if (req.body.judge == 3) lsend.findBySchoolId(req, res);
    if (req.body.judge == 4) lsend.findAndCountAllLikeByCusName(req, res);
    if (req.body.judge == 5) lsend.findAndCountAllLikeByTakName(req, res);
})
router.use('/order', function (req, res) {
    if (req.body.judge == 0) order.findAndCountAll(req, res);
    if (req.body.judge == 1) order.findById(req, res);
    if (req.body.judge == 2) order.findByMe(req, res);
    if (req.body.judge == 3) order.findByOther(req, res);
})
router.use('/exam', function (req, res) {
    if (req.body.judge == 0) exam.findAndCountAll(req, res);
    if (req.body.judge == 1) exam.findById(req, res);
    if (req.body.judge == 2) exam.findAndCountAllLikeByNameSchool(req, res);
    if (req.body.judge == 3) exam.findBySchoolId(req, res);
})
router.use('/mexam', function (req, res) {
    if (req.body.judge == 0) mexam.findAndCountAll(req, res);
    if (req.body.judge == 1) mexam.findById(req, res);
    if (req.body.judge == 2) mexam.findByExamId(req, res);
    if (req.body.judge == 3) mexam.findBySchoolId(req, res);
    if (req.body.judge == 4) mexam.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/eitem', function (req, res) {
    if (req.body.judge == 0) eitem.findAndCountAll(req, res);
    if (req.body.judge == 1) eitem.findById(req, res);
    if (req.body.judge == 2) eitem.findByMexamId(req, res);
    if (req.body.judge == 3) eitem.findBySchoolId(req, res);
    if (req.body.judge == 4) eitem.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/journey', function (req, res) {
    if (req.body.judge == 0) journey.findAndCountAll(req, res);
    if (req.body.judge == 1) journey.findById(req, res);
    if (req.body.judge == 2) journey.findAndCountAllLikeByNameSchool(req, res);
    if (req.body.judge == 3) journey.findBySchoolId(req, res);
})
router.use('/mjourney', function (req, res) {
    if (req.body.judge == 0) mjourney.findAndCountAll(req, res);
    if (req.body.judge == 1) mjourney.findById(req, res);
    if (req.body.judge == 2) mjourney.findByJourneyId(req, res);
    if (req.body.judge == 3) mjourney.findBySchoolId(req, res);
    if (req.body.judge == 4) mjourney.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/jitem', function (req, res) {
    if (req.body.judge == 0) jitem.findAndCountAll(req, res);
    if (req.body.judge == 1) jitem.findById(req, res);
    if (req.body.judge == 2) jitem.findByMjourneyId(req, res);
    if (req.body.judge == 3) jitem.findBySchoolId(req, res);
    if (req.body.judge == 4) jitem.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/fruit', function (req, res) {
    if (req.body.judge == 0) fruit.findAndCountAll(req, res);
    if (req.body.judge == 1) fruit.findById(req, res);
    if (req.body.judge == 2) fruit.findAndCountAllLikeByNameSchool(req, res);
    if (req.body.judge == 3) fruit.findBySchoolId(req, res);
})
router.use('/mfruit', function (req, res) {
    if (req.body.judge == 0) mfruit.findAndCountAll(req, res);
    if (req.body.judge == 1) mfruit.findById(req, res);
    if (req.body.judge == 2) mfruit.findByFruitId(req, res);
    if (req.body.judge == 3) mfruit.findBySchoolId(req, res);
    if (req.body.judge == 4) mfruit.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/fitem', function (req, res) {
    if (req.body.judge == 0) fitem.findAndCountAll(req, res);
    if (req.body.judge == 1) fitem.findById(req, res);
    if (req.body.judge == 2) fitem.findByMfruitId(req, res);
    if (req.body.judge == 3) fitem.findBySchoolId(req, res);
    if (req.body.judge == 4) fitem.findAndCountAllLikeByNameSchool(req, res);
})
router.use('/cart', function (req, res) {
    if (req.body.judge == 0) cart.findAndCountAll(req, res);
    if (req.body.judge == 1) cart.findById(req, res);
    if (req.body.judge == 2) cart.findTranByUserId(req, res);
    if (req.body.judge == 3) cart.findByExam(req, res);
    if (req.body.judge == 4) cart.findByJourney(req, res);
    if (req.body.judge == 5) cart.findByFruit(req, res);
    if (req.body.judge == 6) cart.findByCondition(req, res);
    if (req.body.judge == 7) cart.findCartByUserId(req, res);
})
router.use('/tran', function (req, res) {
    if (req.body.judge == 0) tran.findAndCountAll(req, res);
    if (req.body.judge == 1) tran.findById(req, res);
    if (req.body.judge == 2) tran.findByUserId(req, res);
    if (req.body.judge == 3) tran.findByExam(req, res);
    if (req.body.judge == 4) tran.findByJourney(req, res);
    if (req.body.judge == 5) tran.findByFruit(req, res);
})
router.use('/stock', function (req, res) {
    if (req.body.judge == 0) stock.findAndCountAll(req, res);
    if (req.body.judge == 1) stock.findById(req, res);
    if (req.body.judge == 2) stock.findByUserId(req, res);
})
router.use('/tixian', function (req, res) {
    if (req.body.judge == 0) tixian.findAndCountAll(req, res);
    if (req.body.judge == 1) tixian.findById(req, res);
    if (req.body.judge == 2) tixian.findByUserId(req, res);
    if (req.body.judge == 3) tixian.findBySchoolId(req, res);
    if (req.body.judge == 4) tixian.findAndCountAllLikeByUserNameSchool(req, res);
})