<template>
    <div class="home_page"> 
        <div class="container" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
            <m_header :tab="tab" :title="blog_name" ></m_header>
            <van-swipe  :autoplay="4000" class="home_swipe">
                <van-swipe-item v-for="item in carousel_options" :key="item.id" class="item">
                    <router-link :to="item.link">
                        <img :src="item.url" class="img">
                        <div class="tit" v-text="item.title"></div>
                    </router-link>
                </van-swipe-item>
            </van-swipe>  
            <van-row type="flex" class="home_category f-wrap">
                <van-col span="6" v-for="item in category_data" :key="item.id" class="item" >
                    <router-link :to="{name:'category',params:{tab:'all'}}">
                        <div class="logo"><img src="/static/img/other/category_default.gif" alt="" class="img"></div>
                        <div class="tit" v-text="item.title"></div>
                    </router-link>
                </van-col>
            </van-row>
            <div class="home_news  m_card">
                <div class="hd">
                    <span v-text="label.news"></span>
                    <router-link :to="{name:'category',params:{tab:'all'}}">
                        <i class="iconfont icon-gengduo float-right"></i>
                    </router-link> 
                </div>
                <van-row type="flex" class="bd f-wrap" >
                    <van-col :span="12" v-for="item in homeAside" :key="item.id" class="item">
                        <router-link :to="item.link"  >
                            <img :src="item.url" alt="item.title" class="img">
                            <div class="tit" v-text="item.title"></div>    
                        </router-link>
                    </van-col>                    
                </van-row>
            </div>
            <div class="postCard_m">
                <div class="hd">
                    <span v-text="label.all" :class="{'active':value.post_tab == 'all'}" @click="chageTab('all')"></span>
                    <span v-text="label.hot" :class="{'active':value.post_tab == 'hot'}" @click="chageTab('hot')"></span>
                </div>
                <div class="bd">
                    <van-list v-model="value.loading" :finished="value.finished" @load="ajax_post">
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
        </div>
        <m_aside ></m_aside>     
    </div>
</template>


<script>
import m_header from '@/pages/mobile/components/header'
import m_aside from '@/pages/mobile/components/aside'
    export default {
        name:'m_home',
        data(){
            return {
                label:{
                    news:'设计头条',
                    all:'全部',
                    hot:'热门',
                    end:'到底啦',
                },
                value:{
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
                session:[],
                homeAside:[],
                postData:[],
                //示例
                category_data:[
                    {title:'美图欣赏'},
                    {title:'CG教程'},
                    {title:'游戏原画细分库'},
                    {title:'原画设计'},
                    {title:'插画设计'},
                    {title:'传统美术'},
                    {title:'插件下载'},
                    {title:'设计基础'},
                ],
            }
        },
        created(){
            this.get_blog_meta('blog_name').then(res=>this.blog_name = res.data[0].meta_value);
            this.get_category_all().then(res=>{this.categoryData  = res.data;});
            this.get_carousel_list('home').then((res)=>{this.carousel_options = res.data});
            this.get_carousel_list('home_aside').then((res)=>{this.homeAside = res.data});
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
                    return self.getLatestPost({start:start,limit:6});
                }
                function post_hot(){
                    return self.getPostOrderByComment({start:start,limit:6,sort:'desc'});
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
        components:{
            m_header,
            m_aside,
        }
    }
</script>   
