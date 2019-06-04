const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = require('../utils/key/secret').interface  // token 密钥

// -------------实体导入-------------
const user = require('../entity/user')
const authen = require('../entity/authen')
const card = require('../entity/card')
const cart = require('../entity/cart')
const eitem = require('../entity/eitem')
const exam = require('../entity/exam')
const mexam = require('../entity/mexam')
const fitem = require('../entity/fitem')
const fruit = require('../entity/fruit')
const mfruit = require('../entity/mfruit')
const info = require('../entity/info')
const jitem = require('../entity/jitem')
const journey = require('../entity/journey')
const mjourney = require('../entity/mjourney')
const location = require('../entity/location')
const logistic = require('../entity/logistic')
const order = require('../entity/order')
const school = require('../entity/school')
const stock = require('../entity/stock')
const tran = require('../entity/transaction')
const lsend = require('../entity/lsend')
const tixian = require('../entity/tixian')
const activity = require('../entity/activity')


module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{

    if(req.body.ceshi) next();
    else{
        let encrp =req.body.data
        jwt.verify(encrp, secret, (err, dec) => {
            if (err) res.status(430).send(`接口请求参数解密失败,${err}`)
            else{
                req.body = {...dec , 'school_id':req.get("school_id") }
                next()
            }
        })
    }
    
})
// 用户&管理员
router.use('/user', function (req, res) { 
    if(req.body.judge==0) user.findAndCountAll(req,res)
    if(req.body.judge==1) user.create(req,res)
    if(req.body.judge==2) user.delete(req,res)
    if(req.body.judge==3) user.update(req,res)
    if(req.body.judge==4) user.selectUsersByEmail(req,res)
    if(req.body.judge==5) user.login(req,res)
    if(req.body.judge==6) user.updatePass(req,res)
    if(req.body.judge==7) user.cusCreate(req,res)
    if(req.body.judge==8) user.cusLogin(req,res)
});
// 学校
router.use('/school', function (req, res) {
    if(req.body.judge==0) school.findAndCountAll(req, res)
    if(req.body.judge==1) school.create(req, res)
    if(req.body.judge==2) school.delete(req,res)
    if(req.body.judge==3) school.update(req,res)
    if(req.body.judge==4) school.findAndCountAllLikeByName(req,res);
    if(req.body.judge==5) school.findAndCountAllOnlyIdName(req,res);
});
// 认证信息
router.use('/authen', function (req, res) { 
    if(req.body.judge==0) authen.findAndCountAll(req, res)
    if(req.body.judge==1) authen.create(req, res)
    if(req.body.judge==2) authen.delete(req,res)
    if(req.body.judge==3) authen.update(req,res)
});
// 用户信息
router.use('/info', function (req, res) { 
    if(req.body.judge==0) info.findAndCountAll(req, res)
    if(req.body.judge==1) info.create(req, res)
    if(req.body.judge==2) info.delete(req,res)
    if(req.body.judge==3) info.update(req,res)
});
// 地址信息
router.use('/location', function (req, res) { 
    if(req.body.judge==0) location.findAndCountAll(req, res)
    if(req.body.judge==1) location.create(req, res)
    if(req.body.judge==2) location.delete(req,res)
    if(req.body.judge==3) location.update(req,res)
});
// 开卡信息
router.use('/card', function (req, res) { 
    if(req.body.judge==0) card.findAndCountAll(req, res)
    if(req.body.judge==1) card.create(req, res)
    if(req.body.judge==2) card.delete(req,res)
    if(req.body.judge==3) card.update(req,res)
});
// 快递代取
router.use('/logistic', function (req, res) { 
    if(req.body.judge==0) logistic.findAndCountAll(req, res)
    if(req.body.judge==1) logistic.create(req, res)
    if(req.body.judge==2) logistic.delete(req,res)
    if(req.body.judge==3) logistic.update(req,res)
});
// 快递代发
router.use('/lsend', function (req, res) { 
    if(req.body.judge==0) lsend.findAndCountAll(req, res)
    if(req.body.judge==1) lsend.create(req, res)
    if(req.body.judge==2) lsend.delete(req,res)
    if(req.body.judge==3) lsend.update(req,res)
});
// 跑腿订单信息
router.use('/order', function (req, res) { 
    if(req.body.judge==0) order.findAndCountAll(req, res)
    if(req.body.judge==1) order.create(req, res)
    if(req.body.judge==2) order.delete(req,res)
    if(req.body.judge==3) order.update(req,res)
});
// 考试一级信息
router.use('/exam', function (req, res) { 
    if(req.body.judge==0) exam.findAndCountAll(req, res)
    if(req.body.judge==1) exam.create(req, res)
    if(req.body.judge==2) exam.delete(req,res)
    if(req.body.judge==3) exam.update(req,res)
});
// 考试二级菜单
router.use('/mexam', function (req, res) { 
    if(req.body.judge==0) mexam.findAndCountAll(req, res)
    if(req.body.judge==1) mexam.create(req, res)
    if(req.body.judge==2) mexam.delete(req,res)
    if(req.body.judge==3) mexam.update(req,res)
});
// 考试项目
router.use('/eitem', function (req, res) { 
    if(req.body.judge==0) eitem.findAndCountAll(req, res)
    if(req.body.judge==1) eitem.create(req, res)
    if(req.body.judge==2) eitem.delete(req,res)
    if(req.body.judge==3) eitem.update(req,res)
});
// 旅游一级信息
router.use('/journey', function (req, res) { 
    if(req.body.judge==0) journey.findAndCountAll(req, res)
    if(req.body.judge==1) journey.create(req, res)
    if(req.body.judge==2) journey.delete(req,res)
    if(req.body.judge==3) journey.update(req,res)
});
// 旅游二级菜单
router.use('/mjourney', function (req, res) { 
    if(req.body.judge==0) mjourney.findAndCountAll(req, res)
    if(req.body.judge==1) mjourney.create(req, res)
    if(req.body.judge==2) mjourney.delete(req,res)
    if(req.body.judge==3) mjourney.update(req,res)
});
// 旅游项目
router.use('/jitem', function (req, res) { 
    if(req.body.judge==0) jitem.findAndCountAll(req, res)
    if(req.body.judge==1) jitem.create(req, res)
    if(req.body.judge==2) jitem.delete(req,res)
    if(req.body.judge==3) jitem.update(req,res)
});
// 水果一级信息
router.use('/fruit', function (req, res) { 
    if(req.body.judge==0) fruit.findAndCountAll(req, res)
    if(req.body.judge==1) fruit.create(req, res)
    if(req.body.judge==2) fruit.delete(req,res)
    if(req.body.judge==3) fruit.update(req,res)
});
// 水果二级菜单
router.use('/mfruit', function (req, res) { 
    if(req.body.judge==0) mfruit.findAndCountAll(req, res)
    if(req.body.judge==1) mfruit.create(req, res)
    if(req.body.judge==2) mfruit.delete(req,res)
    if(req.body.judge==3) mfruit.update(req,res)
});
// 水果项目
router.use('/fitem', function (req, res) { 
    if(req.body.judge==0) fitem.findAndCountAll(req, res)
    if(req.body.judge==1) fitem.create(req, res)
    if(req.body.judge==2) fitem.delete(req,res)
    if(req.body.judge==3) fitem.update(req,res)
});
// 购物车信息
router.use('/cart', function (req, res) { 
    
    if(req.body.judge==0) cart.findAndCountAll(req, res)
    if(req.body.judge==1) cart.create(req, res)
    if(req.body.judge==2) cart.delete(req,res)
    if(req.body.judge==3) cart.update(req,res)
});
// 总订单信息
router.use('/tran', function (req, res) { 
    if(req.body.judge==0) tran.findAndCountAll(req, res)
    if(req.body.judge==1) tran.create(req, res)
    if(req.body.judge==2) tran.delete(req,res)
    if(req.body.judge==3) tran.update(req,res)
});
// 资金信息
router.use('/stock', function (req, res) { 
    if(req.body.judge==0) stock.findAndCountAll(req, res)
    if(req.body.judge==1) stock.create(req, res)
    if(req.body.judge==2) stock.delete(req,res)
    if(req.body.judge==3) stock.update(req,res)
});
// 提现
router.use('/tixian', function (req, res) { 
    if(req.body.judge==0) tixian.findAndCountAll(req, res)
    if(req.body.judge==1) tixian.create(req, res)
    if(req.body.judge==2) tixian.delete(req,res)
    if(req.body.judge==3) tixian.update(req,res)
});
// 活动
router.use('/activity', function (req, res) { 
    if(req.body.judge==0) activity.findAndCountAllBySchool(req, res)
    if(req.body.judge==1) activity.create(req, res)
    if(req.body.judge==2) activity.delete(req,res)
    if(req.body.judge==3) activity.update(req,res)
    if(req.body.judge==4) activity.findAndCountAllLikeByTitleSchool(req,res)
});