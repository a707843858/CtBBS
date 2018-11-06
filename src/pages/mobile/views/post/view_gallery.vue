<template>
    <div class="gallery_page">
        <div class="introduce mb-3">
            <div class="bd" v-if="value.content"><vue-markdown class="content" :source="value.content"></vue-markdown></div>  
            <div class="post_info">
                <div class="comment">—— <span v-text="postData.comment_count"></span>{{label.comment}}</div>
                <div class="views">{{postData.views}}<span v-text="label.views"></span></div>
                <router-link :to="{name:'category',params:{tab:postData.category}}" v-text="postData.category_title" class="category"></router-link>
            </div>   
        </div>
        <div class="imgList m_card mb-3">
            <div class="hd"><span v-text="label.imgList"></span></div>
            <div class="bd">
                <img :src="item" v-for="(item,index) in imgList" :key="index" class="img">
            </div>
        </div>
        <comment :total="postData.comment_count"></comment>
    </div>

</template>
<script>
import VueMarkdown from 'vue-markdown';
    export default {
        name:'m_post_gallery',
        props:['postData'],
        data(){
            return {
                label:{
                    introduce:'作品简介',
                    imgList:'作品展示',
                    comment:'评论',
                    features:'导读',
                    views:'阅读',
                    hot:'热度',
                },
                value:{
                    content:'',
                },
                imgList:[],
            }
        },
        created(){
            let post = this.get_gallery_post(this.postData.content);
            this.imgList = post[0];
            this.value.content = post[1];
            this.$store.commit('pushPageLoad');
        },
        components:{
            VueMarkdown,
        }
    }
</script>
