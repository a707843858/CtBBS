<template>
<div class="page_wrap">
    <div class="container category_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load> 
        <ct-header :tab="value.tab" :title="categoryData.title" ></ct-header>
        <div class="category_header">
                <div class="category_info ct-row">
                    <div class="category_icon ct-col"><img :src="categoryData.icon" :alt="categoryData.title"></div>
                    <div class="category_middle ct-col">
                        <div class="category_title" v-text="categoryData.title"></div>
                        <div class="category_introduce">暂无介绍.....</div>
                    </div>
                    <div class="category_control ct-col">
                        <van-button size="small" class="category_follow"  @click="update_collect({uid:0,id:$route.params.tab,type:'category'})" v-if="$route.params.tab > 0">
                            <i class="iconfont icon-jia"></i><span v-text="label.follow" style="vertical-align:top;padding-left:5px;"></span>
                        </van-button>
                    </div>
                </div>
        </div>
        <van-list v-model="value.loading" :finished="value.finished" @load="ajax_post()" class="bd">
            <ct-post-md :data="postData" :finished="value.finished"></ct-post-md>
        </van-list>
        <ct-category-list :data="categoryList"></ct-category-list>
    </div>  
<ct-aside></ct-aside>  
</div>

</template>

<script>
    export default {
        name:'m_category',
        data(){
            return {
                label:{
                    all:'全部',
                    byComment:'评论最多',
                    byViews:'浏览最多',
                    all_category:'全部版块',
                    end:'到底啦',
                    follow:'关注',
                },
                value:{
                    tab:'category', 
                    loading:false,  
                    finished:false,
                    times:0,                 
                },
                categoryList:[],
                categoryData:{
                    icon:'/static/img/other/category_default.gif',
                },
                postData:[],
            }
        },
        created(){
            this.$store.commit('setPageLoad',2);
            this.get_category().then(res=>{this.categoryList  = res.data;this.$store.commit('pushPageLoad')});
        },
        methods:{
            ajax_post(){
                let tab = this.$route.params.tab;
                let limit = 6;
                let start = this.value.times * limit;
                var ajax ;
                let self = this ;
                function post_all(){
                    return self.get_post({start:start,limit:6});
                }
                function post_by_comment(){
                    return self.get_post({start:start,limit:limit,sort:'desc',sorBy:'comment_count'});
                }
                function post_by_category(){
                    return self.get_post({category:tab,start:start,limit:limit});
                }
                if(tab == 'all'){
                    this.categoryData.title = this.label.all;
                    ajax = post_all();
                }else if(tab == 'comment'){
                    this.categoryData.title = this.label.byComment;
                    ajax = post_by_comment();

                }else {
                    this.get_category({id:tab}).then(res=>{this.categoryData  = res.data[0];});  
                    ajax = post_by_category();
                }
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
                        this.$store.commit('pushPageLoad');//2                       
                    });
                
            },
        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            },
        },
    }
</script>
