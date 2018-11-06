<template>
    <div class="comment_box  m_card">
        <div class="hd">
            <span v-text="label.comment"></span>
            <div class="float-right count">
            </div>
        </div>
        <div class="bd" v-if="total > 0">
            <div class="item" v-for="(item,index) in commentData" :key="index">
                <div class="avatar" >
                    <router-link :to="{name:'zone_home',params:{id:item.uid}}"><img :src="`/static/img/avatar/${item.avatar_url}`" class="img"></router-link>
                </div>
                <div class="container">
                    <div class="author">
                        <span v-text="item.nick_name" class="nick_name"></span>
                        <span class="float-right">{{item.timeLine | date}}</span>
                    </div>
                    <vue-markdown v-highlight :source="item.content" class="content"></vue-markdown>   
                </div>
            </div>
            <div class="rest_tip" v-show="value.rest > 0" @click="ajax_comment">
                <div class="container">
                    {{label.rest_comment_count_before}}<span v-text="value.rest"></span>{{label.comment_count}}
                </div>
            </div>             
            <div class="end_tip" v-show="value.rest == 0"><i class="iconfont icon-jiantou-shang"></i><span v-text="label.end"></span></div>       
        </div>
        <div class="bd" v-else>
            <span v-text="label.no_comment" class="comment_empty"></span>
        </div>
        <div class="reply_box" :class="{'btm-0':value.reply_show}">
                <div class="reply_memu_wrap" :class="{'height-0':value.reply_show}">
                    <li class="reply_tip" @click="replySwitch"><div class="container"><i class="iconfont icon-shuruzhong"></i><em v-text="label.reply_tip"></em></div></li>
                    <li class="item"><i class="iconfont icon-shoucang" @click="update_collect({uid:0,id:$route.params.id,type:'post'})"></i></li>
                    <li class="item"><i class="iconfont icon-share" @click="$store.commit('shareSwitch')"></i></li>
                </div>
            <div class="hd">
                <span v-text="label.reply"></span>
                <span class="float-right" @click="replySwitch"><i class="iconfont icon-close"></i></span>
            </div>
            <div class="reply_wrap">
                <van-field v-model="value.comment" type="textarea" :placeholder="label.reply_tip" />
                <div class="btm_extend">
                    <van-button slot="button" size="small" type="primary" class="reply_btn" v-text="label.reply"  @click="update_comment({pid:$route.params.id,comment:value.comment,type:'post'})"></van-button>
                    <div class="clearfix"></div>
                </div>
            </div>
            
        </div>
        <ct-share></ct-share>
    </div>
</template>


<script>
import VueMarkdown from 'vue-markdown';
import share from '@/pages/mobile/components/share'
    export default {
        name:"m_comment",
        props:['total'],
        data(){
            return {
                label:{
                    comment:'最新评论',
                    comment_count:'条评论',
                    end:'到底啦',
                    rest_comment_count_before:'还有',
                    no_comment:'暂无评论',
                    reply:'回复',
                    reply_tip:'说点什么吧.....',
                },
                value:{
                    total:0,
                    rest:0,
                    page:0,
                    comment:'',
                    reply_show:false,
                },
                commentData:[],
            }
        },
        created(){
            this.ajax_comment();
        },
        methods:{
            ajax_comment(){
                let limit = 5;
                let start = this.value.page * limit;
                setTimeout(() => {
                    this.get_comment({pid:this.$route.params.id,start:start,limit:limit}).then(res=>{
                        if(res.data.length > 0){
                            for (let i = 0; i < res.data.length; i++) {
                                this.commentData.push(res.data[i]);
                            };                        
                            this.value.page ++ ;
                            this.value.rest = this.total - ( start + res.data.length ) ;
                        }else {
                            return;
                        };                            
                    });
                }, 1000); 
            },
            replySwitch(){
                this.value.reply_show = !this.value.reply_show;
            },
            develope(){
                this.$toast('开发中...');
            },
        },
        components:{
            VueMarkdown,
            share ,
        }

    }
</script>
