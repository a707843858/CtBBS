var express = require('express');
var router = express.Router();
var public = require('./public');
var post = require('./post');
var user =  require('./user');

//-----------PUBLIC  公共----------------------
//<-----------------GET---------------->
// 获取session
router.get('/public/get_session', (req, res, next) => {
  public.getSession(req,res,next);
});    
//获取顶部logo类型
router.get('/public/get_logo',(req,res,next)=>{
  public.getLogo(req,res,next);
});
//获取网站联系信息
router.get('/public/get_connect',function(req,res,next){
  public.getBlogConnect(req,res,next);
});
//获取网站设置页面预设信息
router.get('/public/get_admin_blog_page',(req,res,next)=>{
  public.getBlogPage(req,res,next);
});
//<-----------------POST---------------->
//获取blog的meta
router.post('/public/get_blog_meta',function(req,res,next){
  public.getBlogMeta(req,res,next);
});
//获取背景列表
router.post('/public/get_background_list',function(req,res,next){
  public.getBackgroundList(req,res,next);
});
//保存blog Meta
router.post('/public/update_blog_meta',(req,res,next)=>{
  public.updateBlogMeta(req,res,next);
});
//保存背景图信息
router.post('/public/update_background',function(req,res,next){
  public.updateBackground(req,res,next);
});
//插入新的背景图信息
router.post('/public/insert_background',function(req,res,next){
  public.insertBackground(req,res,next);
});
//删除背景图
router.post('/public/delete_background',function(req,res,next){
  public.deleteBackground(req,res,next);
});
//获取轮播图数据
router.post('/public/get_carousel_list',function(req,res,next){
  public.getCarouselList(req,res,next);
});
//保存轮播图数据
router.post('/public/update_carousel',function(req,res,next){
  public.updateCarousel(req,res,next);
});
//插入新的轮播图
router.post('/public/insert_carousel',function(req,res,next){
  public.insertCarousel(req,res,next);
});
//删除轮播图
router.post('/public/delete_carousel',function(req,res,next){
  public.deleteCarousel(req,res,next);
});
//获取信息
router.post('/public/get_test',(req,res,next)=>{
  public.get_test(req,res,next);
});
//获取数据表总数
router.post('/public/get_count',function(req,res,next){
  public.get_count(req,res,next);
});


//--------------POST  文章---------------
//获取文章
router.post('/post/get_post',function(req,res,next){
  post.get_post(req,res,next);
});
//提交文章
router.post('/post/update_post',(req,res,next)=>{
  post.update_post(req,res,next);
});
//获取分类信息
router.post('/post/get_category',function(req,res,next){
  post.get_category(req,res,next);
});
//获取评论
router.post('/post/get_comment',function(req,res,next){
  post.get_comment(req,res,next);
});
//提交评论
router.post('/post/update_comment',function(req,res,next){
  post.update_comment(req,res,next);
});
//获取收藏
router.post('/post/get_collect',function(req,res,next){
  post.get_collect(req,res,next);
});
//提交收藏
router.post('/post/update_collect',(req,res,next)=>{
  post.update_collect(req,res,next);
});





//-----------USER 用户-------------
//------GET----------
//获取用户组分类
router.get('/user/get_user_group_all',(req,res,next)=>{
  user.getUserGroupAll(req,res,next);
});
//退出
router.get('/user/logout',(req,res,next)=>{
  user.logout(req,res,next);
});

//--------POST------
//登陆
router.post('/user/login',(req,res,next)=>{
  user.Login(req,res,next);
});
//注册
router.post('/user/register', (req, res, next) => {
  user.Register(req,res,next);
});
//获取用户信息
router.post('/user/get_user',(req,res,next)=>{
  user.get_user(req,res,next);
});
//提交用户信息
router.post('/user/update_user',(req,res,next)=>{
  user.update_user(req,res,next);
});
//获取背景信息
router.post('/user/get_background',(req,res,next)=>{
  user.get_background(req,res,next);
});
//提交背景信息
router.post('/user/update_background',(req,res,next)=>{
  user.update_background(req,res,next);
});


//获取用户背景信息，包括user信息
router.post('/user/get_user_bg',function(req,res,next){
  user.getUserBg(req,res,next);
});
//保存用户背景信息，返回当前背景信息
router.post('/user/update_user_bg',function(req,res,next){
  user.updateUserBg(req,res,next);
});
//获取user全部信息
router.post('/user/get_user_all',(req,res,next)=>{
  user.getUserAll(req,res,next);
});
//获取user Meta
router.post('/user/get_user_meta',(req,res,next)=>{
  user.getUserMeta(req,res,next);
});
//保存user Meta
router.post('/user/update_user_meta',(req,res,next)=>{
  user.updateUserMeta(req,res,next);
});
//搜索用户
router.post('/user/search_user',(req,res,next)=>{
  user.searchUser(req,res,next);
});
//删除用户
router.post('/user/delete_user',(req,res,next)=>{
  user.deleteUser(req,res,next);
});
//添加新用户
router.post('/user/add_user',(req,res,next)=>{
  user.addUser(req,res,next);
});
//获取user用户组
router.post('/user/get_user_group',function(req,res,next){
  user.getUserGroup(req,res,next);
});
//获取用户消息
router.post('/user/get_message',(req,res,next)=>{
  user.get_message(req,res,next);
});










module.exports = router;

