var md5 = require('blueimp-md5');
var moment = require('moment');
var Base64 = require('js-base64').Base64;
var request = require('request');

// 参考链接：http://doc.yuntongxun.com/p/5a533de33b8496dd00dce07c
/*
 生成指定长度的随机数
 */
function randomCode(length) {
  var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var result = ''; //统一改名: alt + shift + R
  for (var i = 0; i < length; i++) {
    var index = Math.ceil(Math.random() * 9);
    result += chars[index];
  }
  return result;
}
// console.log(randomCode(6));
exports.randomCode = randomCode;

/*
向指定号码发送指定验证码
 */
function sendCode(body, callback) {
  //填写自己的信息
  var ACCOUNT_SID = '8aaf07086b211c22016b2a9c9e64062f';
  var AUTH_TOKEN = '07962eb598f44c40ae8bb206652352b9';
  var Rest_URL = 'https://app.cloopen.com:8883';
  // var AppID = '8aaf07086b211c22016b2a9c9ec20635';
  //1. 准备请求url
  /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
  var sigParameter = '';
  var time = moment().format('YYYYMMDDHHmmss');
  sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time).toUpperCase();
  var url = Rest_URL + '/2013-12-26/Accounts/' + ACCOUNT_SID + '/SMS/TemplateSMS?sig=' + sigParameter;

  //2. 准备请求体
  body;
  console.log('body--->', body);
  //body = JSON.stringify(body);

  //3. 准备请求头
  /*
     1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
     2.冒号为英文冒号
     3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
  var authorization = ACCOUNT_SID + ':' + time;
  authorization = Base64.encode(authorization);
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'Content-Length': JSON.stringify(body).length + '',
    Authorization: authorization
  };

  // console.log(url,headers,body)
  //4. 发送请求, 并得到返回的结果, 调用callback
  request(
    {
      method: 'POST',
      url: url,
      headers: headers,
      body: body,
      json: true
    },
    (error, response, body) => {
      callback(body.statusCode === '000000', error, response, body); // 000000 表示成功请求
    }
  );
}
exports.sendCode = sendCode;
