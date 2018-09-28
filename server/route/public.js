"use strict";
const pool = require('./db');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');



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
  var meta = req.body.meta;
  var sql = "SELECT * FROM wp_blog_meta WHERE meta_name  = ?";
  pool.query(sql,[meta],function(err,result){   
    res.send(result);
  });
},
//获取背景列表
getBackgroundList(req,res,next){
  var type = req.body.type;
  var sql = "SELECT * FROM background_meta WHERE type = ?";
  pool.query(sql,[type],function(err,result){  
      res.send(result);
  });
},
//获取数据总条数
getTotalCount(req,res,next){
  var type = req.body.type;
  if(type != undefined | type != null){
    var sql = 'SELECT COUNT(*) FROM wp_'+ req.body.table + ' WHERE type = ?';
    pool.query(sql,[type],function(err,result){
      res.send(result);
    }); 
  }else {
      var sql = 'SELECT COUNT(*) FROM wp_'+ req.body.table ;
      pool.query(sql,function(err,result){
        
        res.send(result);
      }); 
  };
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
  var type = req.body.type;
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


//保存基本信息页内容
// updateUserInfomation(req,res,next){
//   var obj = req.body;
//   var uid = obj.uid;
//   var nick_name = obj.nick_name;
//   var age = obj.age;
//   var sex = obj.sex;
//   var sign = obj.sign;
//   var job = obj.job ;
//   var sql = `UPDATE wp_user SET nick_name = ?,age = ?,sex = ?,sign = ?,job = ? WHERE id = ?`;
//   pool.query(sql,[nick_name,age,sex,sign,job,uid],function(err,result){   
//     res.send({msg:'更新成功',status:1});
//   }); 
// },
//保存财务设置
// updateUserFinacial(req,res,next){
//   var obj = req.body;
//   var uid = obj.uid;
//   var real_name = obj.real_name;
//   var alipay = obj.alipay;
//   var recieve_address = obj.recieve_address;
//   var sql = `UPDATE wp_user SET real_name = ? , alipay = ?,recieve_address = ? WHERE id = ?`;
//   pool.query(sql,[real_name,alipay,recieve_address,uid],function(err,result){
//     res.send({status:1,msg:'更新成功'});
//   });
// },
//保存社交信息
// updateUserSocial(req,res,next){
//   var obj = req.body;
//   var uid = obj.uid;
//   var qq = obj.qq;
//   var wechat = obj.wechat;
//   var weibo = obj.weibo;
//   var github = obj.github;
//   var facebook = obj.facebook;
//   var sql = `UPDATE wp_user SET qq = ?,wechat = ?,weibo = ?,github = ?,facebook = ? WHERE id = ?`;
//   pool.query(sql,[qq,wechat,weibo,github,facebook,uid],function(err,result){
//     res.send({status:1,msg:'更新成功'});
//   });
// },

};
