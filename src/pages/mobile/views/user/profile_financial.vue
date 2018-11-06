<template>
<div class="page_wrap">
    <div class="container profile_page bg-white" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load>
        <ct-header :title="label.title" :back="`true`" :hideUser="`true`"></ct-header>
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
                    <van-field v-model="userInfo.real_name" :label="label.real_name" @change="update_user({value:userInfo.real_name,meta:'real_name',uid:session.uid})"></van-field>
                    <van-field v-model="userInfo.alipay" :label="label.alipay" @change="update_user({value:userInfo.alipay,meta:'alipay',uid:session.uid})"></van-field>
                    <van-field v-model="userInfo.recieve_address" :label="label.recieve_address" type="textarea" @change="update_user({value:userInfo.recieve_address,meta:'recieve_address',uid:session.uid})"></van-field>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    name:'m_profile_financial',
    data(){
        return {
            label:{
                title:'我的钱包',
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
            userInfo:[],
            session:[],
        }
    },
    created(){
        this.$store.commit('setPageLoad',4);
        this.get_session().then((res)=>{this.session = res.data;this.$store.commit('pushPageLoad');});
        this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];this.$store.commit('pushPageLoad');});
        this.get_blog_meta('credit_title').then(res=>{this.value.credit_title = res.data[0].meta_value;this.$store.commit('pushPageLoad');});
        this.get_blog_meta('charge_title').then(res=>{this.value.charge_title = res.data[0].meta_value;this.$store.commit('pushPageLoad');});
    },
    methods:{
        develop(){this.$toast('开发中');}
    }
}
</script>

