const axios = require('axios')
const md5 = require('blueimp-md5')
const xml2js = require('xml2js')
const xmlParser = new xml2js.Parser()

const appId = 'your wx appId'
const appSecret = 'your wx app secret'

// 商户号
const mchId = 'mch id'
// 支付api 的 key
const PAY_API_KEY = 'pay api key'
// 一个方便的 log 方法
const log = console.log.bind(console)

// attach 是一个任意的字符串, 会原样返回, 可以用作一个标记
const attach = 'GJS-ORG'
// 一个随机字符串
const nonceStr = getNonceStr()
// 用户的 openId
const openId = 'user openId'
// 生成商家内部自定义的订单号, 商家内部的系统用的, 理论上只要不和其他订单重复, 使用任意的字符串都是可以的
const tradeId = getTradeId(attach)
// 生成签名
const sign = getPrePaySign(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price)
// 这里是在 express 获取用户的 ip, 因为使用了 nginx 的反向代理, 所以这样获取
let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
ip = ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
// 将微信需要的数据拼成 xml 发送出去
const sendData = wxSendData(appId, attach, productIntro, mchId, nonceStr, notifyUrl, openId, tradeId, ip, price, sign)

// 使用 axios 发送数据带微信支付服务器, 没错, 后端也可以使用 axios
axios.post('https://api.mch.weixin.qq.com/pay/unifiedorder', sendData).then(wxResponse => {
    // 微信返回的数据也是 xml, 使用 xmlParser 将它转换成 js 的对象
    xmlParser.parseString(wxResponse.data, (err, success) => {
        if (err) {
            log('parser xml error ', err)
        } else {
            if (success.xml.return_code[0] === 'SUCCESS') {
                const prepayId = success.xml.prepay_id[0]
                const payParamsObj = getPayParams(prepayId, tradeId)
                // 返回给前端, 这里是 express 的写法
                res.json(payParamsObj)
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


// 预定义的一些工具函数
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