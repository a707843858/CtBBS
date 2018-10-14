<template>
    <el-row class="normal_page btm_extend bbs-max-wrap mx-auto ">
        <!--左侧-->
            <el-col :lg="18" :md="18" class="comment_wrap">
                <!--文章部分-->
                    <div class="post bg-white">
                        <div class="tit">{{postData.title}}</div>
                        <div class="info d-none">
                            <div class="category">{{postData.category_title}}</div>
                                <div class="timeline d-inline-block "><span class="mr-2">|</span>{{label.publishTime}}：{{postData.publishTime | date }}</div>
                            </div>
                            <vue-markdown v-highlight :source="postData.content" class="content"></vue-markdown>
                    </div>
                <!--评论-->
                    <comment :total='postData.comment_count' :session="session"></comment>
                <!--最近文章-->
                    <div class="latest_post">
                        <div class="tit"><span>{{label.latest_post}}</span></div>
                        <el-row type="flex" class="bd f-wrap">
                            <el-col :lg="6" :md="6" :sm="6" :xs="12" class="item" v-for="item in recentPost" :key="item.pid">
                                <router-link :to="{path:'/article',params:{id:item.pid}}" class="container">
                                    <div class="hd"><img class="thumb" :src="item.thumb"></div>
                                    <div class="bd">
                                        <div class="title">{{item.title}}</div>
                                        <div class="btm">
                                            <el-button size="small" >{{label.click_to_scan}}</el-button>                          
                                        </div>
                                    </div>                               
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                <!---->
            </el-col>
        <!--右侧--> 
            <el-col :lg="6" :md="6" class="aside" id="aside_r">
            <!--作者信息-->
                <div class="widget_author">
                    <div class="avatar float-left"><img :src="`/static/img/avatar/${postData.avatar_url}`" alt="" width="90px" height="90px"></div>
                    <div class="container">                  
                        <div class="nick_name item"><i class="iconfont icon-user"></i><span>{{postData.nick_name}}</span></div>
                        <div class="city item"><i class="iconfont icon-dingwei"></i>{{postData.city | showNone}}</div>
                        <div class=" mt-3" @click="develope()" ><span class="follow"><i class="iconfont icon-attend mr-2"></i>{{label.follow}}</span></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            <!--文章信息-->
                <div class="widget_post">
                    <div type="flex" justify="space-between" class="post_info">
                        <li><i class="iconfont icon-redupaixu"></i>0°</li>
                        <li><i class="iconfont icon-liulan"></i>0</li>
                        <li><i class="iconfont icon-biaoqian"></i>{{postData.category_title}}</li>
                        <li><i class="iconfont icon-shijian"></i>{{postData.publishTime | date }}</li>
                    </div>
                    <el-row type="flex" justify="space-between" class="widget_share">
                        <li class="-mob-share-qq"><i class="iconfont icon-web-icon- "></i><span class="hidden-md-and-down">Share</span></li>
                        <li class="-mob-share-weibo"><i class="iconfont icon-weibo "></i><span class="hidden-md-and-down">Share</span></li>
                        <li class="-mob-share-qzone"><i class="iconfont icon-kongjian"></i><span class="hidden-md-and-down">Share</span></li>    
                    </el-row>
                </div>
            <!--Add YOur Code-->
            </el-col> 
    </el-row>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import comment from '@/pages/index/components/comment.vue'
    export default {
        name:'view_normal',
        props:['postData','session'],
        data(){
            return {
                label : {
                    latest_post:'最新文章',
                    publishTime:'发布时间',
                    like_tip:'为TA点赞',
                    author:'作者',
                    fans:'粉丝',
                    dynamic:'动态',
                    sex:'性别',
                    update_comment:'提交评论',
                    floorer:'楼主',
                    like:'Like',
                    collect:'收藏',
                    follow:'关注',
                    message:'私信',
                    click_to_scan:'点击查看',
                    recent_post:'最新文章',
                    get_start:'新手入门',
                    hotCategory:'热门栏目',
                    related:'猜你喜欢',
                    hot_post:'热门文章',
                },
                recentPost:[],
            }
        },
        created(){ 
            //获取最新帖子
            this.get_post({start:0,limit:4}).then(res=>{this.recentPost = res.data});
        },
        components:{
            VueMarkdown,
            comment,
        }
    }
</script>