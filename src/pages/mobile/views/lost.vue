<template>
    <div class="container lost_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
        <m_header :title="value.title" :hideUser="`true`"></m_header>
        <div class="m_lost">
            <img src="/static/img/other/m_lost.png" alt="lost">
            <p class="tip" v-text="label.lost_tip"></p>
        </div>
        <div class="m_card post_recommend postCard_m">
            <div class="hd"><span v-text="label.recommed"></span></div>
            <div class="bd">
                <router-link :to="{name:'article',params:{id:item.pid}}" class="item" v-for="item in postData" :key="item.pid">
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
            </div>
        </div>
    </div>
</template>

<script>
import m_header from '@/pages/mobile/components/header'
import m_aside from '@/pages/mobile/components/aside'
export default {
    name:'m_lost',
    data(){
        return {
            label:{
                lost_tip:'你所访问的页面不见了~',
                recommed:'文章推荐',
            },
            value:{
                title:'迷路',
                
            },
            postData:[],
        }
    },
    created(){
        this.getLatestPost({start:0,limit:6}).then(res=>{this.postData = res.data});     
    },
    components:{
        m_header,
        m_aside,
    }
}
</script>
