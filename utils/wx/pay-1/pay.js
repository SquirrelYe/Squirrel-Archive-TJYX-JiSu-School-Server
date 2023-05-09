var xmlreader = require('xmlreader');
var crypto = require('crypto');

var wxpay = {
  //把金额转为分
  getmoney: money => {
    return parseFloat(money) * 100;
  },
  // 随机字符串产生函数
  createNonceStr: () => {
    return Math.random().toString(36).substr(2, 15);
  },
  // 时间戳产生函数
  createTimeStamp: () => {
    return parseInt(new Date().getTime() / 1000) + '';
  },
  //签名加密算法
  paysignjsapi: (appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey) => {
    var ret = {
      appid: appid,
      mch_id: mch_id,
      nonce_str: nonce_str,
      body: body,
      notify_url: notify_url,
      out_trade_no: out_trade_no,
      spbill_create_ip: spbill_create_ip,
      total_fee: total_fee,
      trade_type: trade_type
    };
    console.log('传送的签名参数-->', ret);
    let string = raw(ret);
    let key = mchkey;
    string = string + '&key=' + key;
    console.log('生成签名数据-->', string);
    return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
  },
  //签名加密算法,第二次的签名
  paysignjsapifinal: function (appid, mch_id, prepayid, noncestr, timestamp, mchkey) {
    var ret = {
      appid: appid,
      partnerid: mch_id,
      prepayid: prepayid,
      package: 'Sign=WXPay',
      noncestr: noncestr,
      timestamp: timestamp
    };
    console.log('retretret==', ret);
    var string = raw(ret);
    var key = mchkey;
    string = string + '&key=' + key;
    console.log('stringstringstring=', string);
    var crypto = require('crypto');
    return crypto.createHash('md5').update(string, 'utf8').digest('hex').toUpperCase();
  },
  getXMLNodeValue: function (xml) {
    xmlreader.read(xml, function (errors, response) {
      if (null !== errors) {
        console.log(errors);
        return;
      }
      console.log('长度===', response.xml.prepay_id.text().length);
      var prepay_id = response.xml.prepay_id.text();
      console.log('解析后的prepay_id==', prepay_id);
      return prepay_id;
    });
  }
};
function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key] = args[key];
  });
  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
}

module.exports = wxpay;
