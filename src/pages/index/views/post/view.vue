<template>
<el-container>     
    <el-main class="post_page post_box">
            <post_normal :postData="postData" :session="session" v-if="postData.model == 'normal'"></post_normal>
            <post_gallery :postData="postData" :session="session" v-else-if="postData.model == 'gallery'"></post_gallery>
            <post_video :postData="postData" :session="session" v-else-if="postData.model == 'video'"></post_video>
    </el-main>
</el-container> 
</template>


<script>
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
            post_normal,
            post_gallery,
            post_video,
        },
    };
</script>

