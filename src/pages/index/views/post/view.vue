<template>
<el-container>
    <!--顶部-->
        <el-header>
            <common_header></common_header>        
        </el-header>
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
import common_header from '@/components/common/header';
import common_footer from '@/components/common/footer';
import post_normal from '@/components/post/view_normal';
import post_gallery from '@/components/post/view_gallery';
import post_video from '@/components/post/view_video';
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
                var pid = this.$route.params.id;
                this.get_session().then(res=>{this.session = res.data;});       
                this.get_post_by_id(pid).then(res=>{this.postData = res.data[0];});
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

