const request = require('request');

const axios = require('axios')
const md5 = require('blueimp-md5')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

const appId = 'wxa61d29a0f35c452b'
const appSecret = '4a57f21e5d994a66f23607fe97a33699'
// 商户号
const mchId = '1534187331'
// 支付api 的 key
const PAY_API_KEY = 'Tianjinyixiangkejifazhan20190630'
// 一个方便的 log 方法
const log = console.log.bind(console)

module.exports = {

    //查询用户 openid unionid
    selectOpenidUnionid(req, res) {
        var appid = req.body.appid;
        var secret = req.body.secret;
        var grant_type = req.body.grant_type;
        var js_code = req.body.js_code;
        // 参考链接：https://developers.weixin.qq.com/miniprogram/dev/api/api-login.html
        var url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&grant_type=${grant_type}&js_code=${js_code}`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) res.send(body);
            else res.send(error);
        });
    },

    //查询用户 access_token
    selectAccessToken(req, res) {
        var appid = req.body.appid;
        var secret = req.body.secret;
        // 参考链接：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) res.send(body);
            else res.send(error);
        });
    },

    //发送模板消息
    sendTemplateMsg(req, res) {
        var access_token = req.body.access_token;
        var data = req.body.data;
        // 参考链接：https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN
        var url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${access_token}`;
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.parse(data)
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) res.send(body);
            else res.send(error);
        });
    },

    // 调用支付
    paysign(req, res) {
        const attach = 'JSXY'       // attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
        const nonceStr = getNonceStr()      // 一个随机字符串

        const openId = req.body.openid      // 用户的 openId        
        const productIntro = req.body.productIntro      // 产品信息 示例：腾讯充值中心-QQ会员充值
        const notifyUrl = req.body.notifyUrl      // 回调地址
        const price = getMoney(req.body.price)      // 产品价格 单位为分

        // 这里是在 express 获取用户的 ip, 因为使用了 nginx 的反向代理, 所以这样获取
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        ip = ip.match(/\d+\.\d+\.\d+\.\d+/)[0]

        const tradeId = getTradeId(attach)      // 生成商家内部自定义的订单号, 商家内部的系统用的, 理论上只要不和其他订单重复, 使用任意的字符串都是可以的        
        const sign = getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price)     // 生成签名
        // 将微信需要的数据拼成 xml 发送出去
        const sendData = wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price, sign)
        log('sendData--->',sendData)
        // 使用 axios 发送数据带微信支付服务器, 没错, 后端也可以使用 axios
        axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', sendData).then(wxResponse => {
            // 微信返回的数据也是 xml, 使用 xmlParser 将它转换成 js 的对象
            xmlParser.parseString(wxResponse.data, (err, success) => {
                if (err) {
                    log('parser xml error ', err)
                    res.sendStatus(501)
                } else {
                    console.log('success--->',success)
                    if (success.xml.return_code[0] === 'SUCCESS') {
                        const prepayId = success.xml.prepay_id[0]
                        const payParamsObj = getPayParams(prepayId, tradeId)
                        // 返回给前端, 这里是 express 的写法
                        res.send(payParamsObj)
                    } else {
                        // 错误处理
                        if (err) {
                            log('axios post error', err)
                            res.sendStatus(502)
                        } else if (success.xml.return_code[0] !== 'SUCCESS') {
                            res.sendStatus(403)
                        }
                    }
                }
            })
        }).catch(err => {
            log('post wx err', err)
        })
    }


}


// 预定义的一些工具函数

//把金额转为分
function getMoney(money){ return parseFloat(money) * 100; }
function getNonceStr() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 16; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
function getPaySign(appId, timeStamp, nonceStr, package) {
    var stringA = 'appId=' + appId +
        '&nonceStr=' + nonceStr +
        '&package=' + package +
        '&signType=MD5' +
        '&timeStamp=' + timeStamp

    var stringSignTemp = stringA + '&key=' + PAY_API_KEY
    var sign = md5(stringSignTemp).toUpperCase()
    return sign
}
function getTradeId(attach) {
    var date = new Date().getTime().toString()
    var text = ""
    var possible = "0123456789"
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    var tradeId = 'ty_' + attach + '_' + date + text
    return tradeId
}

function getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price) {
    var stringA = 'appid=' + appId +
        '&attach=' + attach +
        '&body=' + productIntro +
        '&mch_id=' + mchId +
        '&nonce_str=' + nonceStr +
        '&notify_url=' + notifyUrl +
        '&openid=' + openId +
        '&out_trade_no=' + tradeId +
        '&spbill_create_ip=' + ip +
        '&total_fee=' + price +
        '&trade_type=JSAPI'
    var stringSignTemp = stringA + '&key=' + PAY_API_KEY
    var sign = md5(stringSignTemp).toUpperCase()
    return sign
}

function wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price, sign) {
    const sendData = '<xml>' +
        '<appid>' + appId + '</appid>' +
        '<attach>' + attach + '</attach>' +
        '<body>' + productIntro + '</body>' +
        '<mch_id>' + mchId + '</mch_id>' +
        '<nonce_str>' + nonceStr + '</nonce_str>' +
        '<notify_url>' + notifyUrl + '</notify_url>' +
        '<openid>' + openId + '</openid>' +
        '<out_trade_no>' + tradeId + '</out_trade_no>' +
        '<spbill_create_ip>' + ip + '</spbill_create_ip>' +
        '<total_fee>' + price + '</total_fee>' +
        '<trade_type>JSAPI</trade_type>' +
        '<sign>' + sign + '</sign>' +
        '</xml>'
    return sendData
}

function getPayParams(prepayId, tradeId) {
    const nonceStr = getNonceStr()
    const timeStamp = new Date().getTime().toString()
    const package = 'prepay_id=' + prepayId
    const paySign = getPaySign(appId, timeStamp, nonceStr, package)
    // 前端需要的所有数据, 都从这里返回过去
    const payParamsObj = {
        nonceStr: nonceStr,
        timeStamp: timeStamp,
        package: package,
        paySign: paySign,
        signType: 'MD5',
        tradeId: tradeId,
    }
    return payParamsObj
}