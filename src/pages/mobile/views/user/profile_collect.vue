<template>
<div class="page_wrap">
    <div class="container profile_page bg-white" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load>
        <ct-header :title="label.title" :back="`true`" :hideUser="`true`"></ct-header>
        <div class="collect_wrap">
            <div class="collect_container">
                <van-tabs v-model="value.active" type="card">
                        <van-tab :title="label.post">
                            <van-list v-model="value.loading" :finished="value.postFinished" @load="ajax_post" v-if="postData">
                                <van-cell class="item" v-for="item in postData" :key="item.pid"  :to="{name:'article',params:{id:item.pid}}" is-link>
                                    <i class="iconfont icon-collection-b"></i><span v-text="item.title"></span>    
                                </van-cell>                                
                            </van-list>
                            <div class="empty_tip" v-else><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div>
                        </van-tab>
                        <van-tab :title="label.category">
                            <van-list v-model="value.loading" :finished="value.categoryFinished" @load="ajax_category" v-if="categoryData">
                                <van-cell class="item" v-for="item in categoryData" :key="item.fid"  :to="{name:'category',params:{id:item.fid}}" is-link>
                                    <i class="iconfont icon-collection-b"></i><span v-text="item.title"></span>    
                                </van-cell>                                
                            </van-list>
                            <div class="empty_tip" v-else><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div>
                        </van-tab>
                </van-tabs>
            </div>
        </div>        
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
                title:'私人收藏',
            },
            value:{
                loading:false,
                postPage:0,
                postFinished:false,
                categoryPage:0,
                categoryFinished:false,
                active:0,
            },
            postData:[],
            categoryData:[],
            userInfo:[],
            session:[],
        }
    },
    created(){
        // this.update_collect({uid:1,type:'post',id:'9'}).then(res=>{console.log(res.data)});
        // this.$store.commit('setPageLoad',3);
        this.get_session().then((res)=>{this.session = res.data;this.$store.commit('pushPageLoad');});
        this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0];this.$store.commit('pushPageLoad');});
    },
    methods:{
        ajax_post(){
            let _this = this ;
            setTimeout(()=>{
                this.get_collect({uid:1,type:'post',start:this.value.postPage * 10,limit:10}).then(res=>{
                    if(!this.isEmpty(res.data)){
                        for(let i = 0;i<res.data.length;i++){
                            this.postData.push(res.data[i]);
                        }
                        this.value.postPage++;
                        this.value.loading = false;
                    }else {
                        this.value.loading = false;
                        this.value.postFinished = true ;
                        this.isEmpty(this.postData) ? this.postData = undefined : '';
                    }
                    this.$store.commit('pushPageLoad');
                });
            },1500);
        },
        ajax_category(){
            let _this = this,ajax;
            setTimeout(()=>{
               this.get_collect({uid:1,type:'category',start:this.value.categoryPage * 10,limit:10}).then(res=>{
                    console.log(res.data);
                    if(!this.isEmpty(res.data)){
                        for(let i = 0;i<res.data.length;i++){
                            this.categoryData.push(res.data[i]);
                        }
                        this.value.categoryPage ++ ;
                        this.value.loading = false;
                    }else {
                        this.value.loading = false;
                        this.value.categoryFinished = true ;
                        this.isEmpty(this.categoryData) ? this.categoryData = undefined : '';
                    }
                    this.$store.commit('pushPageLoad');
                });
            },1500);
        },
    }
}
</script>
