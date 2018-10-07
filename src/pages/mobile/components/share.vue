<template>
    <van-popup v-model="$store.state.shareSwitch" position="bottom" :overlay="false" class="share_pop m_card">
        <div class="hd">
            <span v-text="label.share_to"></span>
            <!-- <i class="iconfont icon-close float-right" @click="value.share = !value.share"></i> -->
        </div>
        <div class="bd share_list">
            <li class="-mob-share-qq" @click="share('qq')"><i class="iconfont icon-web-icon-"></i><p v-text="label.qq"></p></li>
            <li class="-mob-share-qzone" @click="share('qzone')"><i class="iconfont icon-kongjian"></i><p v-text="label.zone"></p></li>
            <li class="-mob-share-wechat" @click="share('wechat')"><i class="iconfont icon-wechat"></i><p v-text="label.wechat"></p></li>   
            <li class="-mob-share-weibo" @click="share('weibo')"><i class="iconfont icon-weibo"></i><p v-text="label.weibo"></p></li>
            <li class="-mob-share-douban" @click="share('douban')"><i class="iconfont icon-douban"></i><p v-text="label.douban"></p></li>      
        </div>
        <div class="cancle_btn" v-text="label.cancle" @click="$store.commit('shareSwitch')"></div>
    </van-popup>
</template>

<script>
export default {
    name:'m_share',
    data(){
        return {
            label:{
                share_to:'分享至：',
                qq:'QQ',
                weibo:'微博',
                zone:'空间',
                douban:'豆瓣',
                wechat:'微信',
                cancle:'取消',
            }
        }
    },
}
</script>
