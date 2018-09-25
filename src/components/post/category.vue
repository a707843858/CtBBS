<template>
    <el-container>
        <!--顶部-->
            <el-header>
                <common_header></common_header>
            </el-header>
        <!--主体-->
            <el-main class="category_page bbs-max-wrap mx-auto">
                <!--排序导航-->
                    <div class="hd">
                        <div class="tit" v-text="categoryData.title"></div>
                        <!-- <div class="orderBar bbs-max-wrap mx-auto">
                            <div class="category">
                                <router-link :to="{path:'/category',query:{tab:'all'}}"  :class="[$route.query.tab == 'all' ? 'active':'']">{{label.all}}</router-link>
                                <router-link :to="{path:'/category',query:{tab:item.id}}" v-for="item in categoryData" :class="[$route.query.tab == item.id ?'active':'']" :key="item.id">{{item.title}}</router-link>
                            </div>
                            <div class="recommend">
                                <a href="/category?tab=comment" :class="[$route.query.tab == 'comment' ?'active':'']">{{label.byComment}}</a>
                            </div>
                        </div> -->
                    </div>
                <!--帖子-->
                    <div class="bd">
                        <el-row type="flex" class="f-wrap bd  post_sm_item">
                            <div class="container">
                                <el-col v-for="item in postData" :key="item.pid" class="item" >
                                    <div class="opacity-1 rotateBox"></div>
                                    <a :href="`/article?id=${item.pid}`" class="hd">
                                        <img :src="item.thumb" alt="" class="img">  
                                    </a>
                                    <div class="bd hidden-xs-only">
                                        <div class="avatar"><a :href="`/author=${item.authorId}`"><img :src="`/static/img/avatar/${item.avatar_url}`" alt="" width="33" height="33" class="float-left"></a></div>
                                        <div class="info">
                                            <p class="tit"><a :href="`/article?id=${item.pid}`">{{item.title}}</a></p>
                                            <div class="btm">
                                                <div class="author"><a :href="`/author=${item.uid}`">{{item.nick_name}}</a></div>
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
import common_header from '@/components/common/header';
import common_footer from '@/components/common/footer';
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
            let tab = this.$route.query.tab;
            //获取分类信息
            if(tab == 'all'){
                this.categoryData.title = this.label.all;
            }else if(tab == 'comment'){
                this.categoryData.title = this.label.byComment;
            }else{
                this.get_category_meta({id:tab}).then(function(res){this.categoryData  = res.data[0];});  
            }       
            //获取文章内容  
            if(tab.length > 0){
                switch(tab){
                    case 'all':
                        this.getLatestPost({start:0,limit:15}).then((res)=>{this.postData = res.data});
                        break;
                    case 'comment':
                        this.getPostOrderByComment(0,15,'desc').then((res)=>{
                            this.postData = res.data;
                        });
                        break;
                    default:
                        this.getPostByCategory(tab,0,15).then((res)=>{this.postData = res.data});
                }
            } 
                  
        },
        methods:{
            
        },
        components:{
            common_header,
            common_footer,
        },
        mounted(){
            
        }

};

</script>
