<template>
    <el-row type="flex" class="f-wrap footer" justify="space-between">
        <!--关于我们-->
            <el-col :lg="6" :md="7" :sm="9"  class="info">
                <div class="tit">{{label.about}}</div>
                <div class="introduce">{{label.introduce}}</div>
                <div class="link"><router-link :to="{path:'/#'}" v-text="label.help"></router-link>|<router-link :to="{path:'/#'}" v-text="label.sever"></router-link>|<router-link :to="{path:'/link'}" v-text="label.friendLink"></router-link></div>
                <div class="icp" v-if="value.icp">{{value.icp}}</div>
                <div class="email">{{label.email}}：{{value.email}}</div>
            </el-col>
        <!--App-->
            <el-col :lg="6" :md="7" :sm="9"  class="app">
                <div class="tit">{{label.app}}</div>
                <div class="bd">
                    <div class="item">
                        <img src="/static/img/other/app.png" alt="" class="img">
                        <div class="tit">{{label.mobile}}</div>
                    </div>
                    <div class="item">
                        <img src="/static/img/other/app.png" alt="" class="img">
                        <div class="tit">{{label.rss}}</div>
                    </div>
                </div>
            </el-col>
    </el-row>    
</template>
<script>
export default {
    name:'footer_nav',
    data(){
        return{
            label:{
                about:'关于我们',
                introduce:'创设网是一个设计师与程序员的学习平台。我们一直专注于设计师和程序员的学习成长交流,分享最新资讯,分享好的作品',
                help:'帮助中心',
                sever:'服务条款',
                app:'移动端',
                mobile:'手机版',
                rss:'微信订阅号',
                friendLink:'友情链接',
                email:'官方邮箱',
            },
            value:{
                icp:'',
                email:'76876786@catuncle.com'
            }
        }
    },
    created(){
        this.get_blog_meta('icp').then((res)=>{this.value.icp = res.data[0].meta_value});
    },
};

</script>      

