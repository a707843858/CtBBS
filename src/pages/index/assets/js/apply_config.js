import Vue from 'vue'
import axios from 'axios'
import { Message,MessageBox} from 'element-ui';
import qs from 'qs'
import router from '../../router/index'
import store from '../../store/index' 
import fn from '../../../../assets/apply/index'

// axios.defaults.baseURL = 'http://localhost:3000/',
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';//默认Post请求头
axios.defaults.timeout= 2500;
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.responseType = 'json';//默认返回数据类型
// axios.defaults.transformRequest = [function (data) {    //数据序列化
//     return qs.stringify(data);
//     }
// ];
// axios.defaults.validateStatus = function (status) { //status Code
//     return true;
// };
// 数据发送前的操作
axios.interceptors.request.use(function (config) {
    //配置config
    config.headers.Accept = 'application/json';
    return config;
});
// 对返回数据的操作
axios.interceptors.response.use(
    res=>{
        switch(res.data.state){
            case 201 :
                Message({type:'success',message:'保存成功'})
                break;
            case 202 :
            async function login(){
                Message({message:'正在登陆中...'});
                // await new Promise((resolve)=>{
                //     setTimeout(()=>{
                //         store.commit('switch_loginAside');
                //         resolve();
                //     },1000);
                // });
                await new Promise((resolve)=>{
                    setTimeout(()=>{
                        store.commit('switchLoginState');
                        resolve();
                    },1000);
                });
                router.push({path:'/'});
                router.go(0);
                Message({type:'success',message:res.data.nick_name+',欢迎你回来。'});
                };
                login();
                break;
            case 203 :
                async function logout(){
                    Message({message:'正在注销中....'});
                    // await new Promise((resolve)=>{
                    //     setTimeout(()=>{store.commit('switch_userStatus');resolve();},1000);
                    // });
                    await new Promise((resolve)=>{
                        setTimeout(()=>{store.commit('switchLoginState');resolve()},1000);
                    });
                    router.push({path:'/'});
                    router.go(0);
                    Message({message:res.data.nick_name+',期待你再次来临。'});
                };
                logout();
                break;
            case 204 :
                Message({type:'success',message:'注册成功，即将跳转...',});
                setTimeout(()=>{
                    router.push({path:'/'});
                },2000);
                break;
            case 205 :
                Message({type:'success',message:'发布成功，即将跳转...',});
                setTimeout(()=>{
                    router.push({name:'article',params:{id:res.data.pid}});
                },3000);
                break;
            case 206 :
                Message({type:'success',message:'评论成功',});
                break;
            case 207 :
                Message({type:'success',message:'收藏成功',});
                break;
            case 400 :
                Message({type:'warning',message:'保存失败',});
                break; 
            case 401 :
            MessageBox.confirm(
                '该用户不存在，是否继续使用该账号密码注册？',
                '温馨提示',
                {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '拒绝'
                }).then(()=>{
                    let params = {type:'confirm'};
                    axios.post('/api/user/register',{params}).then(res=>{resolve(res);}); 
                }).catch(()=>{
                    let params = {type:'cancel'};
                    axios.post('/api/user/register',{params}).then(res=>{resolve(res);}); 
                    Message({message:'期待你下次回来。'});
                });
                break;
            case 402 :
                Message({type:"warning",message:'你的账号是什么呢？'});
                break;
            case 403 :
                Message({type:"warning",message:'账号格式是不是写错了呢？'});
                break;
            case 404 :
                Message({type:'warning',message:'你的密码是什么呢？',});
                break;
            case 405 :
                Message({type:'warning',message:'嘻嘻，密码是不是写少了呢？',});
                break; 
            case 406 :
                Message({type:'warning',message:'嗯...或许你该回想下密码是什么。',});
                break;
            case 407 :
                Message({type:'warning',message:'取消收藏',});
                break;             
        }
        return res;
    },err=>{
        return Promise.reject(err);
        // console.log(Promise.reject(error));
    }
);


export default {
    axios,
    fn
} ;