const jwt = require('jsonwebtoken')
const fs = require('fs')

// Token 数据
const payload = {
  name: 'wanghao',
  admin: true,
  pass:'yx'
}
hs()


function hs() {  // 用 HS256 算法生成与验证 JWT
  // 密钥
  const secret = 'yx'
  // 签发 Token
  const token = jwt.sign(payload, secret, {
    expiresIn: '1m'
  })
  // 输出签发的 Token
  console.log('HS256 算法：', token)
  console.log('时间', new Date().getTime())
  // 验证 Token
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      console.log(error.message)
      return
    }
    console.log(decoded)
  })
}

function rs256() {  //  用 RS256 算法生成与验证 JWT
  // 获取签发 JWT 时需要用的密钥
  const privateKey = fs.readFileSync('./config/private.key')
  // 签发 Token
  const tokenRS256 = jwt.sign(payload, privateKey, {
    algorithm: 'RS256'
  })
  // 输出签发的 Token
  console.log('RS256 算法：', tokenRS256)
  // 获取验证 JWT 时需要用的公钥
  const publicKey = fs.readFileSync('./config/public.key')
  // 验证 Token
  jwt.verify(tokenRS256, publicKey, (error, decoded) => {
    if (error) {
      console.log(error.message)
      return
    }
    console.log(decoded)
  })
}