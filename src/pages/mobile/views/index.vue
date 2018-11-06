<template>
<div class="page_wrap">   
    <div class="container home_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-header :tab="tab" :title="blog_name"></ct-header>
            <ct-page-load></ct-page-load> 
            <ct-swipe :data="carousel_options" :autoplay="4000" :height="220" class="mb-3"></ct-swipe>
            <ct-grid-view :span="6" :data="categoryData" class="mb-3">0</ct-grid-view>
            <ct-post-xs :title="label.news" :link="value.news_link" :data="homeAside" class="mb-3"></ct-post-xs>
            <div class="ct-post-tab ">
                <div class="hd">
                        <span v-text="label.all" :class="{'active':value.post_tab == 'all'}" @click="chageTab('all')"></span>
                        <span v-text="label.hot" :class="{'active':value.post_tab == 'hot'}" @click="chageTab('hot')"></span>
                </div>
                <div class="bd">
                    <van-list v-model="value.loading" :finished="value.finished" @load="ajax_post">
                        <ct-post-sm :data="postData" :finished="value.finished"></ct-post-sm>
                    </van-list>
                </div>
            </div>
    </div>  
    <ct-aside></ct-aside>       
</div>

</template>


<script>
    export default {
        name:'m_home',
        data(){
            return {
                label:{
                    news:'设计头条',
                    all:'全部',
                    hot:'热门',
                },
                value:{
                    news_link:{name:'category',params:{tab:'all'}},
                    leftAside:false,
                    rightAside:false,
                    loginAside:false,
                    post_tab:'all',
                    loading:false,
                    finished:false,
                    times:0,
                },
                blog_name:'',
                tab:'home',
                categoryData:[],
                carousel_options:[],
                homeAside:[],
                postData:[],
                category_data:[],
            }
        },
        created(){
            this.$store.commit('setPageLoad',4);//设置请求个数
            this.get_blog_meta({meta:'blog_name'}).then(res=>{this.blog_name = res.data[0].meta_value;this.$store.commit('pushPageLoad');});
            this.get_category({start:0,limit:8}).then(res=>{this.categoryData  = res.data;this.$store.commit('pushPageLoad')});
            this.get_carousel({type:'home'}).then((res)=>{this.carousel_options = res.data;this.$store.commit('pushPageLoad')});
            this.get_carousel({type:'home_aside'}).then((res)=>{this.homeAside = res.data;this.$store.commit('pushPageLoad')});
        },
        methods:{
            chageTab(tab){
                if(tab != this.value.post_tab){
                    this.value.post_tab = tab;
                    this.value.finish = false;
                    this.value.times = 0 ;
                    this.postData = [];
                    this.ajax_post();
                }else{
                    return;
                }
            },
            ajax_post() {
                let tab = this.value.post_tab;
                let start = this.value.times * 6 ;
                let self = this;
                var ajax ;                
                function post_all (){
                    return self.get_post({start:start,limit:6});
                }
                function post_hot(){
                    return self.get_post({start:start,limit:6,sort:'desc',sortBy:'comment_count'});
                }
                if(tab == 'all'){
                    ajax = post_all() ;
                }else if(tab == 'hot'){
                    ajax = post_hot() ;
                }
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
        },
    }
</script>   


<style>
</style>
