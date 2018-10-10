<template>
    <div class="post_wrap">
        <div class="post_line m_card">
            <div class="hd d-none"><span v-text="label.postLine"></span></div>
            <div class="bd">
                <van-list v-model="value.loading" :finished="value.finished" @load="ajax_post">
                    <div class="start_circle"><i></i></div>
                    <div class="item" v-for="item in postData" :key="item.pid"> 
                        <div class="post_info">
                            <router-link :to="{name:'article',params:{id:item.pid}}" tag="p" class="tit"><a v-text="item.title"></a></router-link>
                            <div class="btm">
                                <div>{{label.reply}}<span v-text="item.comment_count"></span>{{label.times}}</div>
                                <div class="float-right">
                                    <router-link :to="{name:'category',params:{tab:item.category}}" tag="p" class="d-inline-block"><a v-text="item.category_title"></a></router-link>
                                    <span>/ {{item.publishTime | date}}</span>
                                </div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div class="circle"><i></i></div>
                    </div>
                    <div class="end_circle"><i></i></div>
                    <div class="end_tip" v-show="value.finished"><span v-text="label.end"></span><i class="iconfont icon-qianting"></i></div>      
                </van-list>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'m_zone_post',
    data(){
        return {
            label:{
                postLine:'创作历程',
                reply:'回复',
                times:'次',
                end:'到底啦',
            },
            value:{
                date:'',
                loading:false,
                finished:false,
                times:0,
            },
            postData:[],
        }
    },
    created(){
        let now = new Date();
        let date = now.toLocaleDateString().replace(/\//g,'-');
        this.value.date = date;
        // this.getLatestPost({limit:6,uid:this.$route.params.id}).then(res=>{this.postData = res.data});
    },
    methods:{
        ajax_post (){
            var times = this.value.times;
            var limit = 7;
            var start = times * limit ;
            var self = this ; 
            setTimeout(function(){
                self.getLatestPost({start:start,limit:limit,uid:self.$route.params.id}).then(res=>{
                    if(res.data.length > 0){
                        for(var i = 0;i < res.data.length;i++){
                            self.postData.push(res.data[i]);
                        }
                        self.value.loading = false;
                        self.value.times ++;                      
                    }else {
                        self.value.loading = false;
                        self.value.finished = true;
                    }
                });
            },1000);
        }
    },
}
</script>
