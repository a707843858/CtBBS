"use strict";
const pool = require('./db');
const formidable = require('formidable');
const fs = require('fs');
const uuid = require('uuid');
const marked = require('marked');
const path = require('path');


module.exports = {
//获取文章
get_post(req,res,next){
  var limit = req.body.params.limit;
  var start = req.body.params.start;
  var sort = req.body.params.sort;
  var model = req.body.params.model;
  var title = req.body.params.title;
  var status = req.body.params.status;
  var category = req.body.params.category;
  var sortBy = req.body.params.sortBy;
  var uid = req.body.params.uid > 0 ?req.body.params.uid:(req.body.params.uid == 0 ? req.session.uid : undefined);
  var pid = req.body.params.pid;
  var cid = req.body.params.cid;
  //预设查询条件
  var key_pre = [ 
    {id:'pid',value:` p.id = ? `},
    {id:'model',value:` p.model = ? `},
    {id:'title',value:` p.title = ? `},
    {id:'status',value:` p.status = ? `},
    {id:'uid',value:` u.uid = ? `},
    {id:'cid',value:` c.id = ? `},
    {id:'category',value: ` p.category = ? `},
  ];
  var key = new Array();
  var key_count = 0;
  var sql = ' SELECT *,p.id as pid,p.title as title,p.password as post_password,c.id as cid,c.title as category_title,u.password as password FROM wp_post as p LEFT JOIN wp_user as u ON p.author = u.uid LEFT JOIN wp_post_category as c ON p.category = c.id ';
  if (start >= 0 & limit > 0){ limit = ` LIMIT ${start},${limit}` ;}else{ limit = '';};
  if (sort != '' & sort != undefined & sortBy != '' & sortBy != undefined) {sort = ` ORDER BY ${sortBy} ${sort} `}else { sort = ''};
  //判断是否添加 WHERE 或者 AND
  function condition(){
    if(key_count == 0){
        sql += ` WHERE `;
    }else {
        sql += ` AND `;
    }
    key_count++;
  }
  //判断条件
  for(var i = 0;i < key_pre.length;i++){
      if(eval(key_pre[i].id)){
        condition();
        sql += key_pre[i].value;
        key.push(eval(key_pre[i].id));
      }
      
  }
  //排序,数量
  sql += sort + limit ;
  // console.log(sql,key);
  //查询
  pool.query(sql,key,function(err,result){
    res.send(result);
  })
},
//提交文章
update_post(req,res,next){
    var obj =req.body.params;
    let uid = obj.uid ? obj.uid : req.session.uid ;
    // let uid = 1;
    let pid = obj.pid;
    let title = obj.title;
    let content = obj.content; 
    let comment_status = obj.comment_status;
    let status = obj.status;
    let category = obj.category;
    let model = obj.model;
    let thumb = obj.thumb ? obj.thumb : '';
    let summary = obj.summary;
    let password = obj.password ? obj.password : '';
    let date = Math.round(new Date() / 1000);
    let sql = '';
    let key = new Array();
    if(pid > 0){
        sql = "UPDATE wp_post SET category = ?,model = ?,thumb = ?,title=?,content=?,summary=?,status=?,password=?,comment_status=? WHERE id = ?";
        key.push(category,model,thumb,title,content,summary,status,password,comment_status,pid);
    }else {
        sql="INSERT INTO `wp_post` (`id`, `author`, `category`, `type`,`model`, `thumb`, `publishTime`, `title`, `content`, `summary`, `status`, `password`, `comment_status`, `comment_count`,`views`) VALUES (NULL, ?,?, 'post',?, ?, ?, ?, ?, ?, ?, ?, ?, 0,0)"
        key.push(uid,category,model,thumb,date,title,content,summary,status,password,comment_status);
    }
    pool.query(sql,key,(err,result)=>{
        pid = pid ? pid : result.insertId ;
        res.send({state:205,pid:pid});
    });
},
//获取分类信息
get_category(req,res,next){
  var sql = ` SELECT  id,title,icon FROM wp_post_category `;
  var key = new Array();
  var key_count = 0;
  var key_pre = [
      {id:'id',value:` id = ? `},
      {id:'title',value:` title = ? `},
  ];

  if(req.body.params != undefined &  req.body.params != '' ){
      var start = req.body.params.start;
      var limit = req.body.params.limit;
      var id = req.body.params.id;
      var title = req.body.params.title;
      var sort = req.body.params.sort;
      var sortBy = req.body.params.sortBy; 
      if (start >= 0 & limit > 0){ limit = ` LIMIT ${start},${limit}` ;}else{ limit = '';};
      if (sort != '' & sort != undefined & sortBy != '' & sortBy != undefined) {sort = ` ORDER BY ${sortBy} ${sort} `}else { sort = ''};
      //判断是否添加 WHERE 或者 AND
      function condition(){
        if(key_count == 0){
            sql += ` WHERE `;
        }else {
            sql += ` AND `;
        }
        key_count++;
      }
      for(var i = 0;i<key_pre.length;i++){
        if(eval(key_pre[i].id)){
          condition();
          sql += key_pre[i].value;
          key.push(eval(key_pre[i].id));
        }   
      }
      sql += sort + limit ;
  } 

  pool.query(sql,key,function(err,result){
    res.send(result);
  })
},
//获取评论
get_comment(req,res,next){
  var sql = ` SELECT  *,c.id as cid FROM wp_comment as c LEFT JOIN wp_user as u ON c.uid = u.uid `;
  var key = new Array();
  var key_count = 0;
  var key_pre = [
      {id:'id',value:` id = ? `},
      {id:'pid',value:` pid = ? `},
      {id:'uid',value:` uid = ? `},
      {id:'puid',value:` puid = ? `},
      {id:'type',value:` type = ? `},
      {id:'pubdate',value:` pubdate = ? `},
  ];
  if(req.body.params != undefined & req.body.params != ''){
      var id = req.body.params.id;
      var pid = req.body.params.pid;
      var uid = req.body.params.uid;
      var puid = req.body.params.puid;
      var type = req.body.params.type;
      var pubdate = req.body.params.pubdate;
      var start = req.body.params.start;
      var limit = req.body.params.limit;
      var sort = req.body.params.sort;
      var sortBy = req.body.params.sortBy;
      if (start >= 0 & limit > 0){ limit = ` LIMIT ${start},${limit}` ;}else{ limit = '';};
      if (sort != '' & sort != undefined & sortBy != '' & sortBy != undefined) {sort = ` ORDER BY ${sortBy} ${sort} `}else { sort = ''};
      var key = new Array();
      var key_count = 0;
      var key_pre = [
          {id:'id',value:` id = ? `},
          {id:'pid',value:` pid = ? `},
          {id:'uid',value:` uid = ? `},
          {id:'puid',value:` puid = ? `},
          {id:'type',value:` type = ? `},
          {id:'pubdate',value:` pubdate = ? `},
      ];
      //判断是否添加 WHERE 或者 AND
      for(var i = 0;i<key_pre.length;i++){
        if(eval(key_pre[i].id)){
            if(key_count == 0){
                sql += ` WHERE `;
            }else {
                sql += ` AND `;
            }
            key_count++;
          sql += key_pre[i].value;
          key.push(eval(key_pre[i].id));
        }   
      }
      sql += sort + limit ;
  }
  pool.query(sql,key,function(err,result){
    res.send(result);
  })
},
//提交评论
update_comment(req,res,next){
    var sql;
    let id = req.body.params.id; 
    let comment = req.body.params.comment;
    let key = new Array();
    if(id > 0){   
        var meta = req.body.params.meta;
        var value = req.body.params.value;
        sql=` UPDATE wp_comment SET comment = ? WHERE id = ? ` ;
    }else {
        var uid = req.body.params.uid ? req.body.params.uid : req.session.uid ;
        var pid = req.body.params.pid ? req.body.params.pid:0;
        var puid = req.body.params.puid?req.body.params.puid:0;
        var content = req.body.params.comment;
        var type = req.body.params.type ;
        var pubdate = Math.round(new Date() / 1000);
        key.push(pid,uid,puid,type,pubdate,content);
        sql = "INSERT INTO `wp_comment` (`id`, `pid`, `uid`, `puid`, `type`, `parent`, `pubdate`, `content`) VALUES(NULL,?,?,?,?,0,?,?)"; 
        if(pid > 0 ){
           sql += " ;UPDATE wp_post SET comment_count = comment_count + 1 WHERE id = " + pid ;
        }
    }     
    console.log(sql);   
    pool.query(sql,key,(err,result)=>{
        console.log(result);
        res.send({state:206});
    });
},
//获取收藏
get_collect(req,res,next){
    let obj = req.body.params;
    let uid = obj.uid > 0 ? obj.uid : (obj.uid == 0 ? req.session.uid : undefined);
    let type = obj.type ? obj.type : 'post';
    let start = req.body.params.start;
    let limit = req.body.params.limit;
    let sort = req.body.params.sort;
    let sortBy = req.body.params.sortBy;
    let sql = '';
    let key = new Array();
    let key_count =  0;
    let key_pre = [
        {id:'uid',value:` c.uid = ? `},
        {id:'type',value:` c.type = ? `},
    ];
    if (start >= 0 & limit > 0){ limit = ` LIMIT ${start},${limit}` ;}else{ limit = '';};
    if (sort != '' & sort != undefined & sortBy != '' & sortBy != undefined) {sort = ` ORDER BY ${sortBy} ${sort} `}else { sort = ''};
    if(type == 'post'){
        sql = `SELECT *,p.id as pid FROM collect as c LEFT JOIN wp_post as p ON c.cid = p.id ` ;
    }else {
        sql =  ` SELECT *,t.id as fid FROM collect as c LEFT JOIN wp_post_category as t ON c.cid = t.id `;
    }
    for(var i = 0;i<key_pre.length;i++){
        if(eval(key_pre[i].id)){
            if(key_count == 0){
                sql += ` WHERE `;
            }else {
                sql += ` AND `;
            }
            key_count++;
          sql += key_pre[i].value;
          key.push(eval(key_pre[i].id));
        }   
      }
    sql += sort + limit ;
    pool.query(sql,key,function(err,result){
        res.send(result);
    })
},
//提交收藏
update_collect(req,res,next){
    let obj = req.body.params;
    let order = obj.order;
    let id =  obj.id;
    let uid = obj.uid > 0 ? obj.uid :(obj.uid == 0 ? req.session.uid : 0);
    let type = obj.type;
    let isNull = false;
    let pubdate = Math.round(new Date() / 1000);
    async function collect(){
        await new Promise((resolve,reject)=>{
            let sql = `SELECT * FROM collect WHERE uid = ? AND type = ? AND cid = ? `;
            pool.query(sql,[uid,type,id],(err,result)=>{
                isNull = (typeof result == "undefined" || result == null || result == "") ? true : false;
                resolve();
            });
        });
        await new Promise((resolve,reject)=>{         
            if(isNull){
                let sql = `INSERT INTO collect VALUES(NULL,?,?,?,?) `;
                pool.query(sql,[uid,type,id,pubdate],(err,result)=>{
                    res.send({state:207});
                }); 
            }else {
                let sql = `DELETE FROM collect WHERE uid = ? AND type = ? AND cid = ?`;
                pool.query(sql,[uid,type,id],(err,result)=>{
                    res.send({state:407});
                }); 
            }
            resolve();
        });
    }
    collect();
},





//
};