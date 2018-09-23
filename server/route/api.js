"use strict";
const mysql = require('mysql');
const mysqlConf = require('./db');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');
const rootDir = path.join(__dirname, '../static');


// try {
//     var {transporter, mailOptions, sendMsg} = require('./emailInfo'); // npm包: nodemailer
//   } catch(e) {
//     console.log('缺少文件 emailInfo.js，不能发送邮件');
//   }


// // 连接数据库
// const pool = mysql.createPool({
//     host: mysqlConf.mysql.host,
//     user: mysqlConf.mysql.user,
//     password: mysqlConf.mysql.password,
//     database: mysqlConf.mysql.database,
//     port: mysqlConf.mysql.port,
//     multipleStatements: true    // 多语句查询
//   });
  
// pool.getConnection(function(err){
//      if(err){
//        console.error('数据库连接: '+err.stack);
//      }else{
//        console.log('数据库连接：成功');
//      }
// });


module.exports = {
//GET
//获取Session
getSession(req,res,next){
    req.session.uid = req.session.uid > 0 ? req.session.uid : 0;
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
//获取Blog Meta
getBlogMeta(req,res,netx){
  var meta = req.body.meta;
  var sql = "SELECT * FROM wp_blog_meta WHERE meta_name  = ?";
  pool.query(sql,[meta],function(err,result){   
    res.send(result);
  });
},
//获取用户组分类
getUserGroupAll(req,res,next){
  var sql = 'SELECT * FROM wp_group_meta';
  pool.query(sql,function(err,result){
    res.send(result);
  });
},
//获取帖子分类
getPostCategory(req,res,next){
  var sql = 'SELECT * FROM wp_post_category';
  pool.query(sql,function(err,result){
    res.send(result);
  });
},
//获取网站设置页面预设信息
getBlogPage(req,res,next){
  var sql = `SELECT meta_value FROM wp_blog_meta`;
  pool.query(sql,function(err,result){
      res.send(result);
  });
},



//POST
//登录
userLogin(req,res,next){
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
//获取用户背景信息，包括user信息
getUserBg(req,res,next){
  var uid = req.body.uid?req.body.uid:(req.session.uid?req.session.uid:0);
  var meta = req.body.meta;
  if(uid>0){
      var sql ='SELECT background_meta.id,body_bg,name_card,url,extend FROM wp_user LEFT JOIN background_meta ON wp_user.'+meta+' = background_meta.id WHERE wp_user.id = ?';    
      pool.query(sql,[uid],function(err,result){
        res.send(result);
      });
    }else{//未登录
      var sql ='SELECT * FROM wp_blog_meta LEFT JOIN background_meta ON wp_blog_meta.meta_value = background_meta.id WHERE meta_name = ?';
      pool.query(sql,[meta],function(err,result){
        res.send(result);
      });
    }  
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
//注册
userRegister(req,res,next){
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
//获取user的标签值
getUserMeta(req,res,next){
  var uid = req.body.uid ? req.body.uid : req.session.uid;
  var meta = req.body.meta;
  var sql = 'SELECT '+ meta + ' FROM wp_user WHERE id = ?';
  pool.query(sql,[uid],function(err,result){
    res.send(result);
  });
},
//保存基本信息页内容
updateUserInfomation(req,res,next){
  var obj = req.body;
  var uid = obj.uid;
  var nick_name = obj.nick_name;
  var age = obj.age;
  var sex = obj.sex;
  var sign = obj.sign;
  var job = obj.job ;
  var sql = `UPDATE wp_user SET nick_name = ?,age = ?,sex = ?,sign = ?,job = ? WHERE id = ?`;
  pool.query(sql,[nick_name,age,sex,sign,job,uid],function(err,result){   
    res.send({msg:'更新成功',status:1});
  }); 
},
//保存财务设置
updateUserFinacial(req,res,next){
  var obj = req.body;
  var uid = obj.uid;
  var real_name = obj.real_name;
  var alipay = obj.alipay;
  var recieve_address = obj.recieve_address;
  var sql = `UPDATE wp_user SET real_name = ? , alipay = ?,recieve_address = ? WHERE id = ?`;
  pool.query(sql,[real_name,alipay,recieve_address,uid],function(err,result){
    res.send({status:1,msg:'更新成功'});
  });
},
//保存社交信息
updateUserSocial(req,res,next){
  var obj = req.body;
  var uid = obj.uid;
  var qq = obj.qq;
  var wechat = obj.wechat;
  var weibo = obj.weibo;
  var github = obj.github;
  var facebook = obj.facebook;
  var sql = `UPDATE wp_user SET qq = ?,wechat = ?,weibo = ?,github = ?,facebook = ? WHERE id = ?`;
  pool.query(sql,[qq,wechat,weibo,github,facebook,uid],function(err,result){
    res.send({status:1,msg:'更新成功'});
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
//获取最新帖子
getLatestPost(req,res,next){
  var limit = req.body.limit;
  var start = req.body.start;
  var sql= `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' ORDER BY publishTime DESC LIMIT ?,? `;
  pool.query(sql,[start,limit],function(err,result){     
    res.send(result);
  }); 
},
//通过ID获取帖子
getPostById(req,res,next){
  var pid = req.body.pid;
  var type = req.body.type;
  var sql = 'SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.title as category_title FROM wp_post LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.id = ? AND type = ?';
  pool.query(sql,[pid,type],function(err,result){    
    res.send(result);
  });
},
//通过分类ID查询帖子
getPostByCategory(req,res,next){
  var cid = req.body.cid;
  var start = req.body.start;
  var limit = req.body.limit;
  var sql= `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' AND wp_post.category = ? ORDER BY publishTime DESC LIMIT ?,? `;
  pool.query(sql,[cid,start,limit],function(err,result){
      res.send(result);
  });
},
//通过文章ID获取评论
getCommentsByPid (req,res,next){
  var pid = req.body.pid;
  var type = req.body.type;
  var start = req.body.start?req.body.start:0;
  var sql = 'SELECT *,wp_comment.id as cid FROM wp_comment LEFT JOIN wp_user ON wp_comment.uid = wp_user.id WHERE pid = ? AND wp_comment.type = ?  ORDER BY publishTime DESC LIMIT ?,10';
  pool.query(sql,[pid,type,start],function(err,result){  
    res.send(result);
  });
},
//获取文章作者信息
getPostAuthor(req,res,next){
  var obj = req.body;
  var authorId = obj.ahthorID;
  var sql = 'SELECT * FROM wp_user WHERE id = ?';
  pool.query(sql,[authorId],function(err,result){
      res.send(result);
  });
},
//按照作者ID查询文章
getPostByAuthor(req,res,next){
  var uid = req.body.uid;
  var start = req.body.start;
  var count = req.body.count;
  var sql = 'SELECT *,wp_post.id as pid,wp_post.title as title ,wp_post_category.title as category_title FROM wp_post LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE author = ? ORDER BY publishTime DESC LIMIT ?,?';
  pool.query(sql,[uid,start,count],function(err,result){
    res.send(result);
  });
},
//提交评论
updateComment(req,res,next){
  var obj = req.body;
  var uid = obj.uid;
  var pid = obj.pid;
  var content = obj.content;
  var type = obj.type ;
  var time = new Date();
  var sql = "INSERT INTO wp_comment VALUES(NULL,?,?,?,0,?,?)";
  pool.query(sql,[pid,uid,type,time,content],function(result){
    res.send({status:1,msg:'评论成功'});
  });
},
//admin界面保存user信息
updateUserMeta(req,res,next){
  var obj = req.body ;
  var uid = obj.uid ;
  var meta = obj.meta ;
  var value = obj.value ;
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
//获取admin评论管理页面
getCommentAll(req,res,next){
  var start = req.body.start;
  var sql = 'SELECT wp_comment.id as id,wp_comment.content as content,wp_comment.publishTime as publishTime,nick_name,pid,title FROM wp_comment LEFT JOIN wp_post ON wp_comment.pid = wp_post.id LEFT JOIN wp_user ON wp_post.author = wp_user.id LIMIT ?,10';
  pool.query(sql,[start],function(err,result){    
    res.send(result);
  });
},
//admin页面保存评论内容
updateCommentMeta(req,res,next){
  var content = req.body.val;
  var id = req.body.id;
  var meta = req.body.meta;
  var sql = 'UPDATE wp_comment SET '+ meta +' = ? WHERE id = ?';
  pool.query(sql,[content,id],function(err,result){
     res.send({status:1});
  });
},
//admin页面删除评论
deleteComment(req,res,next){
  var id = req.body.id;
  var sql = "DELETE FROM wp_comment WHERE id = ?";
  pool.query(sql,[id],function(err,result){
    res.send({status:1});
  });
},
//搜索评论
searchComment(req,res,next){
  var meta = req.body.meta;
  var value = req.body.value;
  //判断meta配适成数据库的字段名
  // meta = meta == 'id' ? 'wp_comment.id':meta;
  meta = meta == 'author' ? 'uid':meta;
  meta = meta == 'response_to_post' ? 'pid':meta;
  var sql = 'SELECT wp_comment.id as id,wp_comment.content as content,wp_comment.publishTime as publishTime,nick_name,pid,title FROM wp_comment LEFT JOIN wp_post ON wp_comment.pid = wp_post.id LEFT JOIN wp_user ON wp_post.author = wp_user.id WHERE wp_comment.'+ meta + '= ?';
  pool.query(sql,[value],function(err,result){
    res.send(result);
  });
},
//获取admin帖子页面
getPostOrderById(req,res,next){
  var start = req.body.start;
  var sql = 'SELECT status,content,comment_status,nick_name,summary,wp_post.id as pid,wp_post.title as title,wp_post.password as password,wp_post_category.id as cid,wp_post_category.title as category_title FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id LIMIT ?,10';
  pool.query(sql,[start],function(err,result){ 
    res.send(result);
  });
},
// //admin帖子页面获取全部分类
// getCategoryAll(req,res,next){
//   var sql = 'SELECT * FROM wp_post_category';
//   pool.query(sql,function(err,result){
//     res.send(result);
//   });
// },
//搜索帖子
searchPost(req,res,next){
  var meta = req.body.meta;
  var val = req.body.val;
  var sql = 'SELECT * FROM `wp_post` WHERE '+ meta +' = ?';
  pool.query(sql,[val],function(err,result){
    res.send(result);
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
//获取user用户组
getUserGroup(req,res,next){
  var uid = req.body.uid?req.body.uid:req.session.uid;
  var sql= "SELECT wp_group_meta.id as id,title,group_id FROM wp_user LEFT JOIN wp_group_meta ON wp_user.group_id = wp_group_meta.id WHERE wp_user.id = ?";
  pool.query(sql,[uid],function(err,result){
    res.send(result);
  });
},
//提交,编辑文章
updatePost(req,res,next){
  let uid = req.body.uid?req.body.uid:req.session.uid;
  let pid = req.body.pid
  let title = req.body.title;
  let content = req.body.content;
  let summary =  req.body.summary;
  let status = req.body.status;
  let category = req.body.category;
  let comment_status = req.body.comment_status;
  let date = req.body.date;
  let thumb = '';
  let password = '';
  if(pid > 0 ){
    let update = "UPDATE wp_post SET category = ?,thumb = ?,title=?,content=?,summary=?,status=?,password=?,comment_status=? WHERE id = ?";
    pool.query(update,[category,thumb,title,content,summary,status,password,comment_status,pid],(err,result)=>{
      res.send(result);
    });
  }else {
    let insert = "INSERT INTO `wp_post` (`id`, `author`, `category`, `type`, `thumb`, `publishTime`, `title`, `content`, `summary`, `status`, `password`, `comment_status`, `comment_count`) VALUES (NULL, ?,?, 'post', ?, ?, ?, ?, ?, ?, ?, ?, '0')";
    pool.query(insert,[uid,category,thumb,date,title,content,summary,status,password,comment_status],function(err,result){
      res.send(result);
    });
  }
  
},
//按照评论数排序获取帖子
getPostOrderByComment(req,res,next){
  var start = req.body.start;
  var limit = req.body.limit;
  var sort =  req.body.sort;
  var sql = `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' ORDER BY wp_post.comment_count ${sort} LIMIT ?,?;`;
  pool.query(sql,[start,limit],function(err,result){
      res.send(result);
  });
},

};
