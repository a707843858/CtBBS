<template>
<div class="container">
    <el-row type="flex" class="f-wrap post_collect" v-show="collect_tab == 'post'">
        <el-col :lg="6" :md="6" :sm="12" class="item" v-for="item in postData" :key="item.pid">
            <router-link :to="{name:'article',params:{id:item.pid}}">
                <img :src="item.thumb" :alt="item.title" class="thumb">
                <div class="info">
                    <div class="tit" v-text="item.title"></div>
                    <div class="timeLine" >{{label.collect_time}}：<span v-text="$options.filters.date(item.publishTime)"></span></div>
                </div>
            </router-link>
            <div class="delete" @click="develope()"><i class="iconfont icon-close"></i></div>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
        name:'user_collect',
        props:['collect_tab'],
        data(){
            return {
                postData:[],
                label:{
                    collect_time:'收藏于',
                },
            }
        },
        created(){
            this.get_post({start:0,limit:5,uid:this.$route.query.id}).then(res=>{this.postData = res.data;});
        },
    }
</script>
