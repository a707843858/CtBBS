<template>
<el-container>
    <!--顶部-->
        <el-header>
            <common-header></common-header>        
        </el-header>
    <!--主体-->
    <el-main class="zone_page"> 
        <div class=" container bbs-max-wrap mx-auto">
            <!--顶部-->
                <div class="hd">
                    <div class="hd_bg" id="hd_bg" :style="`background:url(/static/img/background/${zoneBg.url}) ${zoneBg.extend}`">
                        <el-row class="f-wrap user" type="flex" >
                            <el-col class="avatar" :lg="2" :md="2" :sm="3" :xs="4"><img :src="`/static/img/avatar/${userInfo.avatar_url}`" alt=""></el-col>
                            <el-col class="info" :lg="17" :md="17" :sm="16" :xs="10">
                                <div  class="top"><span class="nick_name" v-text="userInfo.nick_name"></span><span class="badge badge-leve ">Lv.0</span></div>
                                <div class="btm">{{userInfo.sign | isSign}}</div>                                 
                            </el-col>
                            <el-col class="control" :lg="5" :md="5" :sm="5" :xs="10">
                                <el-button @click="develope()" size="mini" class="follow"><i class="iconfont icon-attend"></i><span class="hidden-xs-only ml-2">{{label.follow}}</span></el-button>
                                <!-- <div class="more">
                                    <el-button size="mini" type="text" class="hd" @click="develope()"><i class="iconfont icon-diandian"></i></el-button>  
                                </div>                                -->
                            </el-col>
                        </el-row>
                    </div>
                    <el-row type="flex" class="nav">   
                        <el-col class="left">
                            <router-link :to="{name:'author',params:{tab:'home',id:this.$route.params.id}}"><i class="iconfont icon-home "></i><span v-text="label.home"></span></router-link>
                            <router-link :to="{name:'author',params:{tab:'post',id:this.$route.params.id}}"><i class="iconfont icon-post" ></i><span v-text="label.idea"></span></router-link>
                            <router-link :to="{name:'author',params:{tab:'info',id:this.$route.params.id}}"><i class="iconfont icon-user_1 "></i><span v-text="label.userInfo"></span></router-link>
                        </el-col> 
                        <el-col class="right hidden-xs-only">
                            <li>{{label.idea}}<p>{{userInfo.post}}</p></li>
                            <li>{{label.fans}}<p>{{userInfo.fans}}</p></li>
                        </el-col>                   
                    </el-row>
                </div>
            <!--内容-->
                <zone_home v-if="this.$route.params.tab == 'home'"  :userInfo="userInfo"></zone_home>
                <zone_post v-else-if="this.$route.params.tab == 'post'" :userInfo="userInfo"></zone_post>
                <zone_info v-else-if="this.$route.params.tab == 'info'" :userInfo="userInfo"></zone_info>
            <!---->
        </div>
    </el-main>
    <!--底部-->
        <el-footer>
            <common-footer></common-footer>         
        </el-footer>
</el-container>
</template>

<script>
import header from '@/components/common/header';
import footer from '@/components/common/footer';
import zone_home from '@/components/user/zone_home';
import zone_post from '@/components/user/zone_post';
import zone_info from '@/components/user/zone_info';
export default {
    name : 'zone',
    data(){
        return {
            userInfo : [],
            label:{
                empty_tip:'暂时为空',
                follow:'关注',
                idea:'创作',
                fans:'粉丝',
                home:'主页',
                userInfo:'资料',
                collect:'收藏',

            },
            value :{
                uid:0,
                puid:0,
                body_bg:0,
            },
            zoneBg:[],
        }
    },
    created(){
        var puid = this.$route.params.id ;
        var self = this ;
        //获取用户背景
        this.get_user_background({meta:'zone',uid:puid}).then((res)=>{
            this.zoneBg = res.data[0];
        });
        //获取user标签
        this.get_user_meta('*',puid).then(res=>{this.userInfo = res.data[0]});
    },  
    components:{
        'common-header' : header,
        'common-footer' : footer,
        zone_home,
        zone_post,
        zone_info,
    },
    methods:{
    }
};
</script>

