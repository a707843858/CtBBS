<template>
<div class="page_wrap">
    <div class="container lost_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load> 
        <ct-header :title="value.title" :hideUser="`true`"></ct-header>
        <div class="m_lost">
            <img src="/static/img/other/m_lost.png" alt="lost">
            <p class="tip" v-text="label.lost_tip"></p>
        </div>
    </div> 
    <ct-aside></ct-aside>   
</div>

</template>

<script>
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
                news_link:{name:'category',params:{tab:'all'}},  
            },
        }
    },
    created(){
        this.$store.commit('setPageLoad',1);   
        this.$store.commit('pushPageLoad');
    }
}
</script>
