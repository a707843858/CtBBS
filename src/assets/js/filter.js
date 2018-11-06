import Vue from 'vue';

 var myFilter = Vue.filter('my-filter', function (value) {
    return  1;// 返回处理后的值
 });
 //时间格式
 let date = Vue.filter('date',function(time,index){
    index ? index :1;
    var time = new Date(time * 1000);
    var timeLine = time.getTime();
    var today = new Date().getTime();
    var milliSecond = today - timeLine;
    // return milliSecond;
    if(milliSecond > 2592000000 || index == 1){
        //超过一个月,按照默日期格式返回    
        var year = time.getFullYear();
        var month = time.getMonth() + 1 ;
        var date = time.getDate();
        var hour = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();  
        return year+'年'+month+'月'+date+ '日 - ' + hour + ':' + minutes   ; 
    }else if(milliSecond >= 86400000){
        //几天前
        return parseInt(milliSecond/86400000)+' 天前 ';
    }else if(milliSecond >= 3600000){
        //几天前
        return parseInt(milliSecond/3600000) + '小时前' ;
    }else if (milliSecond >= 60000){
        //几小时前
        return parseInt(milliSecond/60000) + '分钟前 ' ;
    }else if(milliSecond >= 1000){
        //几秒前
        return parseInt(milliSecond/1000) + '秒前';
    }else{
        return '刚刚';
    }
 });

//性别转文字
var sex = Vue.filter('sex',function(value){
    switch (value){
       case 1 : 
       return '男';
       break;
       case 0 :
       return '女';
       break;
       default :
       return '保密';
    }
    
});
//文章形式转文字 
var postModel = Vue.filter('postModel',function(str){
    switch(str){
        case 'normal':
            return '标准';
            break;
        case 'gallery':
            return '相册';
            break;
        case 'video':
            return '视频';
            break;
        default:
            break;
    }
});
//帖子状态转文字
var postStatus = Vue.filter('postStatus',function(str){
    switch(str){
        case 'privacy':
            return '隐私';
        case 'charge':
            return '付费';
        case 'password':
            return '密码';
        case 'viper':
            return '会员可见';
        default:
            return '公开';
    }
    if(value == 'publish'){
        return '发布';
    }else if (value == 'close'){
        return '关闭';
    }
});
//状态转文字
var status = Vue.filter('status',function(value){
    if(value == 'open'){
        return '开启';
    }else if(value == 'close'){
        return '关闭';
    }
});
//判断个人签名是否为空
var isSign = Vue.filter('isSign',function(str){
    if(str == '' | str == null ){
        return '这人很懒,什么都没留下';
    }else{
        return str;
    }
});
//为空的值输出无
var showNone = Vue.filter('showNone',function(str){
    if(str == '' | str == null){
        return '—';
    }else {
        return str;
    }
});
// 截取字符,控制显示的字符 //true则返回带省略号的
var slice = Vue.filter('slice',function(str,length,ellipsis){
    var after = '';
    if(str.length > 0){
        if(ellipsis == true){
           after = '.....';
        }
        return str.slice(0,length)+after;
    }  
});
//选择位置变成****
let star = Vue.filter('star',function(str,start,end){
    if(str){
        let reg = new RegExp(/@/);
        let strsort;
        if(reg.test(str)){
            let index = str.indexOf("@");
            strsort = str.slice(index - 4,index);
        }else{
            strsort = str.slice(start,end);                    
        }
        let val = str.replace(strsort,'****'); 
        return val;      
    }else {
        return '';
    } 
});
//判断是否为空
let space = Vue.filter('isEmpty',function(val){
    if(typeof val == "undefined" || val == null || val == ""){
        return true;
    }else{
        return false;
    }
});
 export default { 
    myFilter,
    date,
    postStatus,
    status,
    isSign,
    showNone,
    slice,
    star,
    postModel,
    space,
};

