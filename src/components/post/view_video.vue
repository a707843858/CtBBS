<template>
    <div class="video_page bbs-max-wrap mx-auto">
        <!--视频区-->
            <el-row  type="flex" class="video_container f-wrap">
                <!--左侧视频框-->
                    <el-col :lg="18" :md="17" :sm="16" class="video_wrap">
                        <vueMarkdown :source="value.video" class="video_ifram"></vueMarkdown>
                    </el-col>
                <!--右侧简介-->
                    <el-col :lg="6" :md="7" :sm="8" class="video_introduce">
                        <div class="descript"><b v-text="label.tit"></b><span v-text="postData.title"></span></div>
                        <div class="descript"><b v-text="label.category"></b><span v-text="postData.category_title"></span></div>
                        <div class="descript"><b v-text="`${label.view} / ${label.hot}`"></b><span v-text="`0 / 0 ℃`"></span></div>
                        <div class="descript"><b v-text="label.publishTime"></b><span v-text="$options.filters.date(postData.publishTime)"></span></div>
                        <div class="descript introduce"><b v-text="label.introduce"></b><span v-html="value.content" class="content"></span></div>
                    </el-col>
            </el-row>
        <!--底部扩展区-->
            <el-row type="flex" class="btm_extend f-wrap">
                <!--左侧评论区-->
                    <el-col :lg="18" :md="17" :sm="16" class="comment_wrap">
                        <!--评论-->
                            <div class="post_comment">
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
                                                <div class="comment_input input-line-animation" id="comment_input" >
                                                    <label>{{label.comment_tip}}</label>
                                                    <textarea name="comment_input" class="el-input__inner" rows="5" v-model="value.comment" @focus="addInputAnimation('comment_input')"  @blur="removeInputAnimation('comment_input')"  style="height:100px !important;"></textarea>
                                                </div>
                                                <div class="btm">
                                                    <el-button  class="update_btn" size="small" @click="updateComment({pid:$route.params.id,comment:value.comment,uid:session.uid,type:'post'})">{{label.update_comment}}</el-button> 
                                                    <div class="clearfix"></div>
                                                </div>
                                            </div>
                                </div>
                            </div> 
                    </el-col>
                <!--右侧边栏-->
                    <el-col :lg="6" :md="7" :sm="8" class="aside">
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
                        <!--分享-->
                            <el-row type="flex" justify="space-between" class="widget_share">
                                <li class="-mob-share-qq"><i class="iconfont icon-web-icon- "></i><span class="hidden-md-only hidden-sm-only">Share</span></li>
                                <li class="-mob-share-weibo"><i class="iconfont icon-weibo "></i><span class="hidden-md-only hidden-sm-only">Share</span></li>
                                <li class="-mob-share-qzone"><i class="iconfont icon-kongjian"></i><span class="hidden-md-only hidden-sm-only">Share</span></li>    
                            </el-row>
                    </el-col>
            </el-row>
    </div>
</template>

<script>
import vueMarkdown from 'vue-markdown';
export default {
    name:'view_video',
    props:['postData','session'],
    data(){
        return{
            label:{
                category:'分类',
                tit:'标题',
                introduce:'简介',
                view:'访问量',
                hot:'热度',
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
            value:{
                video:'',
                content:'',
            },
            pagination:{
                // total: , 用帖子评论数量代替
                current_page:1,
                page_size:10,
            },
            commentData:[],
        }
    },
    created(){
        //过滤文章内容
        let post = this.get_video_post(this.postData.content);
        this.value.video = post[0][0];
        this.value.content = post[1];
        //获取最新帖子
        this.getLatestPost({start:0,limit:4}).then(res=>{this.recentPost = res.data});
    },
    methods:{
        //评论换页 
        pageCurrentChange(val){
            var start = (val - 1)*10;
            this.get_comment_by_pid({pid:this.value.pid,start:start}).then(res=>{this.commentData = res.data});
        }
    },
    components:{
        vueMarkdown,
    }
}
</script>