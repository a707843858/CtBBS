var express = require('express');
var router = express.Router();
var api = require('./public/api');





//<-----------------GET---------------->
// 获取session
router.get('/user/get_session', (req, res, next) => {
  api.getSession(req,res,next);
});    
//获取顶部logo类型
router.get('/blog/get_logo',(req,res,next)=>{
  api.getLogo(req,res,next);
});
//获取网站联系信息
router.get('/blog/get_connect',function(req,res,next){
  api.getBlogConnect(req,res,next);
});
//获取用户组分类
router.get('/admin/get_user_group_meta',(req,res,next)=>{
  api.getUserGroupAll(req,res,next);
});
//获取帖子分类
router.get('/admin/get_post_category_meta',(req,res,next)=>{
  api.getPostCategory(req,res,next);
});
//获取网站设置页面预设信息
router.get('/admin/get_blog_page',(req,res,next)=>{
  api.getBlogPage(req,res,next);
});













//<-----------------POST---------------->
//登陆
router.post('/user/login',(req,res,next)=>{
  api.userLogin(req,res,next);
});
//获取blog的meta
router.post('/blog/get_meta',function(req,res,next){
  api.getBlogMeta(req,res,next);
});
//获取背景列表
router.post('/blog/get_background_list',function(req,res,next){
  api.getBackgroundList(req,res,next);
});
//获取数据表总数
router.post('/common/get_total_count',function(req,res,next){
  api.getTotalCount(req,res,next);
});
//获取用户背景信息，包括user信息
router.post('/user/get_user_bg',function(req,res,next){
  api.getUserBg(req,res,next);
});
//保存用户背景信息，返回当前背景信息
router.post('/user/update_user_bg',function(req,res,next){
  api.updateUserBg(req,res,next);
});
//注册
router.post('/user/register', (req, res, next) => {
  api.userRegister(req,res,next);
});
//获取user的标签值
router.post('/user/get_user_meta',(req,res,next)=>{
  api.getUserMeta(req,res,next);
});
//保存基本信息页内容
router.post('/user/update_user_information',(req,res,next)=>{
  api.updateUserInfomation(req,res,next);
});
//保存财务设置
router.post('/user/update_financial',(req,res,next)=>{
  api.updateUserFinancial(req,res,next);
})
//保存社交信息
router.post('/user/update_social',(req,res,next)=>{
  api.updateUserSocial(req,res,next);
})
//获取user全部信息
router.post('/user/get_user_all',(req,res,next)=>{
  api.getUserAll(req,res,next);
});
//获取最新帖子
router.post('/post/get_latest_post',(req,res,next)=>{
  api.getLatestPost(req,res,next);     
});
//通过ID获取帖子
router.post('/post/get_the_post',(req,res,next)=>{
  api.getPostById(req,res,next);
});
//通过帖子分类ID
router.post('/post/get_post_by_category',(req,res,next)=>{
  api.getPostByCategory(req,res,next);
});
//获取文章评论
router.post('/post/get_the_comment_by_pid',(req,res,next)=>{
  api.getCommentsByPid(req,res,next);
});
//获取文章作者信息
router.post('/post/get_the_author',(req,res,next)=>{
  api.getPostAuthor(req,res,next);
});
//按照作者ID查询文章
router.post('/post/get_author_post',(req,res,next)=>{
  api.getPostByAuthor(req,res,next);
});
//提交评论
router.post('/post/update_comment',(req,res,next)=>{
  api.updateComment(req,res,next);
});
//admin界面保存user信息
router.post('/admin/update_user_meta',(req,res,next)=>{
  api.updateUserMeta(req,res,next);
});
//搜索用户
router.post('/admin/search_user',(req,res,next)=>{
  api.searchUser(req,res,next);
});
//删除用户
router.post('/admin/delete_user',(req,res,next)=>{
  api.deleteUser(req,res,next);
});
//添加新用户
router.post('/admin/add_user',(req,res,next)=>{
  api.addUser(req,res,next);
});
//保存blog Meta
router.post('/admin/update_blog_meta',(req,res,next)=>{
  api.updateBlogMeta(req,res,next);
});
//获取admin评论管理页面
router.post('/admin/get_comment',function(req,res,next){
  api.getCommentAll(req,res,next);
});
//admin页面保存评论内容
router.post('/admin/update_comment',function(req,res,next){
  api.updateCommentMeta(req,res,next);
});
//admin页面删除评论
router.post('/admin/delete_comment',function(req,res,next){
  api.deleteComment(req,res,next);
});
//admin评论页面搜索评论
router.post('/admin/search_comment',function(req,res,next){
  api.searchComment(req,res,next);
});
//获取admin帖子页面
router.post('/admin/get_post',function(req,res,next){
  api.getPostOrderById(req,res,next);
});
//admin帖子页面获取全部分类
router.get('/admin/get_category',function(req,res,next){
  api.getCategoryAll(req,res,next);
});
//admin帖子页面搜索
router.post('/admin/search_post',function(req,res,next){
  api.searchPost(req,res,next);
});
//保存背景图信息
router.post('/admin/update_background',function(req,res,next){
  api.updateBackground(req,res,next);
});
//插入新的背景图信息
router.post('/admin/insert_background',function(req,res,next){
  api.insertBackground(req,res,next);
});
//删除背景图
router.post('/admin/delete_background',function(req,res,next){
  api.deleteBackground(req,res,next);
});
//获取轮播图数据
router.post('/admin/get_carousel_list',function(req,res,next){
  api.getCarouselList(req,res,next);
});
//保存轮播图数据
router.post('/admin/update_carousel',function(req,res,next){
  api.updateCarousel(req,res,next);
});
//插入新的轮播图
router.post('/admin/insert_carousel',function(req,res,next){
  api.insertCarousel(req,res,next);
});
//删除轮播图
router.post('/admin/delete_carousel',function(req,res,next){
  api.deleteCarousel(req,res,next);
});
//获取user用户组
router.post('/user/get_user_group',function(req,res,next){
    api.getUserGroup(req,res,next);
});
//提交/编辑帖子
router.post('/post/update_post',function(req,res,next){
  api.updatePost(req,res,next);
});
//按照评论排序帖子
router.post('/post/get_post_order_by_comment',(req,res,next)=>{
  api.getPostOrderByComment(req,res,next);
});
module.exports = router;

