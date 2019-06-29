
const fs = require('fs');
const path = require('path');
function upload(req,res){
    if (req.files.length == 0)  res.send({ 'status': -1, 'info': null }); 
    else {
        //获取原始文件扩展名
        var url = `www/upload/${req.files[0].filename}` + path.parse(req.files[0].originalname).ext;   // ext输出文件后缀
        fs.rename(req.files[0].path, url, function (err) {
            if (err) res.send({ 'status': 0, 'info': '服务器错误' });
            else res.send({ 'status': 1, 'info': url });
        })
    }
}

module.exports={ upload }