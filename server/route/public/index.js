var express = require('express');
var router = express.Router();
var api = require('./api');





//<-----------------GET---------------->
// 获取session
router.get('/get_session', (req, res, next) => {
  api.getSession(req,res,next);
});    
//获取顶部logo类型
router.get('/get_logo',(req,res,next)=>{
  api.getLogo(req,res,next);
});
//获取网站联系信息
router.get('/get_connect',function(req,res,next){
  api.getBlogConnect(req,res,next);
});
//获取网站设置页面预设信息
router.get('/get_admin_blog_page',(req,res,next)=>{
  api.getBlogPage(req,res,next);
});













//<-----------------POST---------------->
//获取blog的meta
router.post('/get_blog_meta',function(req,res,next){
  api.getBlogMeta(req,res,next);
});
//获取背景列表
router.post('/get_background_list',function(req,res,next){
  api.getBackgroundList(req,res,next);
});
//获取数据表总数
router.post('/get_total_count',function(req,res,next){
  api.getTotalCount(req,res,next);
});
//保存blog Meta
router.post('/update_blog_meta',(req,res,next)=>{
  api.updateBlogMeta(req,res,next);
});
//保存背景图信息
router.post('/update_background',function(req,res,next){
  api.updateBackground(req,res,next);
});
//插入新的背景图信息
router.post('/insert_background',function(req,res,next){
  api.insertBackground(req,res,next);
});
//删除背景图
router.post('/delete_background',function(req,res,next){
  api.deleteBackground(req,res,next);
});
//获取轮播图数据
router.post('/get_carousel_list',function(req,res,next){
  api.getCarouselList(req,res,next);
});
//保存轮播图数据
router.post('/update_carousel',function(req,res,next){
  api.updateCarousel(req,res,next);
});
//插入新的轮播图
router.post('/insert_carousel',function(req,res,next){
  api.insertCarousel(req,res,next);
});
//删除轮播图
router.post('/delete_carousel',function(req,res,next){
  api.deleteCarousel(req,res,next);
});



// //保存基本信息页内容
// router.post('/user/update_user_information',(req,res,next)=>{
//   api.updateUserInfomation(req,res,next);
// });
// //保存财务设置
// router.post('/user/update_financial',(req,res,next)=>{
//   api.updateUserFinancial(req,res,next);
// })
// //保存社交信息
// router.post('/user/update_social',(req,res,next)=>{
//   api.updateUserSocial(req,res,next);
// })

module.exports = router;

