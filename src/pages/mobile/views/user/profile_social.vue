<template>
<div class="page_wrap">
    <div class="container profile_page bg-white" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load>
        <ct-header :title="value.title" :back="`true`" :hideUser="`true`"></ct-header>    
        <div class="social_wrap">
        <div class="social_container">
            <van-field v-model="userInfo.qq" :label="label.qq" @change="update_user({value:userInfo.qq,meta:'qq',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.wechat" :label="label.wechat" @change="update_user({value:userInfo.wechat,meta:'wechat',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.weibo" :label="label.weibo" @change="update_user({value:userInfo.weibo,meta:'weibo',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.github" :label="label.github" @change="update_user({value:userInfo.github,meta:'github',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.facebook" :label="label.facebook" @change="update_user({value:userInfo.facebook,meta:'facebook',uid:session.uid})"></van-field>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
    name:'m_profile_social',
    data(){
        return {
            label:{
                qq:'QQ',
                wechat:'微信',
                weibo:'微博',
                github:'Github',
                facebook:'Facebook',
            },
            value:{
                title:'社交信息',
            },
            userInfo:[],
            session:[],
        }
    },
    created(){
        this.$store.commit('setPageLoad',2);
        this.get_session().then((res)=>{this.session = res.data;this.$store.commit('pushPageLoad');});
        this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];this.$store.commit('pushPageLoad');});
    },

}
</script>
