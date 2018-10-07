<template>
    <el-row type="flex" class="bd f-wrap zone_home">
        <el-col class="left" :lg="18" :md="18" :sm="18">
            <!--帖子层-->
                <div class="post">
                    <div class="hd">
                        <h2>{{label.representative}}</h2>
                        <a :href="`/author?id=${this.$route.query.id}&tab=post`" class="more">{{label.more}}</a>
                    </div>
                    <div class="bd post_sm_item">
                        <div class="container">
                            <el-col v-for="item in postData" :key="item.pid" :lg="6" :md="6" :sm="6" :xs="12" class="item">
                                <a :href="`/article?id=${item.pid}`"  class="hd"><img :src="`${item.thumb}`" alt="" class="img"></a>
                                <div class="bd hidden-xs-only">
                                    <div class="avatar">
                                        <a :href="`/author?id=${item.author}&tab=home`"><img :src="`/static/img/avatar/${item.avatar_url}`" alt="" width="33px" height="33px" class="float-left"></a>
                                    </div>
                                    <div class="info">
                                        <div class="tit"><a  :href="`/article?id=${item.pid}`" >{{item.title}}</a></div>
                                        <div class="btm">
                                            <div class="author">
                                                <a :href="`/author?id=${item.author}&tab=home`">{{item.nick_name}}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                    </div>
                </div>
        </el-col>
        <el-col class="right" id="aside_r" :lg="6" :md="6" :sm="6">
            <!--个人信息-->
                <div class="widget_user_info widget">
                    <div class="hd"><h2 class="tit">{{label.userInfo}}</h2><a :href="`/author?id=${this.$route.query.id}&tab=info`" class="more">{{label.more}}</a></div>
                    <div class="bd">
                        <div class="nick_name"><i class="iconfont icon-user_1 mr-2"></i>{{userInfo.nick_name}}</div>
                        <div class="city"><i class="iconfont icon-dingwei1 mr-2"></i>{{userInfo.city | showNone }}</div>
                        <div class="sign"><i class="iconfont icon-xiaolian mr-2"></i>{{userInfo.sign | isSign }}</div>
                    </div>
                </div>
            <!--TA的粉丝-->
                <div class="widget widget_fans">
                    <div class="hd"><h2 class="tit">{{label.fans}}</h2></div>
                    <div class="bd text-center">
                        暂无粉丝
                    </div>
                </div>
            <!---->
        </el-col>
    </el-row>
</template>

<script>
export default {
    name:'zone_home',
    props:['userInfo'],
    data(){
        return {
            postData:[],
            label:{
                representative:'代表作',
                more:'更多',
                userInfo:'个人信息',
                fans:'粉丝团',
            },
        }
    },
    created(){
        this.getPostOrderByComment(0,8,'desc',this.$route.query.id).then(res=>{this.postData = res.data});
    },
    methods:{

    }
}
</script>
