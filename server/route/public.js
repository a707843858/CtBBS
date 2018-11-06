"use strict";
const pool = require('./db');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');
const os = require('os');



module.exports = {
//-----------------GET-----------------
//获取Session
getSession(req,res,next){
    req.session.uid = req.session.uid > 0 ? req.session.uid : undefined;
    res.send(req.session);
},
//获取顶部logo类型
getLogo(req,res,next){
  var sql = `SELECT meta_value FROM wp_blog_meta WHERE meta_name in ('blog_name','logo_type')`;
  pool.query(sql,function(err,result){
    res.send(result);
  })
},
//获取网站信息
getBlogConnect(req,res,next){
  var sql = "SELECT meta_value FROM wp_blog_meta WHERE meta_name in ('qq','wechat','weibo','phone','email')";
  pool.query(sql,function(err,result){
      res.send(result);
  });
},
//获取admin网站设置页面预设信息
getBlogPage(req,res,next){
  var sql = `SELECT meta_value FROM wp_blog_meta`;
  pool.query(sql,function(err,result){
      res.send(result);
  });
},



//---------------------POST---------------
//获取Blog Meta
getBlogMeta(req,res,netx){
  var meta = req.body.params.meta;
  var sql = "SELECT * FROM wp_blog_meta WHERE meta_name  = ?";
  pool.query(sql,[meta],function(err,result){   
    res.send(result);
  });
},
//获取背景列表
getBackgroundList(req,res,next){
  var type = req.body.params.type;
  var sql = "SELECT * FROM background_meta WHERE type = ?";
  pool.query(sql,[type],function(err,result){  
      res.send(result);
  });
},

//保存blog Meta
updateBlogMeta(req,res,next){
  var obj = req.body;
  var meta = obj.meta ;
  var  value = obj.value ;
  var sql = 'UPDATE wp_blog_meta SET meta_value = ? WHERE meta_name = ?';
  pool.query(sql,[value,meta],function(err,result){
      res.send({status:1});
  });
},
//保存背景图
updateBackground(req,res,next){
  var id = req.body.id;
  var meta = req.body.meta;
  var val = req.body.val;
  var sql = 'UPDATE background_meta SET '+ meta +'= ? WHERE id = ? ';
  pool.query(sql,[val,id],function(err,result){
    res.send({status:1});
  });
},
//添加背景图
insertBackground(req,res,next){
  var title = req.body.title;
  var url = req.body.url;
  var extend = req.body.extend;
  extend = extend?extend:'no-repeat';
  var type = req.body.type;
  var sql =" INSERT INTO background_meta(`title`,`type`,`url`,`extend`) VALUES(?,?,?,?)";
  pool.query(sql,[title,type,url,extend],function(err,result){ 
      res.send({status:1});
  });
},
//删除背景图
deleteBackground(req,res,next){
  var id = req.body.id;
  var sql = "DELETE FROM background_meta WHERE id = ?";
  pool.query(sql,[id],function(err,result){     
      res.send({status:1});
  });
},
//获取轮播图
getCarouselList(req,res,next){
  var type = req.body.params.type;
  var sql = "SELECT * FROM carousel_meta WHERE type = ?";
  pool.query(sql,[type],function(err,result){    
    res.send(result);
  });
},
//保存轮播图
updateCarousel(req,res,next){
  var id = req.body.id;
  var meta =  req.body.meta;
  var val = req.body.val;
  var sql = "UPDATE carousel_meta SET "+ meta +" = ? WHERE id  = ?";
  pool.query(sql,[val,id],function(err,result){       
      res.send({status:1});
  });
},
//添加轮播图
insertCarousel(req,res,next){
  var type = req.body.type;
  var url = req.body.url;
  var title = req.body.title;
  var link = req.body.link;
  var sql = "INSERT INTO carousel_meta(`title`,`type`,`link`,`url`) VALUES(?,?,?,?)";
  pool.query(sql,[title,type,link,url],function(err,result){   
      res.send({status:1});
  });
},
//删除轮播图
deleteCarousel(req,res,next){
  var id = req.body.id;
  var sql = "DELETE FROM carousel_meta WHERE id = ?";
  pool.query(sql,[id],function(err,result){     
      res.send({status:1});
  });
},
//获取cup
get_test(req,res,next){
  // var result = new Array();
  // result.push('cup':os.freemem());
  // result.cpu = os.freemem();
  let ram = os.freemem();//空余内存字节数
  let arch = os.arch();//操作系统CPU架构
  let cups = os.cpus();
  let hostName = os.hostname();
  let loadAvg = os.loadavg();
  let release = os.release();
  let totalmem = os.totalmem();//总共内存字节
  let osType = os.type();//操作系统名字
  let userInfo = os.userInfo();//当前用户信息
  let memoryUsage = process.memoryUsage();
  // console.log(result,cpu);
  // console.log(parseInt(ram/totalmem * 100 )+'%');
  res.send({
    ram:ram,
    arch:arch,
    cups:cups,
    hostName:hostName,
    loadAvg:loadAvg,
    release:release,
    totalmem:totalmem,
    osType:osType,
    userInfo:userInfo,
    memoryUsage:memoryUsage,
  });
  
},
//获取数据总条数
get_count(req,res,next){
  let obj = req.body.params;
  let table = obj.table;
  let meta = obj.meta ;
  let sql = `SELECT COUNT('${meta}') FROM ${table} `;
  pool.query(sql,[],(err,result)=>{
      res.send(result);
  });
},

};
