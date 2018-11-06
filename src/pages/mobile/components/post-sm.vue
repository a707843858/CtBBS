<template>
    <div class="ct-post-sm">
        <router-link :to="{name:'article',params:{id:item.pid}}" class="post-item" v-for="item in data" :key="item.pid">
            <van-row type="flex" >
                <van-col :span="7" class="thumb"><img :src="item.thumb" alt="item.title"></van-col>
                    <van-col :span="17" class="info">
                        <h3 class="tit" v-text="item.title"></h3>
                        <div class="author">
                            <div class="nick_name">@ <span v-text="item.nick_name"></span></div>
                            <div class="comment"><i class="iconfont icon-comment mr-1"></i><span v-text="item.comment_count"></span></div>
                        </div>
                    </van-col>
            </van-row>                            
        </router-link>
        <div class="post-item" v-show="finished == true">
            <div class="end_tip" ><i class="iconfont icon-jiantou-shang"></i><span v-text="label.end"></span></div>
        </div>
        
    </div>
</template>


<script>
    export default {
        name:'ct-post-sm',
        props:['data','finished'],
        data(){
            return {
                label:{
                    end:'到底啦',
                },
            }
        },

    }
</script>