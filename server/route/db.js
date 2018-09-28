const mysql = require('mysql');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'bbs',
    port:'3306',
    multipleStatements: true,   // 多语句查询
    connectionLimit:10,
  });
  
pool.getConnection(function(err){
     if(err){
       console.error('数据库连接: '+err.stack);
     };
});


// try {
//     var {transporter, mailOptions, sendMsg} = require('./emailInfo'); // npm包: nodemailer
//   } catch(e) {
//     console.log('缺少文件 emailInfo.js，不能发送邮件');
//   }

// app.use(function (req, res, next) {
//   var url = req.originalUrl;
//   if (url != "/login" && !req.session.user) {
//       return res.redirect("/login");
//   }
//   next();
// });

module.exports = pool;