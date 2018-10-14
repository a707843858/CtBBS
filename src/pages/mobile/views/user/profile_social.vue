<template>
    <div class="social_wrap">
        <div class="social_container">
            <van-field v-model="userInfo.qq" :label="label.qq" @change="update_user({value:userInfo.qq,meta:'qq',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.wechat" :label="label.wechat" @change="update_user({value:userInfo.wechat,meta:'wechat',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.weibo" :label="label.weibo" @change="update_user({value:userInfo.weibo,meta:'weibo',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.github" :label="label.github" @change="update_user({value:userInfo.github,meta:'github',uid:session.uid})"></van-field>
            <van-field v-model="userInfo.facebook" :label="label.facebook" @change="update_user({value:userInfo.facebook,meta:'facebook',uid:session.uid})"></van-field>
        </div>
    </div>
</template>

<script>
export default {
    name:'m_profile_social',
    props:['userInfo','session'],
    data(){
        return {
            label:{
                qq:'QQ',
                wechat:'微信',
                weibo:'微博',
                github:'Github',
                facebook:'Facebook',
            },
        }
    },

}
</script>
