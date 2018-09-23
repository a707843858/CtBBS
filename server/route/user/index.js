var express = require('express');
var router = express.Router();
var api = require('./api');

//------GET----------
//获取用户组分类
router.get('/get_user_group_all',(req,res,next)=>{
    api.getUserGroupAll(req,res,next);
});




//--------POST------
//登陆
router.post('/login',(req,res,next)=>{
    api.Login(req,res,next);
});
//注册
router.post('/register', (req, res, next) => {
  api.Register(req,res,next);
});
//获取用户背景信息，包括user信息
router.post('/get_user_bg',function(req,res,next){
    api.getUserBg(req,res,next);
});
//保存用户背景信息，返回当前背景信息
router.post('/update_user_bg',function(req,res,next){
    api.updateUserBg(req,res,next);
});
//获取user全部信息
router.post('/get_user_all',(req,res,next)=>{
    api.getUserAll(req,res,next);
});
//获取user Meta
router.post('/get_user_meta',(req,res,next)=>{
    api.getUserMeta(req,res,next);
});
//保存user Meta
router.post('/update_user_meta',(req,res,next)=>{
    api.updateUserMeta(req,res,next);
});
//搜索用户
router.post('/search_user',(req,res,next)=>{
    api.searchUser(req,res,next);
});
//删除用户
router.post('/delete_user',(req,res,next)=>{
    api.deleteUser(req,res,next);
});
//添加新用户
router.post('/add_user',(req,res,next)=>{
    api.addUser(req,res,next);
});
//获取user用户组
router.post('/get_user_group',function(req,res,next){
    api.getUserGroup(req,res,next);
});




module.exports = router;