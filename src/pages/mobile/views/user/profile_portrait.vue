<template>
    <div class="portrait_wrap">
        <div class="portrait_container">
            <div class="avatar">
                <van-uploader><img :src="`/static/img/avatar/${userInfo.avatar_url}`"></van-uploader>            
            </div>
            <span v-text="label.tip" class="tip"></span>
        </div>
    </div>
</template>


<script>
export default {
    name:'m_profile_portrait',
    props:['userInfo','session'],
    data(){
        return {
            label:{
                tip:'请上传png/jpg格式文件。',
            },
        }
    },
    
}
</script>
