<template>
<el-container>
    <!--顶部-->
        <common_header></common_header>        
    <!--主体-->
        <el-main class="post_page post_box">
                <post_normal :postData="postData" :session="session" v-if="postData.model == 'normal'"></post_normal>
                <post_gallery :postData="postData" :session="session" v-else-if="postData.model == 'gallery'"></post_gallery>
                <post_video :postData="postData" :session="session" v-else-if="postData.model == 'video'"></post_video>
        </el-main>
    <!--底部-->
        <el-footer>
            <common_footer></common_footer>         
        </el-footer>
</el-container> 
</template>


<script>
import common_header from '@/pages/index/components/header';
import common_footer from '@/pages/index/components/footer';
import post_normal from '@/pages/index/views/post/view_normal';
import post_gallery from '@/pages/index/views/post/view_gallery';
import post_video from '@/pages/index/views/post/view_video';
    export default {
        name:'post',
        props:['id'],
        data(){
            return {
                postData:[],
                session:[],    
            }
        },
        created(){           
                this.get_session().then(res=>{this.session = res.data;});       
                this.get_post({pid:this.$route.params.id}).then(res=>{this.postData = res.data[0]});
        },
        components:{
            common_header,
            common_footer,
            post_normal,
            post_gallery,
            post_video,
        },
        watch: {
            '$route' (to, from) {
            this.$router.go(0);
            },

        }
    };
</script>

