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
//获取数据表总数
router.post('/public/get_total_count',function(req,res,next){
  public.getTotalCount(req,res,next);
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





//--------------POST  文章---------------
//--------------GET------------------
//获取文章全部分类
router.get('/post/get_category_all',function(req,res,next){
  post.getCategoryAll(req,res,next);
});
//----------POST-------------------
//获取最新文章
router.post('/post/get_latest_post',(req,res,next)=>{
  post.getLatestPost(req,res,next);     
});
//根据ID排序文章
router.post('/post/get_post_order_by_id',function(req,res,next){
  post.getPostOrderById(req,res,next);
});
//根据评论排序帖子
router.post('/post/get_post_order_by_comment',(req,res,next)=>{
  post.getPostOrderByComment(req,res,next);
});
//通过ID获取文章
router.post('/post/get_post_by_id',(req,res,next)=>{
  post.getPostById(req,res,next);
});
//通过分类ID获取文章
router.post('/post/get_post_by_category',(req,res,next)=>{
  post.getPostByCategory(req,res,next);
});
//通过作者ID获取文章
router.post('/post/get_post_by_author',(req,res,next)=>{
  post.getPostByAuthor(req,res,next);
});
//搜索帖子
router.post('/post/search_post',function(req,res,next){
  post.searchPost(req,res,next);
});
//提交/编辑帖子
router.post('/post/update_post',function(req,res,next){
  post.updatePost(req,res,next);
});
//获取全部评论
router.post('/post/get_comment_all',function(req,res,next){
  post.getCommentAll(req,res,next);
});
//通过文章ID获取评论
router.post('/post/get_comment_by_pid',(req,res,next)=>{
  post.getCommentByPid(req,res,next);
});
//获取空间评论
router.post('/post/get_zone_comment',(req,res,next)=>{
  post.getZoneComment(req,res,next);
});
//搜索评论
router.post('/post/search_comment',function(req,res,next){
  post.searchComment(req,res,next);
});
//提交评论
router.post('/post/insert_comment',(req,res,next)=>{
  post.insertComment(req,res,next);
});
//修改评论
router.post('/post/update_comment',function(req,res,next){
  post.updateComment(req,res,next);
});
//删除评论
router.post('/post/delete_comment',function(req,res,next){
  post.deleteComment(req,res,next);
});
//获取分类meta
router.post('/post/get_category_meta',function(req,res,next){
  post.getCategoryMeta(req,res,next);
});





//-----------USER 用户-------------
//------GET----------
//获取用户组分类
router.get('/user/get_user_group_all',(req,res,next)=>{
  user.getUserGroupAll(req,res,next);
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
module.exports = router;

