import axios from 'axios'
import { Message } from 'element-ui';
import { Toast } from 'vant'

export default {
//移动端屏幕配适
mobileScale(){
    let ratio = 375/667, //原设计稿的宽高比(i6为375/667)
    mWidth = document.documentElement.clientWidth,
    mHeight = document.documentElement.clientHeight,
    // mRatio = mWidth/mHeight,
    zoom;
    zoom = (mHeight/667).toString().substring(0, 6);
    let _body = document.getElementsByTagName('body')[0];
    _body.setAttribute('style',`zoom:${zoom}; opacity:1;`);
},
//判断是PC端还是移动端
userAgent(){
    let userAgent = navigator.userAgent.toLowerCase();
    let _userAgent = (userAgent.match(/iphone/i) && 'iphone') || (userAgent.match(/ipad/i) && 'ipad') || (userAgent.match(/ipod/i) && 'ipod') || (userAgent.match(/midp/i) && 'midp') || (userAgent.match(/android/i) && 'android') || (userAgent.match(/blackberry/i) && 'blackberry') || (userAgent.match(/hpwos/i) && 'hpwos') || (userAgent.match(/symbian/i) && 'symbian') || (userAgent.match(/windows phone/i) && 'windows phone') || (userAgent.match(/ucweb/i) && 'ucweb') || 'pc';
    let _isMobile = _userAgent.match(/(iphone|ipad|ipod|midp|android|blackberry|hpwos|symbian|windows phone|ucweb)/i)?true:false;
    // console.log(_userAgent,_isMobile);
    return ({_userAgent,_isMobile});
},
//判断是否为空
isEmpty(val){
    if(typeof val == "undefined" || val == null || val == ""){
        return true;
    }else{
        return false;
    }
},
//GET SESSION
get_session(resolve,reject){
    axios.get('/api/public/get_session').then(res=>{resolve(res);});
},
//开发中提示
develope(){
    let isMobile =  this.userAgent()._isMobile;
    isMobile ? Toast('开发中.....') : Message({type:'warning',message:'开发中.....'});
},
//获取LOGO 和 TYPE
get_logo(resolve,reject){
    axios.get('/api/public/get_logo').then(res=>{resolve(res)});
},
//登录页,跳转注册框
loginAnimation(){
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
},
//输入框下划线动画
addInputAnimation(id){
    var el = document.getElementById(id);
    el.classList.add('input-is-focused'); 
},
removeInputAnimation(id){
    var el = document.getElementById(id);
    let input = el.getElementsByClassName('el-input__inner')[0];
    var val = input.value;
    if(val.trim().length <= 0 ){
        el.classList.remove('input-is-focused'); 
    }
},
//获取轮播图
get_carousel(params,resolve,reject){
    axios.post('/api/public/get_carousel_list',{params}).then(res=>{resolve(res)});
},
//获取BLOG META
get_blog_meta(params,resolve,reject){
    axios.post('/api/public/get_blog_meta',{params}).then(res=>{resolve(res)});
},
//分享
share(type){
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
            let isMobile = this.userAgent()._isMobile;
            isMobile ? Vue.$toast("分享出错") : Vue.$message({type:'warning',message:'分享出错'});
    }
},
//获取内存
systemInfo(resolve,reject){
    axios.post('/api/public/get_test',{}).then(res=>{resolve(res)});
},
//获取总条数
get_count(resolve,reject){
    axios.post('/api/public/get_count',{params}).then(res=>{resolve(res)});
},








//结束符    
}