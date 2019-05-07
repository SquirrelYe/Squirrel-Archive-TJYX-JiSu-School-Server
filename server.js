const express = require('express');
const bodyParser = require('body-parser');
const log = require('./log/log')
const multer = require('multer')
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')
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

// const secret = 'yx'
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
    if (req.method != 'POST') {
        res.sendStatus(502)
    } else {
        next();
    }
});

// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);

server.use('/upload', (req, res) => {
    console.log(req.files)
    if (req.files.length == 0) {
        res.send({ 'status': -1, 'info': null });
    }
    else {
        //获取原始文件扩展名
        var url = `www/upload/${req.files[0].filename}` + path.parse(req.files[0].originalname).ext;   // ext输出文件后缀
        fs.rename(req.files[0].path, url, function (err) {
            if (err) res.send({ 'status': 0, 'info': '服务器错误' });
            else res.send({ 'status': 1, 'info': url });
        })
    }
})

// 监听端口
server.listen(11111);