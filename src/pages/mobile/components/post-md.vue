<template>
    <div class="ct-post-md">
        <van-row type="flex" class="post-item" v-for="item in data" :key="item.pid">
            <router-link :to="{name:'article',params:{id:item.uid}}">
                <van-col span="3" class="post-left">
                    <router-link :to="{name:'zone_home',params:{id:item.uid}}">
                        <img :src="`/static/img/avatar/${item.avatar_url}`" :alt="item.nick_name">
                    </router-link>    
                </van-col>
                <van-col span="21" class="post-right">
                    <div class="author-info">
                        <span class="nick_name" v-text="item.nick_name"></span><span class="level badge">Lv.0</span>
                        <router-link :to="{name:'category',params:{tab:item.category}}"><span class="float-right" v-text="`#${item.category_title}#`"></span></router-link>                      
                        <p class="time">{{ item.publishTime | date}}</p>
                    </div>
                    <vue-markdown :source="item.summary" class="post-content"></vue-markdown>
                    <div class="post-bottom">
                        <div class="views"><i class="iconfont icon-liulan mr-2"></i>0</div>
                        <div class="comment"><i class="iconfont icon-comment mr-2"></i><span v-text="item.comment_count"></span></div>
                    </div>
                </van-col>
            </router-link>
        </van-row>      
        <div class="post-item" v-show="finished == true">
            <div class="end_tip" ><i class="iconfont icon-jiantou-shang"></i><span v-text="label.end"></span></div>
        </div>                          
        
    </div>
</template>

<script>
import vueMarkdown from 'vue-markdown';
    export default {
        name:'ct-post-md',
        props:['data','finished'],
        data(){
            return {
                label:{
                    end:'到底啦',
                },
            }
        },
        components:{
            vueMarkdown,
        }
    }
</script>