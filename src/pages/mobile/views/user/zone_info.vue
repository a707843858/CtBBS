<template>
    <div class="info_wrap">
        <div class="user_info m_card">
            <div class="bd">
                <div class="item"><span v-text="label.nick_name"></span>{{userInfo.nick_name}}</div>
                <div class="item"><span v-text="label.id"></span>{{userInfo.id}}</div>
                <div class="item"><span v-text="label.fans"></span>{{userInfo.fans}}</div>
                <div class="item"><span v-text="label.city"></span>{{userInfo.city}}</div>
                <div class="item"><span v-text="label.job"></span>{{userInfo.job}}</div>
                <div class="item"><span v-text="label.qq"></span>{{userInfo.qq}}</div>
                <div class="item"><span v-text="label.wechat"></span>{{userInfo.wechat}}</div>
                <div class="item"><span v-text="label.weibo"></span>{{userInfo.weibo}}</div>
                <div class="item"><span v-text="label.github"></span>{{userInfo.github}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'m_zone_info',
    data(){
        return {
            label:{
                nick_name:'用户名',
                id:'ID',
                fans:'粉丝',
                city:'城市',
                job:'职业',
                qq:'QQ',
                wechat:'微信',
                weibo:'微博',
                github:'Github',
            },
            userInfo:[],
        }
    },
    created(){
        this.get_user({uid:this.$route.params.id}).then(res=>{this.userInfo = res.data[0];});
    }
}
</script>
