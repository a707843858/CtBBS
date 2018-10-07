<template>
    <div class="normal_page">
        <div class="post_box">
            <!-- <div class="tit"><h2 v-text="postData.title"></h2></div> -->
            <div class="post_info">
                <div class="comment"><span v-text="postData.comment_count"></span>{{label.comment}}</div>
                <div class="views">{{postData.views}}<span v-text="label.views"></span></div>
                <router-link :to="{name:'category',params:{tab:postData.category}}" v-text="postData.category_title" class="category"></router-link>
            </div>
            <div class="features" v-if="postData.summary">
                <span v-text="label.features" class="tit"></span>
                <span v-text="postData.summary" class="container"></span>
            </div>
            <vue-markdown v-highlight :source="postData.content" class="content"></vue-markdown>            
        </div>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';
    export default {
        name:'m_post_normal',
        props:['postData'],
        data(){
            return {
                label:{
                    comment:'评论',
                    features:'导读',
                    views:'阅读',
                    hot:'热度',
                },
            }
        },
        components:{
            VueMarkdown,
        },
    }
</script>
