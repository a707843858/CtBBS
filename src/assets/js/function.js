const axios = require('axios');
import Vue from 'vue';
const os = require('os');
// import {message} from 'element-ui'

// const axios = _axios.create({});
// axios.defaults.baseURL = 'http://localhost:3000/',
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';//默认Post请求头
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.responseType = 'json';//默认返回数据类型
// axios.defaults.transformRequest = [function (data) {    //数据序列化
//     return qs.stringify(data);
//     }
// ];
// axios.defaults.validateStatus = function (status) { //status Code
//     return true;
// };
// 数据发送前的操作
axios.interceptors.request.use(function (config) {
    //配置config
    config.headers.Accept = 'application/json';
    return config;
});
// 对返回数据的操作
axios.interceptors.response.use(
    response=>{
      console.log(2);
      Vue.$message({message:'aaa'});
        return response;
    },
);
// const host = process.env.NODE_ENV === 'development' ? 'dev api host' : 'prod api host';

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();



export default {
  axios,
  install(Vue,options){
    //判断是PC端还是移动端
    Vue.prototype.userAgent = function (params={}) { 
        let userAgent = navigator.userAgent.toLowerCase();
        let _userAgent = (userAgent.match(/iphone/i) && 'iphone') || (userAgent.match(/ipad/i) && 'ipad') || (userAgent.match(/ipod/i) && 'ipod') || (userAgent.match(/midp/i) && 'midp') || (userAgent.match(/android/i) && 'android') || (userAgent.match(/blackberry/i) && 'blackberry') || (userAgent.match(/hpwos/i) && 'hpwos') || (userAgent.match(/symbian/i) && 'symbian') || (userAgent.match(/windows phone/i) && 'windows phone') || (userAgent.match(/ucweb/i) && 'ucweb') || 'pc';
        let _isMobile = _userAgent.match(/(iphone|ipad|ipod|midp|android|blackberry|hpwos|symbian|windows phone|ucweb)/i)?true:false;
        console.log(_userAgent,_isMobile);
        return ({_userAgent,_isMobile});
     }
     //配适web端网页尺寸
     Vue.prototype.mobileScale = function(){
        let ratio = 375/667, //原设计稿的宽高比(i6为375/667)
        mWidth = document.documentElement.clientWidth,
        mHeight = document.documentElement.clientHeight,
        // mRatio = mWidth/mHeight,
        zoom;
        zoom = (mHeight/667).toString().substring(0, 6);
        let _body = document.getElementsByTagName('body')[0];
        _body.setAttribute('style',`zoom:${zoom}; opacity:1;`);
        // $("body").attr('style', cssText);
     }
    //判断是否为空
    Vue.prototype.isEmpty = function(val){
        if(typeof val == "undefined" || val == null || val == ""){
            return true;
        }else{
            return false;
        }
    }
    //Get Session
    Vue.prototype.get_session = function(){
        return new Promise((resolve,reject)=>{

        });axios.get('/api/public/get_session');
    }
    //开发中提示
    Vue.prototype.develope = function(){
        this.$message({
            type:'warning',
            message:'开发中.....',
        });
    }
    //获取Logo & Type
    // Vue.prototype.get_logo = function(){
    //     return axios.get('/api/public/get_logo');
    // }
    //保存失败的时候显示
    Vue.prototype.showFail = function(status){
            if(status != 1){
                this.$message({
                    type : 'warning',
                    message : '操作失败,请稍候再试。',
                });
            }
    };
    //登录页,跳转注册框
    Vue.prototype.loginAnimation = function(tab){
        let login =  document.getElementById('login_box');
        let register = document.getElementById('register_box');
        let forget = document.getElementById('forget_box');
        if(tab == 'toRegister'){
            login.classList.add('rotateToHide');
            register.classList.add('rotateToShow');
        }else if(tab == 'toForget'){
            login.classList.add('rotateToHide');
            forget.classList.add('rotateToShow');
        }else if(tab == 'hide'){
            login.classList.remove('rotateToHide');
            register.classList.remove('rotateToShow');
            forget.classList.remove('rotateToShow');
        }
    }
    //输入框下划线动画
    Vue.prototype.addInputAnimation = (id) => {
        var el = document.getElementById(id);
        el.classList.add('input-is-focused');      
    }
    Vue.prototype.removeInputAnimation = (id) =>{
        var el = document.getElementById(id);
        let input = el.getElementsByClassName('el-input__inner')[0];
        var val = input.value;
        if(val.trim().length <= 0 ){
            el.classList.remove('input-is-focused'); 
        }
    }
    //获取轮播图列表
    // Vue.prototype.get_carousel_list = function(type){
    //    return axios.post('/api/public/get_carousel_list',{type:type})
    // }
    //获取Blog Meta 
    // Vue.prototype.get_blog_meta = function(meta){
    //  return axios.post('/api/public/get_blog_meta',{meta:meta});
    // }
    //分享
    Vue.prototype.share = function(type){
        switch(type){
            case 'qq':
                window.open(`https://connect.qq.com/widget/shareqq/index.html?desc=&summary=&title=${encodeURIComponent(document.title)}&url=${encodeURIComponent(location.href)}&pics=`,'_blank');
                break;
            case 'qzone':
                window.open(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(document.title)}`,'_blank');
                break;
            case 'wechat':
                window.open(`http://zixuephp.net/inc/qrcode_img.php?url=${location.href}`);
                break;
            case 'weibo':
                window.open(`http://v.t.sina.com.cn/share/share.php?title=${encodeURIComponent(document.title.substring(0,76))}&url=${encodeURIComponent(location.href)}&rcontent=`,'_blank');
                break;
            case 'douban':
                var r='http://www.douban.com/recommend/?url='+encodeURIComponent(document.location.href)+'&title='+encodeURIComponent(document.title)+'&v=1',
                x=function(){
                    if(!window.open(r,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330','_blank'));
                };
                if(/Firefox/.test(navigator.userAgent)){
                    setTimeout(x,0);
                }else{
                    x();
                };
                break;
            default:
                this.$message({
                    type:'warning',
                    message:'分享出错',
                });
        }
    }
    //获取内存
    Vue.prototype.test = function (){
        return axios.post('/api/public/get_test',{});
        // console.log(Date.now() - dates);
        // window.requestAnimFrame(this.test());   
        // if((Date.now() - dates ) >= 1000) { 
        //     console.log('1'); 
        // }
        // setInterval(function(){

        // },1000);
        // console.log(os.cpus());
        

    }
    //获取数据条总数
    // Vue.prototype.get_count = function(params={}){
    //     return axios.post('/api/public/get_count',{params});
    // }

//-------------------文章---------------------
//获取文章
Vue.prototype.get_post = function(params={}){ 
    return axios.post('/api/post/get_post',{params});        
}
//提交文章
Vue.prototype.update_post = function(params={}){
    let summary = '';
    if(params.content == '' | params.content == null | params.content == undefined){
        this.$message({
            type:'warning',
            message:'请输入文章内容。'
        });
        return; 
    }
    if(params.summary != '' & params.summary != null & params.summary != undefined){
        if(params.summary.length > 150){
            this.$message({
                type:'warning',
                message:'文章简介超出规定长度,请适当删减。'
            });
            return;
        }
        summary = params.summary;
    }else {
        summary = params.content.replace(/<\/?.+?>/g,"").slice(0,150);
    }
    axios.post('/api/post/update_post',{params}).then(res=>{
        this.$router.push({name:'article',params:{id:res.data.pid}});
    });
}
//获取文章分类信息
Vue.prototype.get_category = function(params={}){
    return axios.post('/api/post/get_category',{params});
}
//获取评论
Vue.prototype.get_comment = function(params={}){
    return axios.post('/api/post/get_comment',{params});
};
// 提交评论
Vue.prototype.update_comment = function(params={}){
    if(params.comment == undefined | params.comment == '' | params.comment == null ){
        this.$message({
            type:'warning',
            showClose : true,
            message : '请输入你的评论后再提交。',
        });
    }else{
        return axios.post('/api/post/update_comment',{params});   
    }
    
}
//图片类帖子处理
Vue.prototype.get_gallery_post = function(str){
    // let str = this.postData.content;
    let imgStr = str.match(/<img.*?(?:>|\/>)/gi);
    console.log(imgStr);
    //获取文章内所有图片地址
    let imglist = new Array();
    for(let i=0;i<imgStr.length;i++){
        imglist[i] = imgStr[i].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
    }
    //获取文章内除所有图片标签的内容
    let introduce = str.replace(/<img.*?(?:>|\/>)/gi,'');
    console.log(introduce);
    return [imglist,introduce];
}
//视频类文章处理
Vue.prototype.get_video_post = function(str){
    let reg_iframe = new RegExp(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi);
    let _video = str.match(reg_iframe);
    let _content = str.replace(reg_iframe,'').replace(/<\/?.+?>/g,'');
    return [_video,_content];

}
//获取收藏
Vue.prototype.get_collect = function(params={}){
    return axios.post('/api/post/get_collect',{params});
}
//提交收藏
Vue.prototype.update_collect = function(params={}){
    console.log(params);
    let _this = this ;
    return axios.post('/api/post/update_collect',{params}).then(res=>{
        let isMobile = this.userAgent()._isMobile;
        if(res.data.state == 1){
            isMobile ? this.$toast('收藏成功') : this.$message({type:'warning',message:'收藏成功'});
        }else {
            isMobile ? this.$toast('取消成功') : this.$message({type:'warning',message:'取消成功'});
        }
        
    });
}




//------------------------用户--------------------------
//登录
Vue.prototype.Login = function(params={}){
    let device = this.userAgent();
    let _this = this;
    if(this.isEmpty(params.account)){
        device ? this.$toast('账号不能为空') : this.$message({type:'warning',message:'帐号不能为空',});
    }else if(this.isEmpty(params.password)){
        device ? this.$toast('密码不能为空') : this.$message({type:'warning',message:'密码不能为空',})
    }else {
        axios.post('/api/user/login',{params}).then(function(res){
            if(res.data.state == 1){
                _this.$router.push('/');
                _this.$router.go(0);
            }else {
                device ? _this.$toast('账号或密码错误') :_this.$message({type:'warning',msg:'账号或密码错误',});
            }
        }); 
    }
}
//退出
Vue.prototype.Logout = function(){
    axios.get('/api/user/logout').then(res=>{
        if(res.data.state == 1){ this.$router.push('/');};
    });
}
//注册
Vue.prototype.Register = function(params={}){
    let _this= this ;
    let device = this.userAgent();
    let email_reg = /@/ig;
    if(this.isEmpty(params.nick_name)){
        device ? this.$toast('昵称不能为空') : this.$message({type:'warning',message:'昵称不能为空'});
    }else if(this.isEmpty(params.account)){
        device ? this.$toast('邮箱不能为空') : this.$message({type:'warning',message:'邮箱不能为空'});
    }else if(!email_reg.test(params.account)){
        device ? this.$toast('邮箱格式错误，请重新输入') : this.$message({type:'warning',message:'邮箱格式错误，请重新输入'});
    }else if(this.isEmpty(params.password)){
        device ? this.$toast('密码不能为空') : this.$message({type:'warning',message:'密码不能为空'});
    }else if(this.isEmpty(params.r_password)){
        device ? this.$toast('请重复密码') : this.$message({type:'warning',message:'请重复密码'});
    }else if(params.r_password.length < 6 || params.password.length < 6){
        device ? this.$toast('密码长度最少应为6位') : this.$message({type:'warning',message:'密码长度最少应为6位'});
    }else if(params.password !== params.r_password){
        device ? this.$toast('两次输入的密码不一致') : this.$message({type:'warning',message:'两次输入的密码不一致'});
    }else {
        axios.post('/api/user/register',{params}).then(res=>{
            if(res.data.state == 1){
                this.$router.push('/');
                this.$router.go(0);
            }else{
                device ? _this.$toast('注册失败') : _this.$message({type:'warning',message:res.data.msg,});;     
            }
        });        
    }

}
//获取用户信息
Vue.prototype.get_user = function(params={}){
    return axios.post('/api/user/get_user',{params});
}
//提交用户信息
Vue.prototype.update_user = function(params={}){
    axios.post('/api/user/update_user',{params});
}
//获取背景
Vue.prototype.get_background = function (params={}) {  
    return axios.post('/api/user/get_background',{params});
}
//提交背景
Vue.prototype.update_background = function(params={}){
    return axios.post('/api/user/update_background',{params});
}
//获取用户消息
Vue.prototype.get_message = (params={})=>{
    return axios.post('api/user/get_message',{params});
}


  }
}

 


// exports.install = function (Vue, options) {


// //-------------其他-----------------
// //判断是PC端还是移动端
// Vue.prototype.userAgent = function (params={}) { 
//     let userAgent = navigator.userAgent.toLowerCase();
//     let _userAgent = (userAgent.match(/iphone/i) && 'iphone') || (userAgent.match(/ipad/i) && 'ipad') || (userAgent.match(/ipod/i) && 'ipod') || (userAgent.match(/midp/i) && 'midp') || (userAgent.match(/android/i) && 'android') || (userAgent.match(/blackberry/i) && 'blackberry') || (userAgent.match(/hpwos/i) && 'hpwos') || (userAgent.match(/symbian/i) && 'symbian') || (userAgent.match(/windows phone/i) && 'windows phone') || (userAgent.match(/ucweb/i) && 'ucweb') || 'pc';
//     let _isMobile = _userAgent.match(/(iphone|ipad|ipod|midp|android|blackberry|hpwos|symbian|windows phone|ucweb)/i)?true:false;
//     console.log(_userAgent,_isMobile);
//     return ({_userAgent,_isMobile});
//  }
//  //配适web端网页尺寸
//  Vue.prototype.mobileScale = function(){
//     let ratio = 375/667, //原设计稿的宽高比(i6为375/667)
//     mWidth = document.documentElement.clientWidth,
//     mHeight = document.documentElement.clientHeight,
//     // mRatio = mWidth/mHeight,
//     zoom;
//     zoom = (mHeight/667).toString().substring(0, 6);
//     let _body = document.getElementsByTagName('body')[0];
//     _body.setAttribute('style',`zoom:${zoom}; opacity:1;`);
//     // $("body").attr('style', cssText);
//  }
// //判断是否为空
// Vue.prototype.isEmpty = function(val){
//     if(typeof val == "undefined" || val == null || val == ""){
//         return true;
//     }else{
//         return false;
//     }
// }
// //Get Session
// Vue.prototype.get_session = function(){
//     return new Promise((resolve,reject)=>{

//     });axios.get('/api/public/get_session');
// }
// //开发中提示
// Vue.prototype.develope = function(){
//     this.$message({
//         type:'warning',
//         message:'开发中.....',
//     });
// }
// //获取Logo & Type
// // Vue.prototype.get_logo = function(){
// //     return axios.get('/api/public/get_logo');
// // }
// //保存失败的时候显示
// Vue.prototype.showFail = function(status){
//         if(status != 1){
//             this.$message({
//                 type : 'warning',
//                 message : '操作失败,请稍候再试。',
//             });
//         }
// };
// //登录页,跳转注册框
// Vue.prototype.loginAnimation = function(tab){
//     let login =  document.getElementById('login_box');
//     let register = document.getElementById('register_box');
//     let forget = document.getElementById('forget_box');
//     if(tab == 'toRegister'){
//         login.classList.add('rotateToHide');
//         register.classList.add('rotateToShow');
//     }else if(tab == 'toForget'){
//         login.classList.add('rotateToHide');
//         forget.classList.add('rotateToShow');
//     }else if(tab == 'hide'){
//         login.classList.remove('rotateToHide');
//         register.classList.remove('rotateToShow');
//         forget.classList.remove('rotateToShow');
//     }
// }
// //输入框下划线动画
// Vue.prototype.addInputAnimation = (id) => {
//     var el = document.getElementById(id);
//     el.classList.add('input-is-focused');      
// }
// Vue.prototype.removeInputAnimation = (id) =>{
//     var el = document.getElementById(id);
//     let input = el.getElementsByClassName('el-input__inner')[0];
//     var val = input.value;
//     if(val.trim().length <= 0 ){
//         el.classList.remove('input-is-focused'); 
//     }
// }
// //获取轮播图列表
// // Vue.prototype.get_carousel_list = function(type){
// //    return axios.post('/api/public/get_carousel_list',{type:type})
// // }
// //获取Blog Meta 
// // Vue.prototype.get_blog_meta = function(meta){
// //  return axios.post('/api/public/get_blog_meta',{meta:meta});
// // }
// //分享
// Vue.prototype.share = function(type){
//     switch(type){
//         case 'qq':
//             window.open(`https://connect.qq.com/widget/shareqq/index.html?desc=&summary=&title=${encodeURIComponent(document.title)}&url=${encodeURIComponent(location.href)}&pics=`,'_blank');
//             break;
//         case 'qzone':
//             window.open(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(location.href)}&title=${encodeURIComponent(document.title)}`,'_blank');
//             break;
//         case 'wechat':
//             window.open(`http://zixuephp.net/inc/qrcode_img.php?url=${location.href}`);
//             break;
//         case 'weibo':
//             window.open(`http://v.t.sina.com.cn/share/share.php?title=${encodeURIComponent(document.title.substring(0,76))}&url=${encodeURIComponent(location.href)}&rcontent=`,'_blank');
//             break;
//         case 'douban':
//             var r='http://www.douban.com/recommend/?url='+encodeURIComponent(document.location.href)+'&title='+encodeURIComponent(document.title)+'&v=1',
//             x=function(){
//                 if(!window.open(r,'douban','toolbar=0,resizable=1,scrollbars=yes,status=1,width=450,height=330','_blank'));
//             };
//             if(/Firefox/.test(navigator.userAgent)){
//                 setTimeout(x,0);
//             }else{
//                 x();
//             };
//             break;
//         default:
//             this.$message({
//                 type:'warning',
//                 message:'分享出错',
//             });
//     }
// }
// //获取内存
// Vue.prototype.test = function (){
//     return axios.post('/api/public/get_test',{});
//     // console.log(Date.now() - dates);
//     // window.requestAnimFrame(this.test());   
//     // if((Date.now() - dates ) >= 1000) { 
//     //     console.log('1'); 
//     // }
//     // setInterval(function(){

//     // },1000);
//     // console.log(os.cpus());
    

// }
// //获取数据条总数
// // Vue.prototype.get_count = function(params={}){
// //     return axios.post('/api/public/get_count',{params});
// // }








// //-------------------文章---------------------
// //获取文章
// // Vue.prototype.get_post = function(params={}){ 
// //     return axios.post('/api/post/get_post',{params});        
// // }
// //提交文章
// // Vue.prototype.update_post = function(params={}){
// //     let summary = '';
// //     if(params.content == '' | params.content == null | params.content == undefined){
// //         this.$message({
// //             type:'warning',
// //             message:'请输入文章内容。'
// //         });
// //         return; 
// //     }
// //     if(params.summary != '' & params.summary != null & params.summary != undefined){
// //         if(params.summary.length > 150){
// //             this.$message({
// //                 type:'warning',
// //                 message:'文章简介超出规定长度,请适当删减。'
// //             });
// //             return;
// //         }
// //         summary = params.summary;
// //     }else {
// //         summary = params.content.replace(/<\/?.+?>/g,"").slice(0,150);
// //     }
// //     axios.post('/api/post/update_post',{params}).then(res=>{
// //         this.$router.push({name:'article',params:{id:res.data.pid}});
// //     });
// // }
// //获取文章分类信息
// // Vue.prototype.get_category = function(params={}){
// //     return axios.post('/api/post/get_category',{params});
// // }
// //获取评论
// // Vue.prototype.get_comment = function(params={}){
// //     return axios.post('/api/post/get_comment',{params});
// // };
// //提交评论
// // Vue.prototype.update_comment = function(params={}){
// //     if(params.comment == undefined | params.comment == '' | params.comment == null ){
// //         this.$message({
// //             type:'warning',
// //             showClose : true,
// //             message : '请输入你的评论后再提交。',
// //         });
// //     }else{
// //         return axios.post('/api/post/update_comment',{params});   
// //     }
    
// // }
// //图片类帖子处理
// Vue.prototype.get_gallery_post = function(str){
//     // let str = this.postData.content;
//     let imgStr = str.match(/<img.*?(?:>|\/>)/gi);
//     console.log(imgStr);
//     //获取文章内所有图片地址
//     let imglist = new Array();
//     for(let i=0;i<imgStr.length;i++){
//         imglist[i] = imgStr[i].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
//     }
//     //获取文章内除所有图片标签的内容
//     let introduce = str.replace(/<img.*?(?:>|\/>)/gi,'');
//     console.log(introduce);
//     return [imglist,introduce];
// }
// //视频类文章处理
// Vue.prototype.get_video_post = function(str){
//     let reg_iframe = new RegExp(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi);
//     let _video = str.match(reg_iframe);
//     let _content = str.replace(reg_iframe,'').replace(/<\/?.+?>/g,'');
//     return [_video,_content];

// }
// //获取收藏
// // Vue.prototype.get_collect = function(params={}){
// //     return axios.post('/api/post/get_collect',{params});
// // }
// //提交收藏
// // Vue.prototype.update_collect = function(params={}){
// //     console.log(params);
// //     let _this = this ;
// //     return axios.post('/api/post/update_collect',{params}).then(res=>{
// //         let isMobile = this.userAgent()._isMobile;
// //         if(res.data.state == 1){
// //             isMobile ? this.$toast('收藏成功') : this.$message({type:'warning',message:'收藏成功'});
// //         }else {
// //             isMobile ? this.$toast('取消成功') : this.$message({type:'warning',message:'取消成功'});
// //         }
        
// //     });
// // }
// //



// //------------------------用户--------------------------
// //登录
// // Vue.prototype.Login = function(params={}){
// //     let device = this.userAgent();
// //     let _this = this;
// //     if(this.isEmpty(params.account)){
// //         device ? this.$toast('账号不能为空') : this.$message({type:'warning',message:'帐号不能为空',});
// //     }else if(this.isEmpty(params.password)){
// //         device ? this.$toast('密码不能为空') : this.$message({type:'warning',message:'密码不能为空',})
// //     }else {
// //         axios.post('/api/user/login',{params}).then(function(res){
// //             if(res.data.state == 1){
// //                 _this.$router.push('/');
// //                 _this.$router.go(0);
// //             }else {
// //                 device ? _this.$toast('账号或密码错误') :_this.$message({type:'warning',msg:'账号或密码错误',});
// //             }
// //         }); 
// //     }
// // }
// //退出
// // Vue.prototype.Logout = function(){
// //     axios.get('/api/user/logout').then(res=>{
// //         if(res.data.state == 1){ this.$router.push('/');};
// //     });
// // }
// //注册
// // Vue.prototype.Register = function(params={}){
// //     let _this= this ;
// //     let device = this.userAgent();
// //     let email_reg = /@/ig;
// //     if(this.isEmpty(params.nick_name)){
// //         device ? this.$toast('昵称不能为空') : this.$message({type:'warning',message:'昵称不能为空'});
// //     }else if(this.isEmpty(params.account)){
// //         device ? this.$toast('邮箱不能为空') : this.$message({type:'warning',message:'邮箱不能为空'});
// //     }else if(!email_reg.test(params.account)){
// //         device ? this.$toast('邮箱格式错误，请重新输入') : this.$message({type:'warning',message:'邮箱格式错误，请重新输入'});
// //     }else if(this.isEmpty(params.password)){
// //         device ? this.$toast('密码不能为空') : this.$message({type:'warning',message:'密码不能为空'});
// //     }else if(this.isEmpty(params.r_password)){
// //         device ? this.$toast('请重复密码') : this.$message({type:'warning',message:'请重复密码'});
// //     }else if(params.r_password.length < 6 || params.password.length < 6){
// //         device ? this.$toast('密码长度最少应为6位') : this.$message({type:'warning',message:'密码长度最少应为6位'});
// //     }else if(params.password !== params.r_password){
// //         device ? this.$toast('两次输入的密码不一致') : this.$message({type:'warning',message:'两次输入的密码不一致'});
// //     }else {
// //         axios.post('/api/user/register',{params}).then(res=>{
// //             if(res.data.state == 1){
// //                 this.$router.push('/');
// //                 this.$router.go(0);
// //             }else{
// //                 device ? _this.$toast('注册失败') : _this.$message({type:'warning',message:res.data.msg,});;     
// //             }
// //         });        
// //     }

// // }
// //获取用户信息
// // Vue.prototype.get_user = function(params={}){
// //     return axios.post('/api/user/get_user',{params});
// // }
// //提交用户信息
// // Vue.prototype.update_user = function(params={}){
// //     axios.post('/api/user/update_user',{params});
// // }
// //获取背景
// // Vue.prototype.get_background = function (params={}) {  
// //     return axios.post('/api/user/get_background',{params});
// // }
// //提交背景
// // Vue.prototype.update_background = function(params={}){
// //     return axios.post('/api/user/update_background',{params});
// // }
// //获取用户消息
// Vue.prototype.get_message = (params={})=>{
//     return axios.post('api/user/get_message',{params});
// }
// //结束符
// };


