var db = require('./redis');
//设置值
db.set('test2', '封装方法', '100', function (err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('插入数据结果:', result);
})
//获取值
db.get('test2', function (err, result) {
    if (err) {
        console.error('err------->',err);
        return;
    }
    console.log('res',result);
})