<template>
    <div class="ct-post-xs">
        <div class="hd" v-if="title || link" :class="{'border':border}">
            <span v-text="title"></span>
            <router-link :to="link" v-if="link">
                <i class="iconfont icon-gengduo float-right"></i>
            </router-link>
        </div>
        <div class="bd">
            <van-row type="flex" class="f-wrap" >
                <van-col :span="12" v-for="item in data" :key="item.id" class="post-item">
                    <router-link :to="item.link"  >
                        <img :src="item.url" alt="item.title" class="img">
                        <div class="tit" v-text="item.title"></div>    
                    </router-link>
                </van-col>                    
            </van-row>
            <div  v-show="finished" style="width:100%;margin-top:.5rem;">
                <div class="end_tip" ><i class="iconfont icon-jiantou-shang"></i><span v-text="label.end"></span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ct-post-xs',
        props:['data','finished','title','link','border'],
        data(){
            return {
                label:{
                    end:'到底啦',
                },
            }
        }
    }
</script>