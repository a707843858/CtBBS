<template>
<el-container>
    <!--顶部-->
        <el-header>
            <common-header></common-header>        
        </el-header>
    <!--主体-->
        <el-main class="post_page post_box">
            <!--Normal-->
                <el-row class="normal bbs-max-wrap mx-auto ">
                    <!--左侧-->
                        <el-col :lg="18" :md="18" class="aside_l">
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
                                <div class="post_comment bg-white">
                                    <div class="hd">
                                        <div class="tip" v-show="pagination.total > 0">{{pagination.total}}&nbsp;{{label.total_comment_count}}</div>
                                            <!--评论列表-->
                                                <li v-for="item in commentData" :key="item.cid" class="item">
                                                    <!--左侧-->
                                                        <div class="avatar">
                                                            <img :src="'/static/img/avatar/'+item.avatar_url" width="40" height="40" :alt="item.nick_name">
                                                        </div>
                                                    <!--右侧-->
                                                        <!--用户名/标签等-->
                                                            <div class="info">    
                                                                <div class="hd">
                                                                        <a href="#" v-text="item.nick_name" class="nick_name"></a>
                                                                        <span class="badge badge-primary">Lv0</span>
                                                                        <!-- <span class="badge badge_floorer">{{label.floorer}}</span> -->
                                                                        <span class="float-right time">{{item.timeLine | date}}</span>
                                                                </div>                                           
                                                                <div class="bd">{{item.content}}</div>
                                                                <!-- <div class="btm" :data-id="item.cid"><i class="fa fa-mail-reply mr-2"></i>{{label.reply}}</div> -->
                                                            </div>
                                                        <div class="clearfix"></div>
                                                </li>
                                                <!--分页符-->
                                                    <div class="post_pagination" v-if="postData.comment_count > 0">
                                                        <el-pagination  @current-change="pageCurrentChange"   :pager-count="7" layout="prev, pager, next" :total="postData.comment_count">
                                                        </el-pagination>
                                                    </div>
                                                <!--评论框-->
                                                <div class="comment_reply">
                                                    <!-- <div>{{value.comment}}</div>
                                                    <div>{{$route.query.id}}</div>
                                                    <div>{{session.uid}}</div> -->
                                                    <div class="comment_input input-line-animation" id="comment_input" >
                                                        <label>{{label.comment_tip}}</label>
                                                        <textarea name="comment_input" class="el-input__inner" rows="5" v-model="value.comment" @focus="addInputAnimation('comment_input')"  @blur="removeInputAnimation('comment_input')"  style="height:100px !important;"></textarea>
                                                    </div>
                                                    <div class="btm">
                                                    <el-button  class="update_btn" size="small" @click="updateComment({pid:$route.query.id,comment:value.comment,uid:session.uid,type:'post'})">{{label.update_comment}}</el-button> 
                                                    <div class="clearfix"></div>
                                                    </div>
                                                </div>
                                        </div>
                                </div> 
                            <!--最近文章-->
                                <div class="latest_post">
                                    <div class="tit"><span>{{label.latest_post}}</span></div>
                                    <el-row class="bd">
                                        <el-col :lg="6" :md="6" :sm="6" :xs="12" class="item" v-for="item in recentPost" :key="item.pid">
                                                <a class="container" :href="`/article?id=${item.pid}`">
                                                    <div class="hd"><img class="thumb" :src="item.thumb"></div>
                                                    <div class="bd">
                                                    <div class="title">{{item.title}}</div>
                                                    <div class="btm">
                                                        <el-button size="small" >{{label.click_to_scan}}</el-button>                          
                                                    </div>
                                    
                                                    </div>

                                                </a>
                                        </el-col>
                                    </el-row>
                                </div>
                            <!---->
                        </el-col>
                    <!--右侧--> 
                        <el-col :lg="6" :md="6" class="aside_r hidden-sm-and-down" id="aside_r">
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
                                    <el-row type="flex" justify="space-between" class="share">
                                        <li class="-mob-share-qq"><i class="iconfont icon-web-icon- "></i><span class="hidden-md-and-down">Share</span></li>
                                        <li class="-mob-share-weibo"><i class="iconfont icon-weibo "></i><span class="hidden-md-and-down">Share</span></li>
                                        <li class="-mob-share-qzone"><i class="iconfont icon-kongjian"></i><span class="hidden-md-and-down">Share</span></li>    
                                    </el-row>

                                </div>
                            <!---->
                        </el-col> 
                </el-row>
        </el-main>
    <!--底部-->
        <el-footer>
            <common-footer></common-footer>         
        </el-footer>
</el-container> 
</template>


<script>
import header from '@/components/common/header';
import footer from '@/components/common/footer';
import VueMarkdown from 'vue-markdown';
    export default {
        name:'post',
        data(){
            return {
                postData:[],
                commentData:[],
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
                    reply:'回复',
                    collect:'收藏',
                    follow:'关注',
                    message:'私信',
                    total_comment_count:'条评论',
                    comment_tip:'* 请留下你观点的同时保持文明.',
                    click_to_scan:'点击查看',
                    recent_post:'最新文章',
                    get_start:'新手入门',
                    hotCategory:'热门栏目',
                    related:'猜你喜欢',
                    hot_post:'热门文章',
                },
                value :{
                    authorId :1 ,
                    comment:'',
                    isLogin:'',
                    pid:0,

                },
                session:[],
                pagination:{
                    total:0,
                    current_page:1,
                    page_size:10,
                },
                recentPost:[],
            }
        },
        created(){            
                var pid = this.$route.query.id;
                this.value.pid = pid;    
                this.get_session().then(res=>{this.session = res.data;});       
                //帖子信息
                this.get_post_by_id(pid).then(res=>{this.postData = res.data[0];this.pagination.total = res.data[0].comment_count;});
                //帖子评论
                this.get_comment_by_pid({pid:pid,start:0}).then(res=>{this.commentData = res.data;});
                //获取最新帖子
                this.getLatestPost({start:0,limit:4}).then(res=>{this.recentPost = res.data});
        },
        methods : {
            //评论换页 
            pageCurrentChange(val){
                var start = (val - 1)*10;
                this.get_comment_by_pid({pid:this.value.pid,start:start}).then(res=>{this.commentData = res.data});
            }
        },
        components:{
            'common-header' : header,
            'common-footer' : footer,
            VueMarkdown,
        },
        watch: {
            '$route' (to, from) {
            this.$router.go(0);
            },

        }
    };
</script>

