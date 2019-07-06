const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser')
const multer = require('multer')
const jwt = require('jsonwebtoken')
// 工具
const log = require('./log/log')
const file = require('./utils/file/upload')
// 路由
const entity = require('./route/entity')
const association = require('./route/association')
const weixin = require('./route/weixin')
const msg = require('./route/msg')

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.use(express.static(__dirname));
server.use(log.log4js.connectLogger(log.loggerExpress))

var objmulter = multer({ dest: "./www/upload" });    //dest指定上传文件地址
server.use(objmulter.any());

const secret = require('./utils/key/secret').token  // token 密钥
server.use((req, res, next) => {
    // 允许所有请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept","Authorization","edition");
    // console.log(req.get('edition'))
    // 测试
    if(req.body.ceshi) next();
    else if(req.url == '/ent/user' || req.url =='/upload' || req.url =='/iconfont') next();
    else{
        // 校验token
        let token = req.get("Authorization")
        jwt.verify(token, secret, (err, dec) => {
            if (err) res.status(431).send('token失效，请重新登录')
            else{
                if (req.method != 'POST') {
                    res.status(440).send('请求方法错误，仅能使用POST请求')
                } else {
                    // console.log('token解密数据',dec)
                    next()
                }
            }
        }) 
    }
});

// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);
server.use('/wx', weixin);
server.use('/msg', msg);
server.use('/notify',xmlparser({ trim:false, explicitArray:false }), (req, res) => { 
    // 微信支付成功后的回调地址，存储回调信息s
    console.log(req.body)
    res.send(`
        <xml>
            <return_code><![CDATA[SUCCESS]]></return_code>
            <return_msg><![CDATA[OK]]></return_msg>
        </xml>
    `)
})

server.use('/upload', (req, res) => { file.upload(req, res); })

// 监听端口
server.listen(11130);