var axios = require('axios');
var post =  require('./post');
// const other = require('./other');


exports.install = function (Vue, options) {
//测试
Vue.prototype.test = function(){post.test()};
//-------帖子------
//提交评论
Vue.prototype.updateComment = function(pid,comment,uid){post.updateComment(pid,comment,uid)}

       
//------用户--------




//------其他---------

    //发布.编辑帖子
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
        console.log(post.id);
        console.log(uid,pid,title,content,summary,comment_status,status,category,date);
        this.axios.post('/api/post/update_post',{uid:uid,pid:pid,title:title,content:content,status:status,comment_status:comment_status,category:category,date:date,summary:summary}).then((res)=>{
           this.$router.push('/');
        });
    }
    //获取最新文章
    Vue.prototype.getLatestPost = function(start,limit){
        start = start?start:0;
        limit = limit?limit:10;
        return axios.post('/api/post/get_latest_post',{start:start,limit:limit});
    }
    //通过分类ID获取文章
    Vue.prototype.getPostByCategory = function(id,start,limit){
        start = start?start:0;
        limit = limit?limit:10;
        return axios.post('/api/post/get_post_by_category',{cid:id,start:start,limit:limit});
    }
    //按照评论排序帖子
    Vue.prototype.getPostOrderByComment = function(start,limit,sort){
            sort = sort?sort:'asc';
            start = start?start:0;
            limit = limit?limit:10;
            return axios.post('/api/post/get_post_order_by_comment',{start:start,limit:limit,sort:sort});
    } 
}

