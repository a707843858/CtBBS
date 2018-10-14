<template>
        <div class="container profile_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
            <m_header :title="value.title" :back="`true`" ></m_header>
            <div class="user_nav" v-if="$route.params.tab == 'home'">
                        <router-link :to="{name:'profile',params:{tab:'information'}}"><i class="iconfont icon-wendangzhongxin"></i><span v-text="label.information_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                        <router-link :to="{name:'profile',params:{tab:'portrait'}}"><i class="iconfont icon-user"></i><span v-text="label.portrait_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                        <router-link :to="{name:'profile',params:{tab:'financial'}}"><i class="iconfont icon-qianbao"></i><span v-text="label.financial_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                        <router-link :to="{name:'profile',params:{tab:'social'}}"><i class="iconfont icon-shejiao"></i><span v-text="label.social_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                        <router-link :to="{name:'profile',params:{tab:'collect'}}"><i class="iconfont icon-shoucang"></i><span v-text="label.collect_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
            </div>                
            <m_information v-else-if="$route.params.tab == 'information'" :userInfo="userInfo" :session="session"></m_information>     
            <m_portrait v-else-if="$route.params.tab == 'portrait'" :userInfo="userInfo" :session="session"></m_portrait>     
            <m_financial v-else-if="$route.params.tab == 'financial'" :userInfo="userInfo" :session="session"></m_financial>  
            <m_social v-else-if="$route.params.tab == 'social'" :userInfo="userInfo" :session="session"></m_social> 
            <m_collect v-else-if="$route.params.tab == 'collect'" :userInfo="userInfo" ></m_collect>             
        </div>
</template>

<script>
import m_header from '@/pages/mobile/components/header'
import m_information from '@/pages/mobile/views/user/profile_information.vue'
import m_portrait from '@/pages/mobile/views/user/profile_portrait.vue'
import m_financial from '@/pages/mobile/views/user/profile_financial.vue'
import m_social from '@/pages/mobile/views/user/profile_social.vue'
import m_collect from '@/pages/mobile/views/user/profile_collect.vue'
export default {
    name:'m_profile',
    data(){
        return {
            label:{
                home_title:'个人资料',
                information_title:'基本资料',
                portrait_title:'修改头像',
                financial_title:'我的钱包',
                social_title:'社交账号',
                collect_title:'私人收藏',
            },
            value:{
                title:'',
            },
            userInfo:[],
            session:[],
        }
    },
    created(){
        this.get_session().then((res)=>{this.session = res.data;});
        var tab = this.$route.params.tab;
        switch(tab){
            case 'information':
                this.value.title = this.label.information_title;
                break;
            default:
                this.value.title = this.label.home_title;
        }
        this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];});
    },
    components:{
        m_header,
        m_information,
        m_portrait,
        m_financial,
        m_social,
        m_collect,
    },

}
</script>

