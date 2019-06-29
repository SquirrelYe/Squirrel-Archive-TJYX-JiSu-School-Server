const tool = require('./tool')
module.exports={
    // 注册验证码
    register(req,res){
        //1. 获取请求参数数据
        const { phone,code } = req.body
        //发送给指定的手机号
        console.log(`向${phone}发送验证码短信: ${code}`);
        tool.sendCode(phone, code,  (msg, error, response, body)=> {
            // res 表示接口回调
            if (msg) {
                console.log('成功发送验证码: ', phone, code)
                res.send({"code": 0, "msg": `短信验证码${code}发送成功${phone}`})
            } else {
                //3. 返回响应数据
                console.log(error, body)
                res.send({"code": 1, "msg": '短信验证码发送失败'})
            }
        })
    }
}
