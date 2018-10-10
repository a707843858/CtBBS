<template>
    <div class="financial_wrap">
        <div class="financial_balance m_card mb-3">
            <div class="hd">
                <span v-text="label.balance"></span>
                <van-button size="mini" class="float-right charge_btn" @click="develop()"><span v-text="label.charge"></span></van-button>
            </div>
            <div class="bd">
                <div class="left">
                    <div class="credit"><b v-text="userInfo.credit"></b>{{value.credit_title}}</div>
                    <div class="charge"><b v-text="userInfo.charge"></b>{{value.charge_title}}</div>
                </div>
                <div class="right"></div>
            </div>
        </div>
        <div class="financial_info m_card">
            <div class="hd"><span v-text="label.info"></span></div>
            <div class="bd">
                <p class="tip" v-text="label.info_tip"></p>
                <van-field v-model="userInfo.real_name" :label="label.real_name" @change="update_user_meta({value:userInfo.real_name,meta:'real_name',uid:$store.state.session.uid})"></van-field>
                <van-field v-model="userInfo.alipay" :label="label.alipay" @change="update_user_meta({value:userInfo.alipay,meta:'alipay',uid:$store.state.session.uid})"></van-field>
                <van-field v-model="userInfo.recieve_address" :label="label.recieve_address" type="textarea" @change="update_user_meta({value:userInfo.recieve_address,meta:'recieve_address',uid:$store.state.session.uid})"></van-field>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'m_profile_financial',
    props:['userInfo'],
    data(){
        return {
            label:{
                balance:'账户余额',
                charge:'充值',
                info:'个人资料',
                info_tip:'以下信息仅供交易使用，不会以其他形式展示。',
                real_name:'真实姓名',
                alipay:'支付宝',
                recieve_address:'收货地址',
            },
            value:{
                credit_title:'',
                charge_title:'',
            },
        }
    },
    created(){
        this.get_blog_meta('credit_title').then(res=>{this.value.credit_title = res.data[0].meta_value;});
        this.get_blog_meta('charge_title').then(res=>{this.value.charge_title = res.data[0].meta_value;});
    },
    methods:{
        develop(){this.$toast('开发中');}
    }
}
</script>

