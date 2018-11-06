<template>
<div class="home_page">
    <div class="flat_list">
        <div class="flat_list_wrap">
            <div class="item item-user ">
                <div class="itme_wrap">
                    <i class="iconfont icon-user"></i>
                    <div class="info">
                        <div class="title" v-text="label.total_user"></div>
                        <div class="value" v-text="`500`"></div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="itme_wrap">
                    <i class="iconfont icon-zhuce"></i>
                    <div class="info">
                        <div class="title" v-text="label.new_member"></div>
                        <div class="value" v-text="`55`"></div>
                    </div>
                </div>
                </div>
            <div class="item">
                <div class="itme_wrap">
                    <i class="iconfont icon-tiezi"></i>
                    <div class="info">
                        <div class="title" v-text="label.post_count"></div>
                        <div class="value" v-text="`4000`"></div>
                    </div>
                </div>
                </div>
            <div class="item">
                <div class="itme_wrap">
                    <i class="iconfont icon-tiezishoucang"></i>
                    <div class="info">
                        <div class="title" v-text="label.new_post"></div>
                        <div class="value" v-text="`200`"></div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
    <div class="flat_list_chart">
        <div class="chart_item">
            <div class="member_chart chart_item_wrap" ref="memberChart"></div>
        </div>
        <div class="chart_item">
           <div class="post_chart chart_item_wrap" ref="postChart"></div> 
        </div>       
    </div>
    <div class="payment">
        <div class="payment_title" v-text="label.payment"></div>
        <div class="payment_list">
            <el-table  class="payment_list_item" :data="paymentData">
            <el-table-column prop="date" :label="label.date" width="180"></el-table-column>
            <el-table-column prop="uid" :label="label.id" width="180"> </el-table-column>
            <el-table-column prop="user" :label="label.nick_name"> </el-table-column>
            <el-table-column prop="payway" :label="label.payway"> </el-table-column>
            <el-table-column prop="balance" :label="label.balance"> </el-table-column>
            </el-table>
        </div>        
    </div>

</div> 
</template>

<script>
export default {
    name : 'admin',
    data(){
        return {
            label : {
               total_user:'会员总数', 
               new_member:'新增会员',
               post_count:'文章总数',
               new_post:'新增会员',
               member_chart:'会员趋势图',
               post_chart:'文章趋势图',
               payment:'充值记录',
               date:'日期',
               id:'ID',
               nick_name:'用户',
               payway:'支付方式',
               balance:'金额',
            } ,
            value: {
            },
            paymentData:[
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
                {date:'2018/10/1',uid:'1',user:'喵叔',payway:'支付宝',balance:'10'},
            ],

        }
    },
    created() {

    },
    methods:{
        member_chart() {
            var self = this ;
            var memberChart = this.$echarts.init(this.$refs.memberChart);
            // 绘制图表
            memberChart.setOption({
                title:{
                    text:self.label.member_chart,
                    padding:[0,30],
                },
                xAxis: {
                    type: 'category',
                    data: ['10/19', '10/20', '10/21', '10/22', '10/23', '10/24', '10/25'],
                // data:data,
                },
                yAxis: {
                    type: 'value',
                    axisLine:{show:false},
                },
                legend: {
                    data:[self.label.total_user,self.label.new_member]
                },
                series: [
                    {
                        name:self.label.total_user,
                        data: [34, 60, 78, 150,267, 357,500],
                        type: 'line',
                        smooth:true,
                    },
                    {
                        name:self.label.new_member,
                        data: [10, 50, 30,20, 65, 70, 55],
                        type: 'line',
                        smooth:true,
                    }
                ]
            });
        },
        post_chart(){
            var self = this ;
            var postChart = this.$echarts.init(this.$refs.postChart);   
            postChart.setOption({
                title:{
                    text:this.label.post_chart,
                    padding:[0,30],
                },
                xAxis:{
                    type:'category',
                    data: ['10/19', '10/20', '10/21', '10/22', '10/23', '10/24', '10/25'],
                },
                yAxis:{
                    type: 'value',
                    axisLine:{show:false},
                },
                legend:{
                    data:[this.label.new_post],
                },
                series:[
                    {
                        name:this.label.new_post,
                        data: [34, 60, 78, 56,146,178,200],
                        type: 'bar',
                        smooth:true,
                    },
                ]
            });
        },
    },
    mounted(){
        this.member_chart();
        this.post_chart();

    },
    beforeDestroy() {
        if (!this.new_member_chart) {
        return
        }
        this.new_member_chart.dispose();
        this.new_member_chart = null;
    }
}
</script>
