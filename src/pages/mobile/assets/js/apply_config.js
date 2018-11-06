import Vue from 'vue'
import axios from 'axios'
import { Toast,Dialog } from 'vant';
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
        // console.log(store);
        switch(res.data.state){
            case 201 :
                Toast('保存成功')
                break;
            case 202 : 
                async function login(){
                    Toast('正在登陆中...');
                    await new Promise((resolve)=>{
                        setTimeout(()=>{
                            store.commit('switch_loginAside');
                            resolve();
                        },1000);
                    });
                    await new Promise((resolve)=>{
                        setTimeout(()=>{
                            store.commit('switchLoginState');
                            resolve();
                        },1000);
                    });
                    router.push({path:'/'});
                    Toast(res.data.nick_name+',欢迎你回来。');
                };
                login();
                break;
            case 203 :
                async function logout(){
                    Toast('正在注销中....');
                    await new Promise((resolve)=>{
                        setTimeout(()=>{store.commit('switch_userStatus');resolve();},1000);
                    });
                    await new Promise((resolve)=>{
                        setTimeout(()=>{store.commit('switchLoginState');resolve()},1000);
                    });
                    router.push({path:'/'});
                    Toast(res.data.nick_name+',期待你再次来临。');
                };
                logout();
                break;
            case 204 :
                Toast('注册成功，即将跳转...');
                setTimeout(()=>{
                    router.push({path:'/'});
                },2000);
                break;
            case 205 :
                Toast('发布成功，即将跳转...');
                setTimeout(()=>{
                    router.push({name:'article',params:{id:res.data.pid}});
                },3000);
                break;
            case 206 :
                (async function(){
                    Toast('评论成功');
                    await new Promise((resolve)=>{
                        setTimeout(()=>{
                            router.go(0);
                            resolve();
                        },1000);
                    });
                })();
                break;
            case 207 :
                Toast('收藏成功');
                break;
            case 400 :
                Toast('保存失败');
                break; 
            case 401 :
                Dialog.confirm({
                    title: '温馨提示',
                    message: '该用户不存在，是否继续使用该账号密码注册？'
                }).then(() => {
                    let params = {type:'confirm'};
                    axios.post('/api/user/register',{params}).then(res=>{resolve(res);}); 
                }).catch(() => {
                    let params = {type:'cancel'};
                    axios.post('/api/user/register',{params}).then(res=>{resolve(res);}); 
                    Toast('期待你下次回来。');
                });
                break;
            case 402 :
                Toast('你的账号是什么呢？');
                break;
            case 403 :
                Toast('账号格式是不是写错了呢？');
                break;
            case 404 :
                Toast('你的密码是什么呢？');
                break;
            case 405 :
                Toast('嘻嘻，密码是不是写少了呢？');
                break;
            case 406 :
                Toast('嗯...或许你该回想下密码是什么。');
                break; 
            case 407 :
                Toast('取消收藏');
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