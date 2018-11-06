<template>
<div class="page_wrap">
        <div class="container zone_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
            <ct-page-load></ct-page-load>
            <div class="zone_hd">
                <ct-header :tab="`zone`" :back="`true`"></ct-header>
                <div class="user_info">
                    <div class="user_line"></div>
                    <div class="user_container">
                        <div class="user_avatar">
                            <img :src="`/static/img/avatar/${userInfo.avatar_url}`" :alt="userInfo.nick_name">
                        </div>
                        <div class="user_info">
                            <span class="nick_name" v-text="userInfo.nick_name"></span><small class="ml-2" v-text="`Lv.0`"></small>
                            <div class="sign" v-text="userInfo.sign"></div>
                        </div>
                        <div class="user_control">
                                <div class="pcount"><span v-text="label.post"></span> / {{userInfo.post}}</div>
                                <li class="follow"><i class="iconfont icon-guanzhu"></i><span v-text="label.follow"></span></li>
                                <li class="message"><i class="iconfont icon-liaotian"></i><span v-text="label.send_message"></span></li>
                        </div>
                    </div>
                </div>
                <div class="bg_mask" :style="`background:url('/static/img/avatar/${userInfo.avatar_url}')`"></div>
            </div>
            <div class="zone_nav">
                <router-link :to="{name:'zone_home',params:{id:$route.params.id}}"><span v-text="label.home"></span></router-link>
                <router-link :to="{name:'zone_post',params:{id:$route.params.id}}"><span v-text="label.dynamic"></span></router-link>
                <router-link :to="{name:'zone_info',params:{id:$route.params.id}}"><span v-text="label.info"></span></router-link>
            </div>
            <div class="zone_container">
                <transition :name="transitionName">
                    <router-view></router-view>
                </transition>
            </div>
        </div> 
        <ct-aside></ct-aside>   
</div>

</template>

<script>
export default {
    name:'m_zone',
    data(){
        return {
            label:{
                follow:'关注',
                send_message:'私信',
                home:'首页',
                post:'创作',
                info:'资料',
                dynamic:'动态',
            },
            transitionName:'slide-left',
            userInfo:[],
        }
    },
    created(){
        this.$store.commit('setPageLoad',1);
        this.get_user({uid:this.$route.params.id}).then(res=>{this.userInfo = res.data[0];this.$store.commit('pushPageLoad');});
    },
    watch: {//使用watch 监听$router的变化
        $route(to, from) {
                    if(to.meta.index > 0){
                        if( to.meta.index < from.meta.index){
                            this.transitionName = 'slide-right';
                        }else{
                            this.transitionName = 'slide-left';
                        }
                    }else if(to.meta.index == 0 && from.meta.index > 0){
                        this.transitionName = 'slide-right';
                    }
        this.$store.state.leftAside = false ;
        this.$store.state.rightAside = false ;
        this.$store.state.loginAside = false ;
        }
        }
}
</script>

