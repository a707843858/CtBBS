const routerApi = require('./route/router');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const multer = require('multer');
// const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  name:'sid',
  secret: 'mybbs',
  cookie: {maxAge: 60000},
  cookie:{httpOnly: true},
  resave: false,
  saveUninitialized: true,
}));



// 部署上线时读取静态文件
app.use(express.static(path.join(__dirname, '../dist')));

// 后端api路由
app.use('/api', routerApi);


// 监听端口
app.listen(3000);
// console.log('success listen at port:3000......');


// var multer  = require('multer');
// var upload = multer({dest:"/dist"});
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   res.send('1');
//   // req.file 是 `avatar` 文件的信息
//   // req.body 将具有文本域数据，如果存在的话
// })


var update_avatar = multer({dest:path.join(__dirname, '../dist/')});

app.post("/api/public/update_avatar",update_avatar.single('mypic'),(req,res)=>{
    var f = req.file;
    console.log(f);
    var newFileName = path.join(__dirname, '../dist/')+new Date().getTime();
    newFileName += Math.floor(Math.random()*9999);
    var suffix = f.originalname.split('.');
    newFileName += '.'+ suffix[suffix.length -1 ];
    console.log(newFileName);
    fs.rename(f.path,newFileName);
    res.send({code:1,msg:'upload success!'});
});