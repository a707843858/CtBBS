<template>
    <div class="container">
        <!--QQ-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.qq" @change="update_user({value:userInfo.qq,meta:'qq',uid:session.uid})"><template slot="prepend">{{label.qq}}</template></el-input></el-col>
        <!--weChat-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.wechat" @change="update_user({value:userInfo.wechat,meta:'wechat',uid:session.uid})"><template slot="prepend">{{label.wechat}}</template></el-input></el-col>
        <!--微博-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.weibo" @change="update_user({value:userInfo.weibo,meta:'weibo',uid:session.uid})"><template slot="prepend">{{label.weibo}}</template></el-input></el-col>
        <!--Github-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.github" @change="update_user({value:userInfo.github,meta:'github',uid:session.uid})"><template slot="prepend">{{label.github}}</template></el-input></el-col>
        <!--FaceBook-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.facebook" @change="update_user({value:userInfo.facebook,meta:'facebook',uid:session.uid})"><template slot="prepend">{{label.facebook}}</template></el-input></el-col>
    </div>
</template>


<script>
export default {
    name:'social',
    props:['userInfo','session'],
    data(){
        return {
            label:{
                qq : 'QQ',
                wechat : '微信',
                weibo : '微博',
                github : 'Github',
                facebook : 'Facebook', 
            },
        }
    }
}
</script>