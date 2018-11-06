import Vue from 'vue'
import common from './common'
import user from './user'
import post from './post'

export default{
install(Vue,options){
/* * * * * * *
 * 
 * PUBLIC
 * 
 * * * * * * */
//配适web端网页尺寸
Vue.prototype.mobileScale = function(){
    common.mobileScale();
};
//判断是PC端还是移动端
Vue.prototype.userAgent = function () { 
    common.userAgent();
};
//判断是否为空
Vue.prototype.isEmpty = function(val){
    common.isEmpty(val);
};
//Get Session
Vue.prototype.get_session = function(){
    return new Promise((resolve,reject)=>{
        common.get_session(resolve,reject);
    });
};
//开发中提示
Vue.prototype.develope = function(){
    return new Promise((resolve,reject)=>{ 
        common.develope();
    })        
};
//获取Logo & Type
Vue.prototype.get_logo = function(){
    return new Promise((resolve,reject)=>{
        common.get_logo(resolve,reject);
    });
};
//登录页,跳转注册框
Vue.prototype.loginAnimation = function(tab){
    common.loginAnimation();
};
//输入框下划线动画
Vue.prototype.addInputAnimation = (id) => {
    common.addInputAnimation(id);     
};
Vue.prototype.removeInputAnimation = (id) =>{
    common.removeInputAnimation(id);
};
//获取轮播图列表
Vue.prototype.get_carousel = (params={})=>{
    return new Promise((resolve,reject)=>{
        common.get_carousel(params,resolve,reject);
    });
};
//获取Blog Meta 
Vue.prototype.get_blog_meta = function(params={}){
    return new Promise((resolve,reject)=>{
        common.get_blog_meta(params,resolve,reject);
    });
};
//分享
Vue.prototype.share = function(type){
    common.share(type);
};
//获取内存
Vue.prototype.systemInfo = function(){
    return new Promise((resolve,reject)=>{
        common.systemInfo(resolve,reject);
    });
};
//获取数据条总数
Vue.prototype.get_count = function(params={}){
    return new Promise((resolve,reject)=>{
        common.get_count(resolve,reject);
    });
};





/* * * * * * *
 * 
 * POST
 * 
 * * * * * * */
//获取文章
Vue.prototype.get_post = function(params={}){
    return new Promise((resolve,reject)=>{
        post.get_post(params,resolve,reject);
    });
};
//提交文章
Vue.prototype.update_post = function(params={}){
    return new Promise((resolve,reject)=>{
        post.update_post(params,resolve,reject);
    });
};
//获取文章分类信息
Vue.prototype.get_category = (params={})=>{
    return new Promise((resolve,reject)=>{
        post.get_category(params,resolve,reject);
    });
};
//获取评论
Vue.prototype.get_comment = (params={})=>{
    return new Promise((resolve,reject)=>{
        post.get_comment(params,resolve,reject);
    });
};
//提交评论
Vue.prototype.update_comment = (params={})=>{
    return new Promise((resolve,reject)=>{
        post.update_comment(params,resolve,reject);
    });
};
//图片类帖子处理
Vue.prototype.get_gallery_post = function(str){
    post.get_gallery_post(str);
};
//视频类文章处理
Vue.prototype.get_video_post = function(str){
    let reg_iframe = new RegExp(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi);
    let _video = str.match(reg_iframe);
    let _content = str.replace(reg_iframe,'').replace(/<\/?.+?>/g,'');
    console.log(_video,_content);
    return(_video,_content); 
};
//获取收藏列表
Vue.prototype.get_collect = (params={})=>{
    return new Promise((resolve,reject)=>{
        post.get_collect(params,resolve,reject);
    });
};
//提交收藏
Vue.prototype.update_collect = (params={})=>{
    return new Promise((resolve,reject)=>{
        post.update_collect(params,resolve,reject);
    });
};



 /* * * * * * *
 * 
 * USER
 * 
 * * * * * * */
//新版登录
Vue.prototype.Login = function(params={}){
    return new Promise((resolve,reject)=>{
        user.Login(params,resolve,reject);
    });
},
//注销
Vue.prototype.Logout = ()=>{
    return new Promise((resolve,reject)=>{
        user.Logout(resolve,reject);
    });
};
//注册
Vue.prototype.Register = (params={})=>{
    return new Promise((resolve,reject)=>{
        user.Register(params,resolve,reject);
    });
};
//获取用户信息
Vue.prototype.get_user = (params={}) => {
    return new Promise((resolve,reject)=>{
        user.get_user(params,resolve,reject);
    });
};
//提交用户信息
Vue.prototype.update_user = (params={})=>{
    return new Promise((resolve,reject)=>{
        user.update_user(params,resolve,reject);
    });
};
//获取用户背景
Vue.prototype.get_background = (params={})=>{
    return new Promise((resolve,reject)=>{
        user.get_background(params,resolve,reject);
    });
};
//提交用户背景信息
Vue.prototype.update_background = (params={})=>{
    return new Promise((resolve,reject)=>{
        user.update_background(params,resolve,reject);
    });
};
//获取用户消息
Vue.prototype.get_message = (params={})=>{
    return new Promise((resolve,reject)=>{
        user.get_message(params,resolve,reject);
    });
};

//结束符
}};