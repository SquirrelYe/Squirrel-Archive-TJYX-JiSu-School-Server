const promise=require('../../promise/promise');
const time=require('../../time/time');
module.exports={
    //上传文件
    uploadFile:function(req,res,pathlib,fs){
        function sel(req,res,pathlib,fs){      
            fun(req,res,pathlib,fs);
        }
        async function fun(req,res,pathlib,fs) {
            const result = await promise.fileupAsync(req,res,pathlib,fs);
            res.send(result);
        }
        sel(req,res,pathlib,fs);
    }
}