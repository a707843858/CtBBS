<template>
    <div class="m_aside">
        <div class="aside_nav" >
            <div class="container">
                <div class="logo">
                    <img src="/static/img/other/m_logo.png" :alt="label.home">
                </div>
                <div class="nav">
                    <a href="javascript:;" @click="$store.dispatch('toLogin');" v-if="!$store.state.session.uid"><i class="iconfont icon-user"></i><span v-text="label.loginOrRegister"></span></a>
                    <router-link :to="{name:'home'}"><i  class="iconfont icon-home"></i><span v-text="label.home"></span></router-link>
                    <router-link :to="{name:'category',params:{tab:'all'}}" exact><i class="iconfont icon-fenlei_1"></i><span v-text="label.category"></span></router-link>
                </div>                
            </div>
        </div>
        <div class="aside_user">
            <div class="aside_userStatus" v-if="$store.state.session.uid">
                1
            </div>   
            <div class="aside_login" :class="{'aside_full':$store.state.loginAside}" v-else>
                    <div class="hd ">
                        <div class="prev" @click="$store.commit('switch_rightAside')"><i class="iconfont icon-jiantou-zuo"></i></div>
                        <div class="logo">
                            <img src="/static/img/other/login_icon.png" alt="logo" class="logoImg">
                        </div>
                        <div class="register"><i class="iconfont icon-zhuce"></i></div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="bd">
                        <div class="input_group"><label><i class="iconfont icon-user"></i></label><input :placeholder="label.email" v-model="login.account"></input></div>
                        <div class="input_group"><label><i class="iconfont icon-yuechi"></i></label><input :placeholder="label.password" v-model="login.password"></input></div>
                        <div class="input_group"><button class="login_btn" @click="Login(login.account,login.password)">{{label.login}}</button></div>
                        <div class="input_group line"><span class="tit">OR</span></div>
                        <div class="copy">&copy; 2018 CHUANGSHE.INC</div>
                    </div>
            </div> 
        </div>
    </div>
</template>

<script>
    export default {
        name:'m_aside',
        data(){
            return {
                 label:{
                    login:'登录',
                    email:"邮箱",
                    password:'密码',
                    home:'首页',
                    loginOrRegister:'登录 / 注册',
                    category:'发现更多',
                },
                login:{
                    account:'',
                    password:'',
                }
            }
        },
    }
</script>