<template>
    <div class="ct-header">
        <span class="slideBarSwitch" @click="$store.commit('leftAsideSwitch')"><i class="iconfont icon-jiantou-zuo"></i></span>
        <div class="float-right right-menu">
            <!-- {{userInfo}} -->
            <div class="author_info">
                <div class="author_avatar"><img :src="`/static/img/avatar/${userInfo.avatar_url}`" :alt="userInfo.nick_name" class="img"></div>
                <div class="author_name">
                    <span v-text="userInfo.nick_name"></span><i class="iconfont icon-jiantouarrow486"></i>
                </div>
            </div>
            
        </div>
    </div>       
</template>

<script>
export default { 
    name:'admin_header',
    data(){
        return {
            userInfo:[],
        }
    },
    created(){
        this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0]});
    }
};
</script>