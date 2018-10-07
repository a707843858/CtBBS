<template>
    <div class="category_page">
        <div class="container" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
            <m_header :tab="value.tab" :title="categoryData.title" ></m_header>
            <div class="m_category m_card">
                <div class="hd">
                    <span v-text="label.all_category"></span>
                    <!-- <i class="iconfont icon-jiantou-shang float-right"></i> -->
                </div>
                <div class="bd">
                    <router-link :to="{name:'category',params:{tab:'all'}}" v-text="label.all"></router-link>
                    <router-link :to="{name:'category',params:{tab:item.id}}" v-for="item in categoryList" :key="item.id" v-text="item.title"></router-link>
                </div>
            </div>
            <div class="m_category_post postCard_m m_card">
                <div class="hd">
                    <span v-text="label.category_post"></span>
                </div>
                <!-- <div>{{postData}}</div> -->
                <van-list v-model="value.loading" :finished="value.finished" @load="ajax_post()" class="bd">
                    <router-link :to="{name:'article',params:{id:item.pid}}" class="item" v-for="item in postData" :key="item.pid">
                        <van-row type="flex" >
                            <van-col :span="7" class="thumb"><img :src="item.thumb" alt="item.title"></van-col>
                            <van-col :span="17" class="info">
                                <h3 class="tit" v-text="item.title"></h3>
                                <div class="author">
                                    <div class="nick_name">@ <span v-text="item.nick_name"></span></div>
                                    <div class="comment"><i class="iconfont icon-comment mr-1"></i><span v-text="item.comment_count"></span></div>
                                </div>
                            </van-col>
                        </van-row>                            
                    </router-link>
                    <div class="end_tip" v-show="value.finished == true"><span v-text="label.end"></span><i class="iconfont icon-qianting"></i></div>
                </van-list>
            </div>
        </div>
        <m_aside></m_aside>
    </div>
</template>

<script>
import m_header from '@/pages/mobile/components/header'
import m_aside from '@/pages/mobile/components/aside'
    export default {
        name:'m_category',
        data(){
            return {
                label:{
                    all:'全部',
                    byComment:'评论最多',
                    all_category:'全部版块',
                    category_post:'版下速递',
                    end:'到底啦',
                },
                value:{
                    tab:'category', 
                    loading:false,  
                    finished:false,
                    times:0,                 
                },
                categoryList:[],
                categoryData:[],
                postData:[],
            }
        },
        created(){
            this.get_category_all().then(res=>{this.categoryList  = res.data;});
        },
        methods:{
            ajax_post(){
                let tab = this.$route.params.tab;
                let limit = 6;
                let start = this.value.times * limit;
                var ajax ;
                let self = this ;
                function post_all(){
                    return self.getLatestPost({start:start,limit:6});
                }
                function post_by_comment(){
                    return self.getPostOrderByComment({start:start,limit:limit,sort:'desc'});
                }
                function post_by_category(){
                    return self.getPostByCategory({id:tab,start:start,limit:limit});
                }
                if(tab == 'all'){
                    this.categoryData.title = this.label.all;
                    ajax = post_all();
                }else if(tab == 'comment'){
                    this.categoryData.title = this.label.byComment;
                    ajax = post_by_comment();

                }else {
                    this.get_category_meta({id:tab}).then(res=>{this.categoryData  = res.data[0];});  
                    ajax = post_by_category();
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
        components:{
            m_header,
            m_aside,
        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            },
        },
    }
</script>
