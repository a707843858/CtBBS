"use strict";
const pool = require('./db');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');


module.exports = {
//------------GET-----------
//获取全部分类
getCategoryAll(req,res,next){
  var sql = 'SELECT * FROM wp_post_category';
  pool.query(sql,function(err,result){
    res.send(result);
  });
}, 



//-----------POST-----------
//获取最新帖子
getLatestPost(req,res,next){
  var limit = req.body.limit;
  var start = req.body.start;
  var uid = req.body.uid?req.body.uid:req.session.uid;
  if(uid>0){
    var sql= `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' AND wp_post.author = ? ORDER BY publishTime DESC LIMIT ?,? `;
    pool.query(sql,[uid,start,limit],function(err,result){     
      res.send(result);
    }); 
  }else{
    var sql= `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' ORDER BY publishTime DESC LIMIT ?,? `;
    pool.query(sql,[start,limit],function(err,result){ 
      res.send(result);
    }); 
  }
},
//根据ID排序文章
getPostOrderById(req,res,next){
  var start = req.body.start;
  var sql = 'SELECT status,content,comment_status,nick_name,summary,wp_post.id as pid,wp_post.title as title,wp_post.password as password,wp_post_category.id as cid,wp_post_category.title as category_title FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id LIMIT ?,10';
  pool.query(sql,[start],function(err,result){ 
    res.send(result);
  });
},
//根据评论数排序获取帖子
getPostOrderByComment(req,res,next){
  var start = req.body.start;
  var limit = req.body.limit;
  var sort =  req.body.sort;
  var uid = req.body.uid;
  if(uid >0){
    var sql = `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' AND wp_post.author = ? ORDER BY wp_post.comment_count ${sort} LIMIT ?,?;`;
    pool.query(sql,[uid,start,limit],function(err,result){
        res.send(result);
    });
  }else {
    var sql = `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' ORDER BY wp_post.comment_count ${sort} LIMIT ?,?;`;
    pool.query(sql,[start,limit],function(err,result){
        res.send(result);
    });
  }

},
//通过ID获取帖子
getPostById(req,res,next){
  var pid = req.body.pid;
  var sql= `SELECT *,wp_post.id as pid,wp_post.title as title,wp_post_category.id as cid,wp_post_category.title as category_title,wp_user.id as uid FROM wp_post LEFT JOIN wp_user ON wp_post.author = wp_user.id LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE wp_post.type = 'post' AND wp_post.id = ? `;
  pool.query(sql,[pid],function(err,result){    
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
//通过作者ID查询文章
getPostByAuthor(req,res,next){
  var uid = req.body.uid;
  var start = req.body.start;
  var count = req.body.count;
  var sql = 'SELECT *,wp_post.id as pid,wp_post.title as title ,wp_post_category.title as category_title FROM wp_post LEFT JOIN wp_post_category ON wp_post.category = wp_post_category.id WHERE author = ? ORDER BY publishTime DESC LIMIT ?,?';
  pool.query(sql,[uid,start,count],function(err,result){
    res.send(result);
  });
},
//搜索帖子
searchPost(req,res,next){
  var meta = req.body.meta;
  var val = req.body.val;
  var sql = 'SELECT * FROM `wp_post` WHERE '+ meta +' = ?';
  pool.query(sql,[val],function(err,result){
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
  let model = req.body.model;
  let thumb = req.body.thumb;
  let password = '';
  if(pid > 0 ){
    let update = "UPDATE wp_post SET category = ?,model = ?,thumb = ?,title=?,content=?,summary=?,status=?,password=?,comment_status=? WHERE id = ?";
    pool.query(update,[category,model,thumb,title,content,summary,status,password,comment_status,pid],(err,result)=>{
      res.send(result);
    });
  }else {
    let insert = "INSERT INTO `wp_post` (`id`, `author`, `category`, `type`,`model`, `thumb`, `publishTime`, `title`, `content`, `summary`, `status`, `password`, `comment_status`, `comment_count`) VALUES (NULL, ?,?, 'post',?, ?, ?, ?, ?, ?, ?, ?, ?, '0')";
    pool.query(insert,[uid,category,model,thumb,date,title,content,summary,status,password,comment_status],function(err,result){
      res.send(result);
    });
  } 
},
//获取全部评论
getCommentAll(req,res,next){
  var start = req.body.start;
  var sql = 'SELECT wp_comment.id as id,wp_comment.content as content,wp_comment.publishTime as publishTime,nick_name,pid,title FROM wp_comment LEFT JOIN wp_post ON wp_comment.pid = wp_post.id LEFT JOIN wp_user ON wp_post.author = wp_user.id LIMIT ?,10';
  pool.query(sql,[start],function(err,result){    
    res.send(result);
  });
},
//通过文章ID获取评论
getCommentByPid (req,res,next){
  var pid = req.body.pid;
  var type = req.body.type;
  var start = req.body.start;
  var limit = req.body.limit;
  var sql = `SELECT * FROM wp_comment LEFT JOIN wp_user ON wp_comment.uid = wp_user.id WHERE type = ? AND pid = ? ORDER BY timeLine DESC LIMIT ?,?`;
  pool.query(sql,[type,pid,start,limit],function(err,result){  
    res.send(result);
  });
},
//获取空间评论
getZoneComment(req,res,next){
  var puid = req.body.puid;
  var start = req.start?req.start:0;
  var limit = req.limit?req.limit:10;
  var sql = `SELECT * FROM wp_comment LEFT JOIN wp_user ON wp_comment.uid = wp_user.id WHERE type = 'zone' AND puid = ? ORDER BY timeLine DESC LIMIT ?,?`;
  pool.query(sql,[puid,start,limit],function(err,result){
    res.send(result);
  });
},
//提交评论
insertComment(req,res,next){
  var uid = req.body.uid;
  var pid = req.body.pid?req.body.pid:0;
  var puid = req.body.puid?req.body.puid:0;
  var content = req.body.content;
  var type = req.body.type ;
  var date = req.body.date;
  console.log(uid,pid,puid,content,type,date);
  var sql = "INSERT INTO `wp_comment` (`pid`,`uid`, `puid`, `type`,`timeLine`,`content`) VALUES (?,?,?,?,?,?)";
  pool.query(sql,[pid,uid,puid,type,date,content],function(err,result){
    res.send({status:1,msg:'评论成功'});
  });
},
//修改评论
updateComment(req,res,next){
  var content = req.body.val;
  var id = req.body.id;
  var meta = req.body.meta;
  var sql = 'UPDATE wp_comment SET '+ meta +' = ? WHERE id = ?';
  pool.query(sql,[content,id],function(err,result){
     res.send({status:1});
  });
},
//删除评论
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
//获取category Meta
getCategoryMeta(req,res,next){
  let id = req.body.id;
  let meta = req.body.meta;
  let sql = 'SELECT '+ meta +' FROM wp_post_category WHERE id = ?';
  pool.query(sql,[id],function(err,result){
    res.send(result);
  });
},






//
};