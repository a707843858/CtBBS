import axios from 'axios'
import common from './common'
import { Message } from 'element-ui'
import { Toast } from 'vant'

export default {
//新版登录 
Login(params,resolve,reject){
    let isMobile = common.userAgent()._isMobile;
    // if(common.isEmpty(params.account)){
    //     isMobile ? Toast('账号不能为空') : Message({type:'warning',message:'帐号不能为空',});
    // }else if(common.isEmpty(params.password)){
    //     isMobile ? Toast('密码不能为空') : Message({type:'warning',message:'密码不能为空',})
    // }else {
        axios.post('/api/user/login',{params}).then(function(res){
            resolve(res);
        }).catch(err=>{reject(err)}); 
    // }
},
//登出
Logout(resolve,reject){
    axios.get('/api/user/logout').then(res=>{resolve(res)});
},
//注册
Register(params,resolve,reject){
    let _this= this ;
    let isMobile = common.userAgent()._isMobile;
    let email_reg = /@/ig;
    if(common.isEmpty(params.nick_name)){
        isMobile ? Toast('昵称不能为空') : Message({type:'warning',message:'昵称不能为空'});
    }else if(common.isEmpty(params.account)){
        isMobile ? Toast('邮箱不能为空') : Message({type:'warning',message:'邮箱不能为空'});
    }else if(!email_reg.test(params.account)){
        isMobile ? Toast('邮箱格式错误，请重新输入') : Message({type:'warning',message:'邮箱格式错误，请重新输入'});
    }else if(common.isEmpty(params.password)){
        isMobile ? Toast('密码不能为空') : Message({type:'warning',message:'密码不能为空'});
    }else if(common.isEmpty(params.r_password)){
        isMobile ? Toast('请重复密码') : Message({type:'warning',message:'请重复密码'});
    }else if(params.r_password.length < 6 || params.password.length < 6){
        isMobile ? Toast('密码长度最少应为6位') : Message({type:'warning',message:'密码长度最少应为6位'});
    }else if(params.password !== params.r_password){
        isMobile ? Toast('两次输入的密码不一致') : Message({type:'warning',message:'两次输入的密码不一致'});
    }else {
        axios.post('/api/user/register',{params}).then(res=>{resolve(res);}).catch(err=>{reject(err)});        
    }
},
//获取用户信息
get_user(params,resolve,reject){
    axios.post('/api/user/get_user',{params}).then(res=>{
        resolve(res);
    });
   
},
//提交用户信息
update_user(params,resolve,reject){
    axios.post('/api/user/update_user',{params}).then(res=>{resolve(res)}).catch(err=>{reject(err)});
},
//获取背景信息
get_background(params,resolve,reject){
    axios.post('/api/user/get_background',{params}).then(res=>{resolve(res)});
},
//提交背景信息
update_background(params,resolve,reject){
    axios.post('/api/user/update_background',{params}).then(res=>{resolve(res)});
},
//获取用户消息
get_message(params,resolve,reject){
    axios.post('api/user/get_message',{params}).then(res=>{resolve(res)});
},



//结束符    
}