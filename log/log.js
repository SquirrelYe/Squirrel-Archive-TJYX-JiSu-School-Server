const log4js = require('log4js');

log4js.configure({
    appenders: {
        fileORM: {  //写出ORM（对象关系映射）日志文件到 'log/file/ORM.log'
            type: 'file',
            filename: 'log/file/ORM.log'
        },
        fileExpress:{   //写出Express（服务器）日志文件到 'log/file/Express.log'
            type:'file',
            filename:'log/file/Express.log'
        },
        fileAll:{   //写出所有日志文件到 'log/file/all.log'
            type:'file',
            filename:'log/file/all.log'
        },
        console:{   //控制台输出
            type:'console'
        }
    },
    categories: {
        default: {  //默认使用 
            appenders: ['console','fileAll'],
            level: 'trace'
        },
        ORM: {  //sequelize （ORM） 使用 
            appenders: ['console','fileAll','fileORM'],
            level: 'trace'
        },
        Express:{   //Express (Server) 调用
            appenders: ['console','fileAll','fileExpress'],
            level: 'trace'
        }
    }
});

//重新写了info方法，给ORM使用
function info(message) {
    log4js.getLogger('ORM').info(message)
}

exports.log4js = log4js
exports.info = info     //给 ORM 调用
exports.loggerExpress = log4js.getLogger('Express') //给Express 服务器调用