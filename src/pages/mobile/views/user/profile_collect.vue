<template>
    <div class="collect_wrap">
        <div class="collect_container">
            <van-tabs v-model="active" type="card">
                    <van-tab :title="label.post">
                        <van-list v-model="value.loading" :finished="value.finished" @load="ajax_post" v-if="postData">
                            <van-cell class="item" v-for="item in postData" :key="item.pid"  :to="{name:'article',params:{id:item.pid}}" is-link>
                                <i class="iconfont icon-collection-b"></i><span v-text="item.title"></span>    
                            </van-cell>                                
                        </van-list>
                        <div class="empty_tip" v-else><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div>
                    </van-tab>
                    <van-tab :title="label.category">
                        <div class="empty_tip"><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div>
                    </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name:'m_profiel_collect',
    data(){
        return {
            label:{
                empty_tip:'还没有收藏任何东西。',
                post:'文章',
                category:'版块',
            },
            value:{
                loading:false,
                finished:false,
                times:0,
            },
            postData:[],
        }
    },
    created(){
    },
    methods:{
        //暂时用最新帖子代替
        ajax_post() {
                let tab = this.value.post_tab;
                let start = this.value.times * 6 ;
                let self = this;
                var ajax = this.get_post({start:start,limit:6,uid:this.$store.state.session.uid});                
                setTimeout(() => {
                    ajax.then(res=>{
                        if(res.data.length > 0){
                            for (let i = 0; i < res.data.length; i++) {
                                this.postData.push(res.data[i]);
                            };                        
                            this.value.times ++ ;
                            this.value.loading = false;
                        }else {
                            this.value.loading = false;
                            this.value.finished = true;
                        };                            
                    });
                }, 1000); 
            }
    }
}
</script>
