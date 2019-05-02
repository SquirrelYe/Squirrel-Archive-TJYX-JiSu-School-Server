const mysql = require('mysql');
const Sequelize=require('sequelize')
const log=require('../log/log')


module.exports = {
    //sequelize ORM对象关系映射 
    connection:function(req,res){
        var sequelize = new Sequelize(
            'TJYX_JiSu_School', // 数据库名
            'root',   // 用户名
            'yexuan0628',   // 用户密码
            {
                'dialect': 'mysql',  // 数据库使用mysql
                'host': '127.0.0.1', // 数据库服务器ip
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
    },
    //file 操作
    fileupAsync: function (req,res,pathlib,fs) {
        return new Promise((resolve, reject) => {
            console.log(req.files);
            //获取原始文件扩展名
            var newName = req.files[0].path + pathlib.parse(req.files[0].originalname).ext;
            fs.rename(req.files[0].path, newName, function (err) {
                if (err) {
                    console.log("上传失败");
                    resolve(`{ "file upload success ?": "flase" }`);
                } else {
                    console.log("上传成功");
                    resolve(`{ "file upload success ?": "true" ,"filename":"${newName}"}`);
                }
            });
        });
    }
} 