<template>
<div class="page_wrap">
    <div class="container profile_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load>
                <ct-header :title="value.title" :back="`true`" ></ct-header>
                <div class="profile_header">
                    <div class="profile_header_container">
                        <div class="profile_avatar"><img :src="`/static/img/avatar/${userInfo.avatar_url}`" alt=""></div>
                        <div class="profile_nick_name" v-text="userInfo.nick_name"></div>
                        <div class="profile_email text-center" v-text="$options.filters.star(userInfo.email,0,1)"></div>
                        <div class="profile_btm">
                            <li><p>{{userInfo.credit}}</p>{{label.credit}}</li>
                            <li><p>{{userInfo.charge}}</p>{{label.balance}}</li>
                            <li><p>{{userInfo.post}}</p>{{label.post}}</li>
                        </div>
                    </div>
                </div>
                <div class="profile_nav">
                    <div class="pfofile_base_nav profile_nav_item">
                        <div class="title" v-text="label.baseSetting"></div>
                        <div class="profile_nav_list">
                            <router-link :to="{path:'/profile/information'}" ><i class="iconfont icon-wendangzhongxin"></i><span v-text="label.information_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                            <router-link :to="{path:'/profile/portrait'}"><i class="iconfont icon-user"></i><span v-text="label.portrait_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                            <router-link :to="{path:'/profile/financial'}"><i class="iconfont icon-qianbao"></i><span v-text="label.financial_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                            <router-link :to="{path:'/profile/social'}"><i class="iconfont icon-shejiao"></i><span v-text="label.social_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                            <router-link :to="{path:'/profile/collect'}"><i class="iconfont icon-shoucang"></i><span v-text="label.collect_title"></span><i class="float-right iconfont icon-jiantou-you"></i></router-link>
                        </div>
                    </div>
                </div>                    
    </div>  
    <ct-aside></ct-aside>  
</div>
        
</template>

<script>
export default {
    name:'m_profile',
    data(){
        return {
            label:{
                home_title:'个人资料',
                information_title:'个人资料',
                portrait_title:'修改头像',
                financial_title:'我的钱包',
                social_title:'社交账号',
                collect_title:'私人收藏',
                credit:'积分',
                balance:'余额',
                post:'创作',
                baseSetting:'基本设置',
            },
            value:{
                title:'',
            },
            userInfo:[],
            session:[],
        }
    },
    created(){
        this.$store.commit('setPageLoad',2);        
        var tab = this.$route.params.tab;
        switch(tab){
            case 'information':
                this.value.title = this.label.information_title;
                break;
            default:
                this.value.title = this.label.home_title;
        }
        this.get_session().then((res)=>{this.session = res.data;this.$store.commit('pushPageLoad');});

        this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];this.$store.commit('pushPageLoad');});
    },
}
</script>

