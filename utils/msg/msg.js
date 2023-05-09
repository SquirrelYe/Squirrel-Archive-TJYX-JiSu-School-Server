const tool = require('./tool');
const AppID = '8aaf07086b211c22016b2a9c9ec20635';
module.exports = {
  // 注册验证码
  register(req, res) {
    //1. 获取请求参数数据
    const { phone, code } = req.body;
    //发送给指定的手机号
    console.log(`向${phone}发送短信: ${code}`);
    let body = {
      to: phone,
      appId: AppID,
      templateId: '443792',
      datas: [code, '5 Minutes']
    };
    send(body, req, res);
  },
  // 修改密码
  pass(req, res) {
    const { phone, code } = req.body;
    console.log(`向${phone}发送短信: ${code}`);
    let body = {
      to: phone,
      appId: AppID,
      templateId: '443793',
      datas: [code]
    };
    send(body, req, res);
  },
  // 通用验证码
  normal(req, res) {
    const { phone, code } = req.body;
    console.log(`向${phone}发送短信: ${code}`);
    let body = {
      to: phone,
      appId: AppID,
      templateId: '443794',
      datas: [code]
    };
    send(body, req, res);
  },
  // 订单下单成功
  toorder(req, res) {
    const { phone, name, order, callback } = req.body;
    console.log(`向${phone}发送短信:`, name, order, callback);
    let body = {
      to: phone,
      appId: AppID,
      templateId: '443795',
      datas: [name, order, callback]
    };
    send(body, req, res);
  },
  // 订单取消
  cancerorder(req, res) {
    const { phone, order, callback } = req.body;
    console.log(`向${phone}发送短信:`, order, callback);
    let body = {
      to: phone,
      appId: AppID,
      templateId: '443795',
      datas: [order, callback]
    };
    send(body, req, res);
  }
};

function send(body, req, res) {
  tool.sendCode(body, (msg, error, response, body) => {
    // res 表示接口回调
    if (msg) {
      console.log('成功发送信息');
      res.send({ code: 0, msg: `短信发送成功` });
    } else {
      //3. 返回响应数据
      console.error(error, body);
      console.log('失败发送信息');
      res.send({ code: -1, msg: '短信发送失败' });
    }
  });
}
