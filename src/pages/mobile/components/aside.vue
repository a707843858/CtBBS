<template>
    <div class="m_aside" :class="{'d-none':$store.state.pageLoad}">
        <div class="aside_nav" >
            <div class="container">
                <div class="nav">
                    <router-link :to="{name:'home'}"><i  class="iconfont icon-home"></i><span v-text="label.home"></span></router-link>
                    <router-link :to="{name:'category',params:{tab:'all'}}" exact><i class="iconfont icon-fenlei_1"></i><span v-text="label.category"></span></router-link>
                </div>                
            </div>
        </div>
        <div class="aside_userStatus" v-if="$store.state.login" >
                <div class="tit">
                    <span v-text="label.userStatus"></span>
                    <span class="float-right"><i class="iconfont icon-tuichu" style="color:#f5ac0b;" @click="Logout"></i></span>
                </div>
                <div class="container">
                    <div class="hd_avatar" >
                        <div class="avatar_bg_blur" :style="`background:url('/static/img/avatar/${userInfo.avatar_url}') no-repeat`"></div>
                        <div class="avatar_container">
                            <div class="avatar_wrap">
                                <router-link :to="{name:'zone_home',params:{id:userInfo.uid}}"><img :src="`/static/img/avatar/${userInfo.avatar_url}`" :alt="userInfo.nick_name" class="avatar"></router-link>
                                <div class="level" v-text="`Lv.0`"></div>
                            </div>
                        </div>
                        <div class="nick_name"><i class="iconfont icon-user mr-1"></i><span v-text="userInfo.nick_name"></span></div>
                    </div>
                    <div class="user_list">
                        <router-link :to="{path:'/profile/message'}"><i class="iconfont icon-xiaoxi"></i><span v-text="label.notice"></span></router-link>
                        <router-link :to="{name:'editor',params:{id:0}}"><i class="iconfont icon-fabiao"></i><span v-text="label.publish"></span></router-link>
                        <router-link :to="{path:'/profile'}"><i class="iconfont icon-ziliao"></i><span v-text="label.information"></span></router-link>
                        <router-link :to="{path:'/profile/collect'}"><i class="iconfont icon-shoucang"></i><span v-text="label.collect"></span></router-link>
                        <router-link :to="{path:'/'}"><i class="iconfont icon-diannao"></i><span v-text="label.backend"></span></router-link>
                    </div>
                </div>
        </div>   
        <div class="aside_login" :class="{'aside_full':$store.state.loginAside}" v-else>
                        <div class="hd ">
                            <div class="prev" @click="$store.commit('switch_loginAside')"><i class="iconfont icon-jiantou-zuo"></i></div>
                            <div class="logo">
                                <img src="/static/img/other/login_icon.png" alt="logo" class="logoImg">
                            </div>
                            <!-- <div class="register" @click="$store.commit('switch_registerAside')"><i class="iconfont icon-zhuce"></i></div> -->
                            <div class="clearfix"></div>
                        </div>
                        <div class="bd">
                            <div class="input_group"><label><i class="iconfont icon-youxiang"></i></label><input :placeholder="label.email" v-model="login.account"></input></div>
                            <div class="input_group"><label><i class="iconfont icon-yuechi"></i></label><input :placeholder="label.password" v-model="login.password" type="password"></input></div>
                            <div class="input_group " ><button class="login_btn" @click="Login(login)">{{label.login}}</button><button class="forget_btn" @click="develope">{{label.forget_password}}</button></div>
                            <!--<div class="input_group line"><span class="tit">OR</span></div>-->
                            <div class="copy">&copy; 2018 CHUANGSHE.INC</div>
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
                    nick_name:'昵称',
                    r_password:'确认密码',
                    register:'注册',
                    home:'首页',
                    loginOrRegister:'登录 / 注册',
                    category:'发现更多',
                    userStatus:'用户中心',
                    notice:'消息提醒',
                    information:'个人资料',
                    collect:'私人收藏',
                    backend:'后台管理',
                    publish:'发表创作',
                    forget_password:'忘记密码',
                },
                login:{
                    account:'',
                    password:'',
                },
                userInfo:{uid:0},
            }
        },
        created(){
            this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];});
            
        },
        watch:{
            '$store.state.login'(){
                this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];});
            }
        }
    }
</script>