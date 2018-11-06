<template>
    <div class="video_page">
        <div class="video_box bg-white">
            <vueMarkdown :source="value.video" class="video_iframe" v-if="value.content"></vueMarkdown>
            <div class="info">
                <vue-markdown v-highlight :source="value.content" class="content"></vue-markdown>      
                <div class="post_info">
                    <div class="comment">—— <span v-text="postData.comment_count"></span>{{label.comment}}</div>
                    <div class="views">{{postData.views}}<span v-text="label.views"></span></div>
                    <router-link :to="{name:'category',params:{tab:postData.category}}" v-text="postData.category_title" class="category"></router-link>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import vueMarkdown from 'vue-markdown';
export default {
    name:'m_post_video',
    props:['postData'],
    data(){
        return {
            label:{
                comment:'评论',
                features:'导读',
                views:'阅读',
                hot:'热度',
            },
            value:{
                video:'',
                content:'',
            },
        }
    },
    created(){
        let post = this.get_video_post(this.postData.content);
        this.value.video = post[0][0];
        this.value.content = post[1];
        this.$store.commit('pushPageLoad');
    },
    components:{
        vueMarkdown,
    },
}
</script>

