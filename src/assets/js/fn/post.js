var axios = require('axios');
var elm =  require('element-ui');

module.exports = {
//测试    
test(){
    console.log('a')
},
//提交评论
updateComment(pid,comment,uid){
    var self = this;
    if(comment.trim().length == 0){
        this.elm.$message({
            type:'warning',
            showClose : true,
            message : '请输入你的评论后再提交.',
        });
    }else{
        axios.post('/api/post/update_comment',{uid:uid,pid:pid,content:comment,type:'post'}).then(function(res){
            if(res.data.status == 1){
                elm.$message({
                    type:'success',
                    message : res.data.msg,
                });
                location.reload();
            }else{
                elm.$message({
                    type:'warning',
                    message : '保存失败',
                }); 
            }
        });        
    }
}



//结束符
}
