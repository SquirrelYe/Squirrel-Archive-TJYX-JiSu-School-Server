const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const secret = require('../utils/key/secret').interface  // token 密钥

// -------------实体导入-------------
const msg = require('../utils/msg/msg')

module.exports = router

// -------------接口导出-------------
router.use((req,res,next)=>{
    if(req.body.ceshi) next();
    else{
        let encrp =req.body.data
        jwt.verify(encrp, secret, (err, dec) => {
            if (err) res.status(430).send(`接口请求参数解密失败,${err}`)
            else{
                req.body = dec
                next()
            }
        })
    }    
})
// 微信相关接口
router.use('/msg', function (req, res) { 
    if(req.body.judge==0) msg.register(req,res)
});