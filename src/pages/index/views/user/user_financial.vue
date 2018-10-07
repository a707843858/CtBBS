<template>
    <div class="container">
        <el-alert :title="label.tip" type="info" :closable="false" class="mb-3"></el-alert>
        <!--真实姓名-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.real_name" @change="update_user_meta({value:userInfo.real_name,meta:'real_name',uid:session.uid})" ><template slot="prepend" >{{label.realName}}</template></el-input></el-col>
        <!--支付宝-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.alipay" @change="update_user_meta({value:userInfo.alipay,meta:'alipay',uid:session.uid})"><template slot="prepend" >{{label.alipay}}</template></el-input></el-col>
        <!--详细地址-->
            <el-col class="input-label-group"><div class="input-label">{{label.recieve_address}}</div><el-input type="textarea" size="small" rows="3" v-model="userInfo.recieve_address"  @change="update_user_meta({value:userInfo.recieve_address,meta:'recieve_address',uid:session.uid})"></el-input></el-col>
    </div>
</template>

<script>
export default {
    name:'financial',
    props:['userInfo','session'],
    data(){
        return {
            label:{
                realName : '真实姓名',
                alipay : '支付宝',
                recieve_address : '收货地址',
                tip : '以下信息仅供交易使用，不会以其他形式展示。',
            },
        }
    },
}
</script>