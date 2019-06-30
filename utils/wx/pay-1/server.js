var express = require('express');
var request = require('request');
var xmlreader = require("xmlreader");

var app = express();

var wxpay = require('./pay');

var appid = 'wxa61d29a0f35c452b';
var appsecret = 'b8687555bf947b1947b62767c448723';
var mchid = '1534187331' // 关联的商户号
var mchkey = 'Tianjinyixiangkejifazhan20190630'; // 关联的商户号密钥
var wxurl = 'http://XXXXXXXXX/weixinNotify.action';

app.get('/', (req, res) => {

    //首先拿到前端传过来的参数
    let orderCode = req.query.orderCode;
    let money = req.query.money;
    let orderID = req.query.orderID;

    console.log('APP传过来的参数是', orderCode + '----' + money + '------' + orderID + '----' + appid + '-----' + appsecret + '-----' + mchid + '-----' + mchkey);

    //首先生成签名sign
    appid
    let mch_id = mchid;
    let nonce_str = wxpay.createNonceStr();
    let timestamp = wxpay.createTimeStamp();
    let body = '测试微信支付';
    let out_trade_no = orderCode;
    let total_fee = wxpay.getmoney(money);
    let spbill_create_ip = req.connection.remoteAddress;
    let notify_url = wxurl;
    let trade_type = 'JSAPI';

    let sign = wxpay.paysignjsapi(appid, body, mch_id, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, mchkey);

    console.log('生成签名-->', sign);

    //组装xml数据
    var formData = "<xml>";
    formData += "<appid>" + appid + "</appid>"; //appid
    formData += "<body><![CDATA[" + "测试微信支付" + "]]></body>";
    formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
    formData += "<nonce_str>" + nonce_str + "</nonce_str>"; //随机字符串，不长于32位。
    formData += "<notify_url>" + notify_url + "</notify_url>";
    formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>";
    formData += "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>";
    formData += "<total_fee>" + total_fee + "</total_fee>";
    formData += "<trade_type>" + trade_type + "</trade_type>";
    formData += "<sign>" + sign + "</sign>";
    formData += "</xml>";

    console.log('formData===', formData);

    var url = 'https://api.mch.weixin.qq.com/pay/unifiedorder';

    request({
        url: url,
        method: 'POST',
        body: formData
    }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log(body);

            xmlreader.read(body.toString("utf-8"), function (errors, response) {
                if (null !== errors) {
                    console.log(errors)
                    return;
                }
                console.log('长度===', response.xml.prepay_id.text().length);
                var prepay_id = response.xml.prepay_id.text();
                console.log('解析后的prepay_id==', prepay_id);


                //将预支付订单和其他信息一起签名后返回给前端
                let finalsign = wxpay.paysignjsapifinal(appid, mch_id, prepay_id, nonce_str, timestamp, mchkey);

                res.json({
                    'appId': appid,
                    'partnerId': mchid,
                    'prepayId': prepay_id,
                    'nonceStr': nonce_str,
                    'timeStamp': timestamp,
                    'package': 'Sign=WXPay',
                    'sign': finalsign
                });

            });


        }
    });

})


app.listen(3000, () => {
    console.log('服务器启动了....');
});