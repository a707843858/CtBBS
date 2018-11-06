<template>
<div class="page_wrap">
    <div class="container profile_page bg-white" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load>
        <ct-header :title="label.title" :back="`true`" :hideUser="`true`"></ct-header>
        <div class="portrait_wrap">
            <div class="portrait_container">
                <div class="avatar">
                    <van-uploader><img :src="`/static/img/avatar/${userInfo.avatar_url}`"></van-uploader>            
                </div>
                <span v-text="label.tip" class="tip"></span>
            </div>
        </div>        
    </div>
</div>
</template>


<script>
export default {
    name:'m_profile_portrait',
    data(){
        return {
            label:{
                title:'修改头像',
                tip:'请上传png/jpg格式文件。',
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
