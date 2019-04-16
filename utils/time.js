module.exports={
    getTime:function(){
        function toDou(n){              
            return n<10?'0'+n:''+n;
        }
        var myDate = new Date();
        var time=(                   //-->2018-07-21 17:42:35
            myDate.getFullYear()+'-'+
            toDou(myDate.getMonth()+1)+'-'+
            toDou(myDate.getDate())+' '+
            toDou(myDate.getHours())+':'+
            toDou(myDate.getMinutes())+':'+
            toDou(myDate.getSeconds())
        )
        return time;
    }
}
