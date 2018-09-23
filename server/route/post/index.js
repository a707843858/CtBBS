var express = require('express');
var router = express.Router();
var api = require('./api');

//--------------GET------------------
//获取文章全部分类
router.get('/get_category_all',function(req,res,next){
    api.getCategoryAll(req,res,next);
});





//----------POST-------------------
//获取最新文章
router.post('/get_latest_post',(req,res,next)=>{
    api.getLatestPost(req,res,next);     
});
//根据ID排序文章
router.post('/get_post_order_by_id',function(req,res,next){
    api.getPostOrderById(req,res,next);
});
//根据评论排序帖子
router.post('/get_post_order_by_comment',(req,res,next)=>{
    api.getPostOrderByComment(req,res,next);
});
//通过ID获取文章
router.post('/get_post_by_id',(req,res,next)=>{
    api.getPostById(req,res,next);
});
//通过分类ID获取文章
router.post('/get_post_by_category',(req,res,next)=>{
    api.getPostByCategory(req,res,next);
});
//通过作者ID获取文章
router.post('/get_post_by_author',(req,res,next)=>{
    api.getPostByAuthor(req,res,next);
});
//搜索帖子
router.post('/search_post',function(req,res,next){
    api.searchPost(req,res,next);
});
//提交/编辑帖子
router.post('/update_post',function(req,res,next){
    api.updatePost(req,res,next);
});
//获取全部评论
router.post('/get_comment_all',function(req,res,next){
    api.getCommentAll(req,res,next);
});
//通过文章ID获取评论
router.post('/get_comment_by_pid',(req,res,next)=>{
    api.getCommentByPid(req,res,next);
});
//获取空间评论
router.post('/get_zone_comment',(req,res,next)=>{
    api.getZoneComment(req,res,next);
});
//搜索评论
router.post('/search_comment',function(req,res,next){
    api.searchComment(req,res,next);
});
//提交评论
router.post('/insert_comment',(req,res,next)=>{
    api.insertComment(req,res,next);
});
//修改评论
router.post('/update_comment',function(req,res,next){
  api.updateComment(req,res,next);
});
//删除评论
router.post('/delete_comment',function(req,res,next){
    api.deleteComment(req,res,next);
});











module.exports = router;