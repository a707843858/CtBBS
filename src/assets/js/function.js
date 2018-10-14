const _axios = require('axios');



const axios = _axios.create({});
// axios.defaults.baseURL = 'http://localhost:3000/',
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';//默认Post请求头
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.responseType = 'json';//默认返回数据类型
// axios.defaults.transformRequest = [function (data) {    //数据序列化
//     return qs.stringify(data);
//     }
// ];
axios.defaults.validateStatus = function (status) { //status Code
    return true;
};
//数据发送前的操作
axios.interceptors.request.use(function (config) {
    //配置config
    config.headers.Accept = 'application/json';
    return config;
});
//对返回数据的操作
// axios.interceptors.response.use(function (response) {
//     return response;
// });
// const host = process.env.NODE_ENV === 'development' ? 'dev api host' : 'prod api host';











//定义全局函数
exports.install = function (Vue, options) {

//-------------其他-----------------
//Get Session
Vue.prototype.get_session = function(){
    return axios.get('/api/public/get_session');
}
//开发中提示
Vue.prototype.develope = function(){
    this.$message({
        type:'warning',
        message:'开发中.....',
    });
}
//获取Logo & Type
Vue.prototype.get_logo = function(){
    return axios.get('/api/public/get_logo');
}
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
Vue.prototype.get_carousel_list = function(type){
   return axios.post('/api/public/get_carousel_list',{type:type})
}
//获取Blog Meta 
Vue.prototype.get_blog_meta = function(meta){
 return axios.post('/api/public/get_blog_meta',{meta:meta});
}
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
//提交评论
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



//------------------------用户--------------------------
//登录
Vue.prototype.Login = function(account,password){
    var self = this;
    if(account.trim().length == 0 ){
        this.$message({
            type:'warning',
            message:'帐号不能为空',
        });
    }else if(password.trim().length == 0){
        this.$message({
            type:'warning',
            message:'密码不能为空',
        });
    }else {
        axios.post('/api/user/login',{account:account,password:password}).then(function(res){
            if(res.data.state == 1){
                self.$router.push('/');
                self.$router.go(0);
            }else {
                self.$message({
                    type:'warning',
                    msg:res.date.msg,
                });
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
    var self = this ;
    axios.post('/api/user/register',{params}).then(res=>{
        if(res.data.state == 1){
            this.$router.push('/');
            this.$router.go(0);
        }else{
            this.$message({
                type:'warning',
                message:res.data.msg,
            });
        }
    });
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
    return axios .post('/api/user/update_background',{params});
}

//结束符
};


