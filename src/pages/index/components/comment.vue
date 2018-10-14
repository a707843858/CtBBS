<template>
    <div class="post_comment">
        <div class="hd">
            <div class="tip" v-show="total > 0">{{total}}&nbsp;{{label.total_comment_count}}</div>
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
                                        <span class="float-right time">{{item.pubdate | date}}</span>
                                </div>                                           
                                <div class="bd">{{item.content}}</div>
                                <!-- <div class="btm" :data-id="item.cid"><i class="fa fa-mail-reply mr-2"></i>{{label.reply}}</div> -->
                            </div>
                            <div class="clearfix"></div>
                </li>
            <!--分页符-->
                    <div class="post_pagination" v-if="total > 0">
                        <el-pagination  @current-change="pageCurrentChange"   :pager-count="7" layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
            <!--评论框-->
                    <div class="comment_reply">
                        <div class="comment_input input-line-animation" id="comment_input" >
                            <label>{{label.comment_tip}}</label>
                            <textarea name="comment_input" class="el-input__inner" rows="5" v-model="value.comment" @focus="addInputAnimation('comment_input')"  @blur="removeInputAnimation('comment_input')"  style="height:100px !important;"></textarea>
                        </div>
                            <div class="btm">
                                <el-button  class="update_btn" size="small" @click="update_comment({pid:$route.params.id,comment:value.comment,type:'post'})">{{label.update_comment}}</el-button> 
                                <div class="clearfix"></div>
                            </div>
                    </div>
        </div>
    </div> 
</template>

<script>
export default {
    name:'comemnt',
    props:['total','session'],
    data(){
        return {
            label:{
                total_comment_count:'条评论',
                comment_tip:'* 请留下你观点的同时保持文明.',
                update_comment:'提交评论',
            },                
            value :{
                pid:0,
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
        var pid = this.$route.params.id;
        this.value.pid = pid; 
        this.get_comment({pid:pid,start:0,limit:10}).then(res=>{this.commentData = res.data;});
    },
    methods:{
        //评论换页 
        pageCurrentChange(val){
            var start = (val - 1)*10;
            this.get_comment({pid:this.value.pid,start:start}).then(res=>{this.commentData = res.data});
        }
    },
}
</script>

