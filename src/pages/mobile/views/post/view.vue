<template>
    <div class="container post_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
            <m_header :back="`true`" :title="postData.title"></m_header>
            <div class="post_author">
                <div class="avatar"><img :src="`/static/img/avatar/${postData.avatar_url}`" :alt="postData.nick_name"></div>
                <div class="info">
                    <div class="nick_name" v-text="postData.nick_name"></div>
                    <div class="timeLine">{{postData.publishTime | date}}</div>
                </div>
                <div class="control">
                    <router-link :to="{name:'author',params:{id:postData.author,tab:'home'}}" >{{label.scan_home}}</router-link>
                </div>
            </div>
            <post_normal :postData="postData"  v-if="postData.model == 'normal'"></post_normal>
            <post_gallery :postData="postData"  v-else-if="postData.model == 'gallery'"></post_gallery>
            <post_video :postData="postData"  v-else-if="postData.model == 'video'"></post_video>
            <comment :total="postData.comment_count"></comment>
    </div>
</template>

<script>
import m_header from '@/pages/mobile/components/header'
import post_normal from '@/pages/mobile/views/post/view_normal'
import post_gallery from '@/pages/mobile/views/post/view_gallery'
import post_video from '@/pages/mobile/views/post/view_video'
import comment from '@/pages/mobile/components/comment'
    export default {
        name:'m_post',
        data(){
            return {
                label:{
                    scan_home:'查看主页',                    
                },
                value:{
                    tab:'post',
                    title:'详情',
                },
                postData:{author:0,},
            }
        },
        created(){
            this.get_post_by_id(this.$route.params.id).then(res=>{this.postData = res.data[0];});
        },
        components:{
            m_header,
            post_normal,
            post_gallery,
            post_video,
            comment,
        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            },
        },
    }
</script>
