<template>
<el-row type="flex" class="f-wrap bd bbs-max-wrap mx-auto post_sm">
                <el-col v-for="item in postData" :key="item.pid" class="item">
                            <router-link :to="{name:'article',params:{id:item.pid}}" class="hd">
                                <img :src="item.thumb" alt="" class="img">  
                            </router-link>
                            <div class="bd hidden-xs-only">
                                <div class="avatar"><router-link :to="{name:'author',params:{id:item.author,tab:'home'}}"><img :src="`/static/img/avatar/${item.avatar_url}`" alt="" width="33" height="33" class="float-left"></router-link></div>
                                <div class="info">
                                    <p class="tit"><router-link :to="{name:'article',params:{id:item.pid}}" v-text="item.title"></router-link></p>
                                    <div class="btm">
                                        <div class="author"><router-link :to="{name:'author',params:{id:item.author,tab:'home'}}" v-text="item.nick_name"></router-link></div>
                                    </div>
                                </div>
                                <!-- <div class="comment float-right"><i class="fa fa-comment-o mr-2"></i><span>{{item.comment}}</span></div> -->
                            </div>
                    </el-col>                    
                </el-row>
</template>

<script>
    export default {
        name:'post_sm',
        props:['postData'],
        data(){
            return {
                
            }
        }
    }
</script>