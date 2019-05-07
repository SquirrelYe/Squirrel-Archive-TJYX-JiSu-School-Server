const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const jwt = require('jsonwebtoken')
// 工具
const log = require('./log/log')
const file = require('./utils/upload')
// 路由
const entity = require('./route/entity')
const association = require('./route/association')

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.use(express.static(__dirname));
server.use(log.log4js.connectLogger(log.loggerExpress))

var objmulter = multer({ dest: "./www/upload" });    //dest指定上传文件地址
server.use(objmulter.any());

const secret = 'yx'  // token 密钥
server.use((req, res, next) => {
    // 校验token
    let token = req.get("Authorization")
    console.log(token)
    jwt.verify(token, secret, (err, dec) => {
        if (err) res.send(err)
        else res.send(dec)
      })
    // 允许所有请求
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    // if (req.method != 'POST') {
    //     res.sendStatus(502)
    // } else {
    //     next();
    // }
});

// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);

server.use('/upload', (req, res) => {
    file.upload(req, res);
})

// 监听端口
server.listen(11111);