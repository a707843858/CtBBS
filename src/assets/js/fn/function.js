const axios = require('axios');
const Vue = require ('vue');

//定义全局函数
exports.install = function (Vue, options) {

//-------------其他-----------------
//Get Session
Vue.prototype.get_session = function(){
    return axios.get('/public/get_session');
}
//开发中提示
Vue.prototype.develope = function(){
    this.$message({
        type:'warning',
        message:'开发中.....',
    });
}
//获取Logo & Type
Vue.prototype.get_logo = function(){
    return axios.get('/public/get_logo');
}
//保存失败的时候显示
Vue.prototype.showFail = function(status){
        if(status != 1){
            this.$message({
                type : 'warning',
                message : '操作失败,请稍候再试。',
            });
        }
};
//登录页,跳转注册框
Vue.prototype.loginAnimation = function(tab){
    let login =  document.getElementById('login_box');
    let register = document.getElementById('register_box');
    let forget = document.getElementById('forget_box');
    if(tab == 'toRegister'){
        login.classList.add('rotateToHide');
        register.classList.add('rotateToShow');
    }else if(tab == 'toForget'){
        login.classList.add('rotateToHide');
        forget.classList.add('rotateToShow');
    }else if(tab == 'hide'){
        login.classList.remove('rotateToHide');
        register.classList.remove('rotateToShow');
        forget.classList.remove('rotateToShow');
    }
}
//输入框下划线动画
Vue.prototype.addInputAnimation = (id) => {
    var el = document.getElementById(id);
    el.classList.add('input-is-focused');      
}
Vue.prototype.removeInputAnimation = (id) =>{
    var el = document.getElementById(id);
    let input = el.getElementsByClassName('el-input__inner')[0];
    var val = input.value;
    if(val.trim().length <= 0 ){
        el.classList.remove('input-is-focused');   console.log(val);  
    }
}
//将URL切割成对象
Vue.prototype.getUrlTab = function(){
    var arr = location.pathname.slice(1).split('=');
    var res = [];
    for(let i= 0;i<arr.length;i+=2){
        if(arr[i++].length>0){
            res[arr[i]] =  arr[i++];
        }else{
            res[arr[i]] = '';
        }
    }
    return res;
}
//获取背景列表
Vue.prototype.get_background_list = function(type){
    return axios.post('/public/get_background_list',{type:type});
}
//获取轮播图列表
Vue.prototype.get_carousel_list = function(type){
   return axios.post('/public/get_carousel_list',{type:type})
}
//获取Blog Meta 
Vue.prototype.get_blog_meta = function(meta){
 return axios.post('/public/get_blog_meta',{meta:meta});
}


//-------------------文章---------------------
//获取文章分类
Vue.prototype.get_category_all = function(){
    return axios.get('/post/get_category_all');
}
//获取空间评论
Vue.prototype.get_zone_comment = function({puid,start,limit}){
    return axios.post('/post/get_zone_comment',{puid:puid,start:start,limit:limit});
}
//根据文章ID获取评论
Vue.prototype.get_comment_by_pid = function({pid,start,type,limit}){
    start = start?start:0;
    type =type?type:'post';
    limit = limit?limit:10;
    return axios.post('/post/get_comment_by_pid',{pid:pid,start:start,type:type,limit:limit});
}
//提交评论
Vue.prototype.updateComment = function({pid,uid,puid,comment,type}){
    var self = this;
    let date = Math.round(new Date() / 1000);
    console.log(pid,uid,puid,comment,type,date);
    if(comment.trim().length == 0){
        this.$message({
            type:'warning',
            showClose : true,
            message : '请输入你的评论后再提交.',
        });
    }else{
        this.axios.post('/post/insert_comment',{uid:uid,pid:pid,puid:puid,content:comment,type:type,date:date}).then(function(res){
            if(res.data.status == 1){
                self.$message({
                    type:'success',
                    message : res.data.msg,
                });
                location.reload();
            }else{
                self.$message({
                    type:'warning',
                    message : '保存失败',
                }); 
            }
        });        
    }
}
//发布.编辑文章
Vue.prototype.updatePost = function(post){
    let uid = post.uid?post.uid:'';
    let pid = post.pid;
    let title = post.title;
    let content = post.content;
    let summary = content.replace(/<\/?.+?>/g,"").slice(0,200);
    let comment_status = post.comment_status;
    let status = post.status;
    let category = post.category;
    let date = Math.round(new Date() / 1000);
    axios.post('/post/update_post',{uid:uid,pid:pid,title:title,content:content,status:status,comment_status:comment_status,category:category,date:date,summary:summary}).then((res)=>{
       this.$router.push('/');
    });
}
//获取最新文章
Vue.prototype.getLatestPost = function({start,limit,uid}){
    start = start?start:0;
    limit = limit?limit:10;
    return axios.post('/post/get_latest_post',{start:start,limit:limit,uid:uid});
}
//通过分类ID获取文章
Vue.prototype.getPostByCategory = function(id,start,limit){
    start = start?start:0;
    limit = limit?limit:10;
    return axios.post('/post/get_post_by_category',{cid:id,start:start,limit:limit});
}
//按照评论排序文章
Vue.prototype.getPostOrderByComment = function(start,limit,sort,uid){
    sort = sort?sort:'asc';
    start = start?start:0;
    limit = limit?limit:10;
    return axios.post('/post/get_post_order_by_comment',{start:start,limit:limit,sort:sort,uid:uid});
}
//按照热度排序文章
Vue.prototype.getPostOrderHot = function(start,limit,sort){
    sort = sort?sort:'asc';
    start = start?start:0;
    limit = limit?limit:10;
    return axios.post('/api/');
}
//根据文章ID获得文章
Vue.prototype.get_post_by_id = function(id){
    return axios.post('/post/get_post_by_id',{pid:id});
}
Vue.prototype.get_category_meta = function({id:id,meta:meta}){
    return axios.post('/post/get_category_meta',{id:id,meta:meta});
}




//------------------------用户--------------------------
//登录
Vue.prototype.Login = function(account,password){
    var self = this;
    if(account.trim().length == 0 ){
        this.$message({
            type:'warning',
            message:'帐号不能为空',
        });
    }else if(password.trim().length == 0){
        this.$message({
            type:'warning',
            message:'密码不能为空',
        });
    }else {
        this.axios.post('/user/login',{account:account,password:password}).then(function(res){
            console.log(res.data.status);
            if(res.data.status == 1){
                self.$router.push('/');
                console.log(res.date.status);
            }else {
                self.$message({
                    type:'warning',
                    msg:re.date.msg,
                });
            }
        });        
    }

}
//退出
Vue.prototype.Logout = function({a,b,c}){
    console.log(a,b,c);
}
//获取用户背景，包括信息
Vue.prototype.get_user_background = function({meta,uid}){
    return axios.post('/user/get_user_bg',{meta:meta,uid:uid});
}
//修改用户背景信息
Vue.prototype.update_user_background = function({meta,bid,uid}){
    return axios.post('/user/update_user_bg',{uid:uid,meta:meta,value:bid});
}
//获取用户 Meta
Vue.prototype.get_user_meta = function(meta,id){
    return axios.post('/user/get_user_meta',{meta:meta,uid:id})
}
//上传用户meta 
Vue.prototype.update_user_meta = function({meta,uid,value}){
    return axios.post('user/update_user_meta',{meta:meta,uid:uid,value:value});
}

//结束符
};


