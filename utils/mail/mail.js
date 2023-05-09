const mailUtil = require('./mailUtils');

module.exports = {
  //login注册验证
  register: function (req, res) {
    var mail = req.query.mail;
    var code = req.query.code;
    var msg = `
        <h3>极速校园平台</h3>
        <br> 您的验证码为：
        <br> <h3>${code}</h3>
        `;
    mailUtil(`${mail}`, `极速校园平台 验证短信...`, msg, res);
  }
};
