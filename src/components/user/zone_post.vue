<template>
    <el-row type="flex" class="bd f-wrap zone_post">
        <el-col class="left" :lg="18" :md="18" :sm="18">
            <div class="postLine widget">
                <div class="hd"><h2 class="tit">{{label.postLine}}</h2></div>
                <div class="bd">
                    <div class="item" v-for="(item,index) in postData" :key="index">
                        <i class="iconfont icon-yuandian"></i>
                        <div class="left">
                            <div class="timeLine">{{item.publishTime | formatDate}}</div>
                            <a :href="`/category?tab=${item.catecory}`" class="category">{{item.category_title}}</a>
                        </div>
                        <div class="right">
                            <a :href="`/article?id=${item.pid}`"><h3 class="tit">{{item.title}}</h3></a>
                            <div class="btm">
                                <span>{{label.reply}} {{item.comment_count}} {{label.times}}</span>
                                <span class="float-right">@ {{item.nick_name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="ajax_more"  @click="showMore(value.current_page)">{{label.ajax_more}}<span></span></div>
                </div>
            </div>
        </el-col>
        <el-col class="right" :lg="6" :md="6" :sm="6" id="aside_r">
            <!--个人信息-->
                <div class="widget_user_info widget">
                    <div class="hd"><h2 class="tit">{{label.userInfo}}</h2><a :href="`/author?id=${this.$route.query.id}&tab=info`" class="more">{{label.more}}</a></div>
                    <div class="bd">
                        <div class="nick_name"><i class="iconfont icon-user_1 mr-2"></i>{{userInfo.nick_name}}</div>
                        <div class="city"><i class="iconfont icon-dingwei1 mr-2"></i>{{userInfo.city}}</div>
                        <div class="sign"><i class="iconfont icon-xiaolian mr-2"></i>{{userInfo.sign}}</div>
                    </div>
                </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name:'zone_post',
        props:['userInfo'],
        data(){
            return {
                label:{
                    postLine:'创作历程',
                    reply:'回复',
                    times:'次',
                    more:'更多',
                    ajax_more:'加载更多',
                    userInfo:'个人信息',
                },
                value:{
                    current_page:1,
                },
                postData:[],
            }
        },
        created(){
            this.getLatestPost({start:0,limit:5,uid:this.$route.query.id}).then(res=>{
                this.postData = res.data;
            });
        },
        methods:{
            showMore(c_page){
                let limit = 5;
                let start = c_page * limit;
                this.getLatestPost({start:start,limit:limit,uid:this.$route.query.id}).then(res=>{
                    for(let i = 0;i<5;i++){
                        this.postData.push(res.data[i]);
                    }
                    console.log(res.data);
                    this.value.current_page ++;
                    console.log(this.value.current_page);

                });
            }
        }
    }
</script>
