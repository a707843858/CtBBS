<template>
<div class="page_wrap">
    <div class="container profile_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside},{'o-hidden':$store.state.pageLoad || $store.state.loginAside}]">
        <ct-page-load></ct-page-load>
        <ct-header :title="label.title" :back="`true`" :hideUser="`true`"></ct-header>
        <div class="collect_wrap message_wrap"> 
            <div class="collect_container">
                <van-tabs v-model="value.active" type="card">
                <van-tab :title="label.personalMessage">
                    <div class="m_card message_item" v-for="item in pmData" :key="item.id" v-if="pmData">
                        <div class="message_item_avatra"><img :src="`/static/img/avatar/${item.avatar_url}`" :alt="item.nick_name"></div>
                        <div class="message_item_info">
                            <div class="message_item_author">
                                <span class="message_item_nick_name" v-text="item.nick_name"></span>/
                                <span class="message_item_time">{{item.pubdate | date }}</span>
                            </div>
                            <div class="message_item_content" v-text="item.content"></div>
                        </div>
                    </div>
                    <div class="empty_tip" v-else><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div>
                </van-tab>
                <van-tab :title="label.systemMessage">
                    <div class="m_card message_item" v-for="item in smData" :key="item.id" v-if="smData">
                        <div class="message_item_avatra"><img src="/static/img/other/kefu.jpg" alt="system"></div>
                        <div class="message_item_info">
                            <div class="message_item_author">
                                <span class="message_item_nick_name" v-text="label.system"></span>/
                                <span class="message_item_time">{{item.pubdate | date }}</span>
                            </div>
                            <div class="message_item_content" v-text="item.content"></div>
                        </div>
                    </div>
                    <div class="empty_tip" v-else><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div>
                </van-tab>
                </van-tabs>                  
            </div>
        </div>
    </div>
</div>
</template>


<script>
    export default {
        name:"m_profile_message",
        data(){
            return {
                label:{
                    title:'消息',
                    personalMessage:'私人消息',
                    systemMessage:'系统提醒',
                    empty_tip:'暂无提醒内容',
                    system:'系统',
                },
                value:{
                    active:0,
                },
                smData:[],
                pmData:[],
            }
        },
        created(){
            this.$store.commit('setPageLoad',2);  
            this.get_message({uid:0,type:0}).then(res=>{this.smData =  res.data;this.$store.commit('pushPageLoad')});
            this.get_message({uid:0,type:1}).then(res=>{this.pmData =  res.data;this.$store.commit('pushPageLoad')});
        }
    }
</script>