const express = require('express');
const bodyParser = require('body-parser');
const log = require('./log/log')
const mail = require('./mail/mail')

// 路由
const entity = require('./route/entity')
const association = require('./route/association')

var server = express();

// 创建socket.io
let server_socket = require('http').createServer(server)
server_socket.listen(3000);
let io = require('socket.io')(server_socket)
//监听客户端链接,回调函数会传递本次链接的socket
io.on('connection', socket => {
    console.log('有连接接入')
    // 监听客户端发送的信息
    socket.on("sentToServer", message => {
        // 给客户端返回信息
        io.emit("sendToClient", {message});
    });
    // 监听连接断开事件
    socket.on("disconnect", () => {
        console.log("连接已断开...");
    });
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

server.use(express.static(__dirname));

server.use(log.log4js.connectLogger(log.loggerExpress))

process.on('uncaughtException', function (err) {
    //打印出错误
    console.error(err);
    //打印出错误的调用栈方便调试
    console.error(err.stack);
});

server.use(express.static(__dirname));

server.use(function (req, res, next) {
    // if(req.query.name != 'yx') res.send('error');
    // else next();
    // 允许所有请求
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// 加载外部router
server.use('/ent', entity);
server.use('/ass', association);
server.use('/mail',function(req,res){
    if(req.query.judge==0)  mail.register(req,res);
})

server.get('/index', function (req, res) {
    res.redirect('./WWW/cs.html');
});

// 监听端口
server.listen(11111);