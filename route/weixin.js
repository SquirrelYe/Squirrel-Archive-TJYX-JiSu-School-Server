const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../utils/key/secret').interface; // token 密钥

// -------------实体导入-------------
const wx = require('../utils/wx/wx_api');

module.exports = router;

// -------------接口导出-------------
router.use((req, res, next) => {
  if (req.body.ceshi) next();
  else {
    let encrp = req.body.data;
    jwt.verify(encrp, secret, (err, dec) => {
      if (err) res.status(430).send(`接口请求参数解密失败,${err}`);
      else {
        req.body = dec;
        next();
      }
    });
  }
});
// 微信相关接口
router.use('/wx', function (req, res) {
  if (req.body.judge == 0) wx.selectOpenidUnionid(req, res);
  if (req.body.judge == 1) wx.selectAccessToken(req, res);
  if (req.body.judge == 2) wx.sendTemplateMsg(req, res);
  if (req.body.judge == 3) wx.paysign(req, res);
});
