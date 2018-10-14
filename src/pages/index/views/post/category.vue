<template>
    <el-container>
        <!--顶部-->
            <common_header></common_header>
        <!--主体-->
            <el-main class="category_page bbs-max-wrap mx-auto">
                <!--排序导航-->
                    <div class="hd">
                        <div class="tit" v-text="categoryData.title"></div>
                    </div>
                <!--帖子-->
                    <div class="bd">
                        <el-row type="flex" class="f-wrap bd  post_sm_item">
                            <div class="container">
                                <el-col v-for="item in postData" :key="item.pid" class="item" >
                                    <div class="opacity-1 rotateBox"></div>
                                    <router-link :to="{name:'article',params:{id:item.pid}}" class="hd">
                                        <img :src="item.thumb" alt="" class="img">  
                                    </router-link>
                                    <div class="bd hidden-xs-only">
                                        <div class="avatar">
                                            <router-link :to="{name:'author',params:{id:item.author}}">
                                                <img :src="`/static/img/avatar/${item.avatar_url}`" alt="" width="33" height="33" class="float-left">
                                            </router-link>
                                        </div>
                                        <div class="info">
                                            <p class="tit"><router-link :to="{name:'article',params:{id:item.pid}}" v-text="item.title"></router-link></p>
                                            <div class="btm">
                                                <div class="author"><router-link :to="{name:'author',params:{id:item.uid}}" ><span v-text="item.nick_name"></span></router-link></div>
                                            </div>
                                        </div>
                                        <!-- <div class="comment float-right"><i class="fa fa-comment-o mr-2"></i><span>{{item.comment}}</span></div> -->
                                    </div>
                                </el-col>                    
                            </div>
                        </el-row>
                    </div>
            </el-main>
        <!--底部-->
            <el-footer>
                <common_footer></common_footer>
            </el-footer>
    </el-container>
</template>

<script>
import common_header from '@/pages/index/components/header.vue';
import common_footer from '@/pages/index/components/footer.vue';
// import WOW from 'wowjs';
export default {
        name:'forum',
        data(){
            return{
                label:{
                    all:'全部',
                    byComment:'评论最多',
                },
                value:{
                    recommed_show:false,
                    current_page:1,
                },
                categoryData:[],
                postData:[],
                logoo:'1',
            }
        },
        created(){
            let self =  this ;
            let tab = this.$route.params.tab;     
            //获取文章内容  
            if(tab.length > 0){
                var params ;
                switch(tab){
                    case 'all':
                        this.categoryData.title = this.label.all;
                        params = {start:0,limit:15,sort:'desc',sortBy:'publishTime'};
                        break;
                    case 'comment':
                        this.categoryData.title = this.label.byComment;
                        params = {start:0,limit:15,sort:'desc',sortBy:'comment_count'};
                        break;
                    default:
                        this.get_category({id:tab}).then(res=>{this.categoryData  = res.data[0];});
                        params = {id:tab,start:0,limit:15};

                }
                this.get_post({params}).then((res)=>{this.postData = res.data;});
            } 
                  
        },
        components:{
            common_header,
            common_footer,
        },
        watch: {
            '$route' (to, from) {
            this.$router.go(0);
            },
        }
};

</script>
