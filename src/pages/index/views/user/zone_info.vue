<template>
    <el-row class="w-rap bd zone_info" type="flex">
        <el-col class="left" :lg="18" :md="18" :sm="18">
            <div class="info widget">
                <div class="hd"><h2 class="tit">{{label.userInfo}}</h2></div>
                <div class="bd d-flex f-wrap">
                    <el-col class="item" :lg="12" :md="12">{{label.nick_name}}<span>{{userInfo.nick_name}}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">UID<span>{{userInfo.id}}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.sex}}<span>{{userInfo.sex | showNone | sex }}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.birthday}}</el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.city}}<span>{{userInfo.city | showNone }}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.job}}<span>{{userInfo.job | showNone }}</span></el-col>
                </div>
                <div class="bd d-flex f-wrap" >
                    <el-col class="item" :lg="12" :md="12">QQ<span>{{userInfo.qq | showNone}}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.wechat}}<span>{{userInfo.wechat | showNone}}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.weibo}}<span>{{userInfo.weibo | showNone}}</span></el-col>
                    <el-col class="item" :lg="12" :md="12">{{label.github}}<span>{{userInfo.github | showNone}}</span></el-col>
                </div>
            </div>
        </el-col>
        <el-col class="right hidden-xs-only" :lg="6" :md="6" :sm="6">
            <!--留言板-->
                <div class="widget_comment widget">
                    <div class="hd"><h2 class="tit">{{label.comment}}</h2><a :href="`/author?id=${this.$route.query.id}&tab=info`" class="more">{{label.more}}</a></div>
                    <div class="bd">
                        <el-input type="textarea" v-model="value.comment"></el-input>
                        <div class="comment_btn">
                            <el-button size="small" v-text="label.reply" class="comment_reply" @click="update_comment({puid:userInfo.uid,comment:value.comment,type:'zone'})"></el-button>
                        </div>
                        <div class="comment_list" v-if="commentData != ''">
                            <li v-for="item in commentData" :key="item.cid" class="item">
                                <div class="avatar"><img :src="`/static/img/avatar/${item.avatar_url}`" alt="" width="30" height="30" class="img"></div>
                                <div class="content">
                                    {{item.content}}
                                    <div class="time"><span>@{{item.nick_name}} / </span>{{item.timeLine | date}}</div>
                                </div>
                            </li>
                        </div>
                        <div class="comment_list text-center" v-else>
                            <li >{{label.empty_comment}}</li>
                        </div>
                    </div>
                </div>
        </el-col>
    </el-row> 
</template>

<script>
    export default {
        name:'zone_info',
        props:['userInfo'],
        data(){
            return {
                label:{
                    userInfo:'个人信息',
                    nick_name:'用户名',
                    sex:'性别',
                    birthday:'生日',
                    city:'城市',
                    job:'工作',
                    social:'社交信息',
                    wechat:'微信',
                    weibo:'微博',
                    github:'Github',
                    comment:'留言板',
                    reply:'留言',
                    empty_comment:'暂无留言',
                },
                value:{
                    comment:'',
                },
                commentData:[],
            }
        },
        created(){
            this.get_comment({puid:this.$route.params.id,start:0}).then((res)=>{this.commentData  = res.data;});
        },
        methods:{

        }
    }
</script>
