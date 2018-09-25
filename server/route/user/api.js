"use strict";
const pool = require('../db');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');



module.exports = {
//----------GET------------
//获取用户组分类
getUserGroupAll(req,res,next){
  var sql = 'SELECT * FROM wp_group_meta';
  pool.query(sql,function(err,result){
    res.send(result);
  });
},







//----------POST------------
//登录
Login(req,res,next){
  var object = req.body;
  var account = object.account;
  var password = object.password;
  var sql = 'SELECT id FROM `wp_user` WHERE email = ? AND password = ?';
  pool.query(sql,[account,password],function(err,result){
        if(result.length !== 0){
          req.session.uid = result[0].id;
          res.send({status:1});
        }else{
          res.send({msg:'账号或者密码错误'});
        }      
  });
},
//注册
Register(req,res,next){
  var  obj = req.body;
  var  nick_name = obj.nick_name;
  var  account = obj.account;
  var  password = obj.password;
  var  repeat_password = obj.repeat_password;
  var  serch_user = `select id from wp_user WHERE email = ?`;
  var  is_in = pool.query(serch_user,[account]);
  if(account == ''){
      res.send({msg:'账号不能为空'});
    }else if (nick_name == ''){
      res.send({msg:'请输入用户昵称'});
    }else if (password == ''){
      res.send({msg:'密码不能为空'});
    }else if (repeat_password == ''){
      res.send({msg:'请再重复确认密码'});
    }else if (password !== repeat_password ){
      res.send({msg:'两次输入的密码不一致'});
    }else if(password.length>10 | repeat_password.length >10){
      res.send({msg:'密码最大长度为10位,已经超出当前长度'});
    }else if(password.length<6 | repeat_password.length <6){
      res.send({msg:'密码最小长度为6位,为了安全请增加密码长度'});
    }else if (is_in != ''){
      res.send({msg:'用户已存在'});
    }else{
      var  sql = 'INSERT INTO wp_user VALUES(NULL,?,NULL,?,?,NULL,NULL)';
      pool.query(sql,[account,nick_name,password],function(err,result){
      
      res.send({msg:'注册成功',status:1});
    });
    }
},
//获取用户背景信息，包括user信息
getUserBg(req,res,next){
  var uid = req.body.uid?req.body.uid:(req.session.uid?req.session.uid:0);
  var meta = req.body.meta;
  // if(uid>0){
      var sql ='SELECT background_meta.id,zone,url,extend FROM wp_user LEFT JOIN background_meta ON wp_user.'+meta+' = background_meta.id WHERE wp_user.id = ?';    
      pool.query(sql,[uid],function(err,result){
        res.send(result);
      });
    // }else{//未登录
    //   var sql ='SELECT * FROM wp_blog_meta LEFT JOIN background_meta ON wp_blog_meta.meta_value = background_meta.id WHERE meta_name = ?';
    //   pool.query(sql,[meta],function(err,result){
    //     res.send(result);
    //   });
    // }  
},
//保存用户背景信息，返回当前背景信息
updateUserBg(req,res,next){
  var uid = req.body.uid?req.body.uid:req.session.uid;
  var meta = req.body.meta;
  var value = req.body.value;
  var sql = 'UPDATE wp_user SET '+ meta +' = ? WHERE id = ? ';
  pool.query(sql,[value,uid],function(err,result){
     var sql2 = "SELECT * FROM background_meta WHERE id = ?";
     pool.query(sql2,[value],function(err,result){
        res.send(result);
     });
  });
},
//获取user全部信息
getUserAll(req,res,next){
  var obj = req.body;
  var start = obj.start;
  var sql = `SELECT * FROM wp_user LIMIT ?,10`;
  pool.query(sql,[start],function(err,result){
    res.send(result);
  });
},
//获取user Meta
getUserMeta(req,res,next){
  var uid = req.body.uid ? req.body.uid : req.session.uid;
  var meta = req.body.meta;
  var sql = 'SELECT '+ meta + ',wp_user.id as uid,wp_group_meta.title as group_title FROM wp_user LEFT JOIN wp_group_meta ON wp_user.group_id = wp_group_meta.id  WHERE wp_user.id = ?';
  pool.query(sql,[uid],function(err,result){
    res.send(result);
  });
},
//保存user Meta
updateUserMeta(req,res,next){
  var uid = req.body.uid > 0?req.body.uid:req.session.uid ;
  var meta = req.body.meta ;
  var value = req.body.value ;
  var sql = 'UPDATE wp_user SET '+ meta +' = ? WHERE id = ? ';
  pool.query(sql,[value,uid],function(err,result){
    res.send({status:'1'});
  });
},
//搜索用户
searchUser(req,ers,next){
  var obj = req.body ;
  var meta = obj.meta ;
  var value = obj.value ;
  var sql = 'SELECT * FROM wp_user WHERE  '+ meta +'  = ?';
  pool.query(sql,[value],function(err,result){
    res.send(result);
  });
},
//删除用户
deleteUser(req,res,next){
  var obj =req.body;
  var uid = obj.uid ;
  var sql = "DELETE FROM wp_user WHERE id = ?";
  pool.query(sql,[uid],function(err,result){
    res.send({status:1,msg:'删除成功'});
  });
},
//添加用户
addUser(req,res,next){
  var obj = req.body ;
  var email = obj.email ;
  var password = obj.password;
  var sql = "INSERT INTO wp_user(`email`, `password`) VALUES(?, ?)";
  pool.query(sql,[email,password],function(err,result){
      res.send(result);
  });
},
//获取user用户组
getUserGroup(req,res,next){
  var uid = req.body.uid?req.body.uid:req.session.uid;
  var sql= "SELECT wp_group_meta.id as id,title,group_id FROM wp_user LEFT JOIN wp_group_meta ON wp_user.group_id = wp_group_meta.id WHERE wp_user.id = ?";
  pool.query(sql,[uid],function(err,result){
    res.send(result);
  });
},











//
};