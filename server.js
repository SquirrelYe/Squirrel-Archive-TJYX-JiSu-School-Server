const express = require('express');
const bodyParser = require('body-parser');
const log = require('./log/log')
const jwt = require('jsonwebtoken')
// 路由
const entity = require('./route/entity')
const association = require('./route/association')

var server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.use(express.static(__dirname));
server.use(log.log4js.connectLogger(log.loggerExpress))

const secret = 'yx'
server.use((req, res, next) => {
    // 校验token
    // let token = req.get("Authorization")
    // console.log(token)
    // jwt.verify(token, secret, (err, dec) => {
    //     if (err) res.sendStatus(502)
    //     else res.send(dec)
    //   })
    // 允许所有请求
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    if(req.method != 'POST'){
        res.sendStatus(502)        
    }else{
        next();
    }
});

// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);

server.use('/index', function (req, res) {
    console.log(req.headers)
    res.sendStatus(200)
});

// 监听端口
server.listen(11111);