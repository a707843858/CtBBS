import axios from 'axios'
import common from './common'
import Vue from 'vue'


export default {
//获取文章
get_post(params,resolve,reject){
    axios.post('/api/post/get_post',{params}).then(res=>{resolve(res)});
},
//提交文章
update_post(params,resolve,reject){
    let isMobile = common.userAgent()._isMobile;
    let summary = '';
    if(params.content == '' | params.content == null | params.content == undefined){
        Vue.$message({
            type:'warning',
            message:'请输入文章内容。'
        });
        return; 
    }
    if(params.summary != '' & params.summary != null & params.summary != undefined){
        if(params.summary.length > 150){
            isMobile ? Vue.$toast('文章简介超出规定长度,请适当删减。') : Vue.$message({type:'warning',message:'文章简介超出规定长度,请适当删减。'});
            return;
        }
        summary = params.summary;
    }else {
        summary = params.content.replace(/<\/?.+?>/g,"").slice(0,150);
    }
    axios.post('/api/post/update_post',{params}).then(res=>{resolve(res)});
},
//获取文章分类信息
get_category(params,resolve,reject){
    axios.post('/api/post/get_category',{params}).then(res=>{resolve(res)});
},
//获取评论
get_comment(params,resolve,reject){
    axios.post('/api/post/get_comment',{params}).then(res=>{resolve(res)});
},
//提交评论
update_comment(params,resolve,reject){
    let isMobile = common.userAgent()._isMobile;
    if(params.comment == undefined | params.comment == '' | params.comment == null ){
        isMobile ?  Vue.$toast('请输入你的评论后再提交。') : Vue.$message({type:'warning',message : '请输入你的评论后再提交。'});
    }else{
       axios.post('/api/post/update_comment',{params}).then(res=>{resolve(res)});
    }
},
//图片类帖子处理
get_gallery_post(str){
    // let str = this.postData.content;
    let imgStr = str.match(/<img.*?(?:>|\/>)/gi);
    console.log(imgStr);
    //获取文章内所有图片地址
    let imglist = new Array();
    for(let i=0;i<imgStr.length;i++){
        imglist[i] = imgStr[i].match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)[1];
    }
    //获取文章内除所有图片标签的内容
    let introduce = str.replace(/<img.*?(?:>|\/>)/gi,'');
    console.log(introduce);
    return [imglist,introduce];
},
//视频类文章处理
get_video_post(str,_this,resolve){
    let reg_iframe = new RegExp(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi);
    let _video = str.match(reg_iframe);
    let _content = str.replace(reg_iframe,'').replace(/<\/?.+?>/g,'');
    resolve({_video,_content}); 
},
//获取收藏列表
get_collect(params,resolve,reject){
    axios.post('/api/post/get_collect',{params}).then(res=>{resolve(res)});
},
//提交收藏
update_collect(params,resolve,reject){
    axios.post('/api/post/update_collect',{params}).then(res=>{ resolve(res)});
}











//结束符    
}