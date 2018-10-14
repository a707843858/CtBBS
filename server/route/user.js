"use strict";
const pool = require('./db');
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
//注销
logout(req,res,next){
  req.session.uid = undefined;
  res.send({state:1});
},
//登录
Login(req,res,next){
  var object = req.body;
  var account = object.account;
  var password = object.password;
  var sql = 'SELECT uid FROM `wp_user` WHERE email = ? AND password = ?';
  pool.query(sql,[account,password],function(err,result){
        if(result != undefined){
          req.session.uid = result[0].uid;
          res.send({state:1});
        }else{
          res.send({state:2,msg:'账号或者密码错误'});
        }      
  });
},
//注册&&添加用户
Register(req,res,next){
  let  obj = req.body.params;
  let  nick_name = obj.nick_name;
  let  account = obj.account;
  let  password = obj.password;
  let  r_password = obj.r_password;
  let sql = `SELECT uid FROM wp_user WHERE email = ? `;
  if(account == '' || account == null || account == undefined){
      res.send({state:2,msg:'请输入账号。'});
  }else if(nick_name == '' || nick_name == null || nick_name == undefined){
      res.send({state:2,msg:'请输入昵称。'});
  }else if((password == '' || password == null || password == undefined)){
      res.send({state:2,msg:'请输入密码。'});
  }else if((r_password == '' || r_password == null || r_password == undefined)){
    res.send({state:2,msg:'请重复密码。'});
  }else if((r_password != password )){
    res.send({state:2,msg:'两次输入的密码不一致。'});
  }else {
      pool.query(sql,[account],(err,result)=>{
          if(result == '' || result == null || result == undefined){
              sql = "INSERT INTO `wp_user` ( `email`, `password`, `real_name`, `nick_name`, `sign`, `qq`, `wechat`, `weibo`, `github`, `facebook`, `alipay`, `city`, `recieve_address`) VALUES (?,?,'',?,'','','','','','','','','')";
              pool.query(sql,[account,password,nick_name],(err,result)=>{
                req.session.uid = result.insertId;
                res.send({state:1,msg:'注册成功。'});
              });
          }else {
              res.send({state:2,msg:'该用户已注册。'});
          }
      });
  }
},
//获取用户信息
get_user(req,res,next){
    let obj = req.body.params;
    let uid = obj.uid > 0 ? obj.uid :(obj.uid == 0 ? req.session.uid : undefined);
    let meta = obj.meta ? obj.meta : ` * `;
    let email = obj.email;
    let real_name = obj.real_name;
    let nick_name = obj.nick_name;
    let group_id = obj.group_id;
    let age = obj.age;
    let sex = obj.sex;
    let start = obj.start;
    let limit = obj.limit;
    let sort = obj.sort;
    let sortBy = obj.sortBy;
    if(start >= 0 && limit > 0){ limit = ` LIMIT ${start},${limit} `}else {limit = '';};
    if(sort != '' && sort != null && sort != undefined && sortBy != '' && sortBy != null && sortBy != undefined){ sort = ` ORDER BY ${sort} ${sortBy} `}else{sort = '';}; 
    let sql = ` SELECT ${meta} FROM wp_user as u LEFT JOIN wp_group as g ON u.group_id = g.id `;
    let key = new Array();
    let key_count = 0;
    let key_pre = [
      {id:'uid',value:` u.uid = ? `},
      {id:'email',value:` u.email = ? `},
      {id:'real_name',value:` u.real_name link %? `},
      {id:'nick_name',value:` u.nick_name like %? `},
      {id:'group_id',value:` u.group_id = ? `},
      {id:'age',value:` u.age = ? `},
      {id:'sex',value:` u.sex = ? `},
    ];
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
    pool.query(sql,key,(err,result)=>{
      res.send(result);
    });
},
//提交用户信息
update_user(req,res,next){
  let obj = req.body.params;
  let uid = obj.uid > 0 ? obj.uid :(obj.uid == 0 ? req.session.uid : undefined);
  let meta = obj.meta ;
  let value = obj.value ;
  let sql = ` UPDATE wp_user SET ${meta} = ? WHERE uid = ? `;
  pool.query(sql,[value,uid],(err,result)=>{
    res.send({state:1});
  });
},
//获取背景
get_background(req,res,next){
  let obj = req.body.params;
  let uid = obj.uid > 0 ? obj.uid : (obj.uid == 0 ? req.session.uid : undefined );
  let start = obj.start ;
  let limit = obj.limit;
  let sort = obj.sort ;
  let sortBy = obj.sortBy;
  let type = obj.type ? obj.type : 'zone';
  let key = new Array();
  let sql = '';
  if(sort != undefined && sort != '' && sort != null && sortBy != undefined && sortBy != '' && sortBy != null){ sort = ` ORDER BY ${sort} ${sortBy} `;}else {sort = '';};
  if(start >= 0 && limit > 0 ){ limit = ` LIMIT ${start},${limit} `}else {limit = ''};
  if(uid > 0){
    sql = ` SELECT b.id as bid,title,type,url,extend,u.${type}  FROM wp_user as u LEFT JOIN background_meta as b ON u.${type} = b.id WHERE u.uid = ? `;
    key.push(uid);
  }else {
    sql = ` SELECT * FROM background_meta WHERE type = ?`;
    key.push(type);
  }
  sql += sort + limit ;
  pool.query(sql,key,(err,result)=>{
    res.send(result);
  });
},
//提交背景
update_background(req,res,next){
  let obj = req.body.params;
  let type = obj.type ? obj.type : 'zone' ;
  let uid = obj.uid > 0 ? obj.uid : ( obj.uid == 0 ? req.session.uid : undefined ); 
  let bid = obj.bid ;
  let key = new Array();
  let sql = ` UPDATE wp_user SET ${type} = ? WHERE uid = ? `;
  
  key.push(bid,uid);
  pool.query(sql,key,(err,result)=>{
    res.send({bid:bid});
  });
},

//
};