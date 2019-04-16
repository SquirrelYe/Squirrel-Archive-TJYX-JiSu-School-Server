const Sequelize=require('sequelize')
const conn=require('../../promise/promise').connection();

// 模型层定义
let admin = conn.define(
    // 默认表名（一般这里写单数），生成时会自动转换成复数形式
    // 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
    'admin',
    // 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
    {
        'Pid': {
            'type': Sequelize.INTEGER(11), // pid
            'allowNull': false,     
        },   
        'Aid': {
            'type': Sequelize.INTEGER(11), // aid
            'allowNull': false,        
        },
        'name': {
            'type': Sequelize.CHAR(255), // 用户名
            'allowNull': false,        
        },
        'pass': {
            'type': Sequelize.CHAR(255), //密码
            'allowNull': false
        },
        'juris': {
            'type': Sequelize.CHAR(255), // 权限
            'allowNull': false,        
        },
        'email': {
            'type': Sequelize.CHAR(255), // 邮箱
            'allowNull': false,        
        }
    }
);

module.exports={
    //查询所有
    findAll:function(req,res){
        admin.findAll().then(msg=>{
            res.send(msg)
        },
        function(err){
            console.log(err); 
        });        
    },
    //登录
    login:function(req,res){
        admin.findAll({
            'where':{
                'name':req.query.name,
                'pass':req.query.pass
            }
        }).then(msg=>{
            res.send(msg);
        })
    },
    //增加
    create:function(req,res){
        admin.create({
            'username':'yx',
            'password':'yexuan'
        }).then(msg=>{
            res.send(msg);
        },
        function(err){
            console.log(err); 
        });
    },
    //删除
    delete:function(req,res){
        admin.destroy({
            'where':{
                'username':'1'
            }
        }).then(row=> {
            if(row === 0){
                console.log('删除记录失败');
                res.send('error')
             }else{
                console.log('成功删除记录');
                res.send('msg')
             }
          },
          function(err){
              console.log(err); 
        });
    },
    //更新
    update:function(req,res){
        var s='yexuan'
        admin.update(
            {'username':`${s}`},
            {'where':{
                'id':'1'
            }
        }).then(msg=>{
            res.send(msg);
        })
    }
}


