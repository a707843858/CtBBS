<template>
    <el-container>
        <!--主体-->
            <el-main class="category_page bbs-max-wrap mx-auto">
                <!--排序导航-->
                    <div class="hd">
                        <div class="tit" v-text="categoryData.title"></div>
                    </div>
                <!--帖子-->
                    <div class="bd bbs-max-wrap mx-auto">
                        <post_sm :postData="postData"></post_sm>
                    </div>
            </el-main>
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
