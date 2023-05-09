var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('./config');

smtpTransport = nodemailer.createTransport(
  smtpTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  })
);

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html, res) {
  smtpTransport.sendMail(
    {
      from: config.email.user,
      to: recipient,
      subject: subject,
      html: html
    },
    function (error, response) {
      console.error(error);
      if (error == null) {
        console.log('发送成功');
        res.send(`{ "success": true }`);
      } else {
        console.log('发送失败');
        res.send(`{ "success": false }`);
      }
    }
  );
};

module.exports = sendMail;
