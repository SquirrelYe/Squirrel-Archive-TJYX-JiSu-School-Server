const mysql = require('mysql');
const Sequelize=require('sequelize')
const log=require('../log/log')

module.exports = {
    //sequelize ORM对象关系映射 
    connection:function(req,res){
        var sequelize = new Sequelize(
            'TJYX_JiSu_School', // 数据库名
            'user',   // 用户名
            'yexuan@0628',   // 用户密码
            // 'yexuan@0628',  //服务器数据库
            {
                'dialect': 'mysql',  // 数据库使用mysql
                'host': '42.81.142.18', // 数据库服务器ip
                'port': 3306,        // 数据库服务器端口
                'define': {
                    // 字段以下划线（_）来分割（默认是驼峰命名风格）
                    'underscored': true
                },
                timezone: '+08:00',
                logging:log.info
            }
        )
        return sequelize;
    }
} 