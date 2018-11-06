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
  let uid = req.session.uid;
  let sql = 'SELECT nick_name from wp_user WHERE uid = ?';
  pool.query(sql,[uid],(err,result)=>{
    req.session.uid = undefined;
    res.send({state:203,nick_name:result[0].nick_name});
  }); 
},
//新版登录
Login(req,res,next){
  let obj = req.body.params;
  let account = obj.account;
  let password = obj.password;
  let email_reg = /@/ig;
  let state = false ;
  let sql = 'SELECT uid,nick_name FROM `wp_user` WHERE email = ? AND password = ?';
  if(typeof account == "undefined" || account == null || account == ""){
      res.send({state:402});
  }else if(!email_reg.test(account)){
    res.send({state:403});
  }else if(typeof password == "undefined" || password == null || password == ""){
    res.send({state:404});
  }else if(password.length < 6){
    res.send({state:405});
  }else {
      async function login(){
          await new Promise((resolve)=>{
              pool.query(sql,[account,password],(err,result)=>{
                if(result != ''){
                  req.session.uid = result[0].uid;
                  res.send({state:202,nick_name:result[0].nick_name});//登陆成功
                }else{
                  state = true;
                }
                resolve();
              })
          });
          await new Promise((resolve)=>{
              if(state == true){
                  let sql = 'SELECT uid FROM wp_user WHERE email = ? ';
                  pool.query(sql,[account],(err,result)=>{
                      if(result != ''){
                          res.send({state:406});
                      }else{
                          req.session.re_account = account;
                          req.session.re_password = password;
                          res.send({state:401});//登录失败,询问注册
                      }
                  });
              }
              resolve();
          });   
      }login();
      // pool.query(sql,[account,password],(err,result)=>{
      //     if(result != ''){
      //       req.session.uid = result[0].uid;
      //       res.send({state:202});//登陆成功
      //     }else{
      //       req.session.re_account = account;
      //       req.session.re_password = password;
      //       res.send({state:401});//登录失败,询问注册
      //     }      
      //     console.log(result);
      //   });
  }
},
//新版注册&&添加用户
Register(req,res,next){
  let  obj = req.body.params;
  let type = obj.type;
  if(type == 'cancel') {
      req.session.re_account = undefined;
      req.session.re_password = undefined;
  }else if(type == 'confirm') {
      let  nick_name ='';
      let nick_name_suffix = new Date().getTime();  
      let account = req.session.re_account;
      let password = req.session.re_password;  
      for(var i=0;i<6;i++){
        var ranNum = Math.ceil(Math.random() * 25);
        if(i==0){
          nick_name += String.fromCharCode(65+ranNum);
        }else {
          nick_name += String.fromCharCode(97+ranNum);
        }
      }
      nick_name += '_' + String(nick_name_suffix).substring(0,6);   
      let sql = "INSERT INTO `wp_user` ( `email`, `password`, `real_name`, `nick_name`, `sign`, `qq`, `wechat`, `weibo`, `github`, `facebook`, `alipay`, `city`, `recieve_address`) VALUES (?,?,'',?,'','','','','','','','','')";
      pool.query(sql,[account],(err,result)=>{
          // if(result == '' || result == null || result == undefined){
              pool.query(sql,[account,password,nick_name],(err,result)=>{
                req.session.uid = result.insertId;
                res.send({state:204});
              });
      });
  }

  // let  account = obj.account;
  // let  password = obj.password;
  // let  r_password = obj.r_password;
  // let sql = `SELECT uid FROM wp_user WHERE email = ? `;
  // if(account == '' || account == null || account == undefined){
  //     res.send({state:2,msg:'请输入账号。'});
  // }else if(nick_name == '' || nick_name == null || nick_name == undefined){
  //     res.send({state:2,msg:'请输入昵称。'});
  // }else if((password == '' || password == null || password == undefined)){
  //     res.send({state:2,msg:'请输入密码。'});
  // }else if((r_password == '' || r_password == null || r_password == undefined)){
  //   res.send({state:2,msg:'请重复密码。'});
  // }else if((r_password != password )){
  //   res.send({state:2,msg:'两次输入的密码不一致。'});
  // }else {              

  // }
},
//获取用户信息
get_user(req,res,next){
    let obj = req.body.params;
    let uid = obj.uid > 0 ? obj.uid :(obj.uid == 0 ? req.session.uid : 0);
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
    res.send({state:200});
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
    res.send({state:200,bid:bid});
  });
},
//获取用户消息
get_message(req,res,next){
  let obj = req.body.params;
  let type = obj.type ? obj.type : 0;
  let uid = obj.uid > 0 ? obj.uid : (obj.uid == 0 ? req.session.uid : undefined);
  let id = obj.id ;
  let fuid = obj.fuid;
  let limit = obj.limit;
  let start = obj.start;
  let sort = obj.sort ;
  let sortBy = obj.sortBy;
  let key = new Array();
  let key_count = 0;
  let key_pre = [
    {id:'uid',value:` AND n.uid = ? `},
    {id:'id',value:` AND n.id = ? `},
    {id:'fuid',value:` AND n.fuid = ? `},
  ];
  if(sort != undefined && sort != '' && sort != null && sortBy != undefined && sortBy != '' && sortBy != null){ sort = ` ORDER BY ${sort} ${sortBy} `;}else {sort = '';};
  if(start >= 0 && limit > 0 ){ limit = ` LIMIT ${start},${limit} `}else {limit = ''};
  let sql = `SELECT *,n.id as nid FROM newprompt as n`;
  sql += type > 0 ?  ` LEFT JOIN wp_user as u ON  n.fuid = u.uid WHERE  type = ${type} ` : ` WHERE type = ${type}`
  for(var i = 0;i<key_pre.length;i++){
    if(eval(key_pre[i].id)){
      sql += key_pre[i].value;
      key.push(eval(key_pre[i].id));
    }   
  }
  sql += sort + limit ;
  pool.query(sql,key,(err,result)=>{
    res.send(result);
  });

}
//
};