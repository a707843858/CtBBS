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
                    <div class="hd_bg" id="hd_bg" :style="`background:url(/static/img/background/${bodyBg.url}) ${bodyBg.extend}`">
                        <el-row class="f-wrap user" type="flex" >
                            <el-col class="avatar" :lg="2" :md="2" :sm="3" :xs="4"><img :src="`/static/img/avatar/${userInfo.avatar_url}`" alt=""></el-col>
                            <el-col class="info" :lg="17" :md="17" :sm="16" :xs="10">
                                <div  class="top"><span class="nick_name">{{userInfo.nick_name}}</span><span class="badge badge-leve ">Lv.0</span></div>
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
                            <a :href="`/author?id=${this.$route.query.id}&tab=home`" :class="[this.$route.query.tab == 'home'?'active':'']"><i class="iconfont icon-home mr-2"></i>{{label.home}}</a>
                            <a :href="`/author?id=${this.$route.query.id}&tab=post`" :class="[this.$route.query.tab == 'post'?'active':'']"><i class="iconfont icon-post mr-2" ></i>{{label.idea}}</a>
                            <a :href="`/author?id=${this.$route.query.id}&tab=info`"  :class="[this.$route.query.tab == 'info'?'active':'']"><i class="iconfont icon-user_1 mr-2"></i>{{label.userInfo}}</a>                            
                        </el-col> 
                        <el-col class="right hidden-xs-only">
                            <li>{{label.idea}}<p>{{userInfo.post}}</p></li>
                            <li>{{label.fans}}<p>{{userInfo.fans}}</p></li>
                        </el-col>                   
                    </el-row>
                </div>
            <!--内容-->
                <zone_home v-if="this.$route.query.tab == 'home'"  :userInfo="userInfo"></zone_home>
                <zone_post v-else-if="this.$route.query.tab == 'post'" :userInfo="userInfo"></zone_post>
                <zone_info v-else-if="this.$route.query.tab == 'info'" :userInfo="userInfo"></zone_info>
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

            },
            value :{
                uid:0,
                puid:0,
                body_bg:0,
            },
            bodyBg:[],
        }
    },
    created(){
        var puid = this.$route.query.id ;
        var self = this ;
        //获取用户背景
        this.get_user_background('body_bg',puid).then((res)=>{
            this.bodyBg = res.data[0];
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

// <style  lang="scss" type="text/css">
// $border_color:#ebeef5;
// @mixin header_shadow{
//     box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.15), -2px 0px 2px rgba(0, 0, 0, 0.15);
//     -webkit-box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.15), -2px 0px 2px rgba(0, 0, 0, 0.15);
//     -moz-box-shadow: 1px -2px 2px rgba(0, 0, 0, 0.15), -2px 0px 2px rgba(0, 0, 0, 0.15);
// }
// //Left
// .zone_header {
//     .avatar img { 
//         padding:0.25rem .25rem 0;
//         background:#FFF;
//         border-radius:4px 4px 0 0;
//         position: absolute;
//         top: -91px;
//         left:20px;
//         border: solid rgba(255, 255, 255, 0.35);
//         border-width: 1px 1px 0 1px;
//         @include header_shadow();}
//     .userInfo {
//         padding:0.25rem 0.25rem 0.25rem 0;
//         border-radius: 0 4px 0 0;
//         position: absolute;
//         top: -46px;
//         left: 99px;
//         border:1px solid rgba(255, 255, 255, 0.35);
//         @include header_shadow();
//         li {
//             padding:0 15px;
//             border-left:1px dashed $border_color;
//             font-size:15px;
//             display:inline-block;
//             &:first-child {border-left:0;}
//             }
//         }
// }
//  .zone_post {
//      .el-card__header {
//          li {display:inline-block;margin-right:10px;}
//      }
//  }

// //Right
// .zone_header_right {
//     li { 
//         padding:0 15px;
//         border-left:1px dashed $border_color;
//         font-size:15px;
//         display:inline-block;
//         &:first-child {border-left:0;}
//         }
//     .container {
//         position:absolute;
//         padding:0.25rem 0.25rem 0.25rem 0;
//         border-radius: 4px 4px 0 0;
//         position: absolute;
//         top: -46px;
//         right: 0px;
//         border:1px solid rgba(255, 255, 255, 0.35);
//         @include header_shadow();
//         }
// }
// .otherInfo li {
//     border-bottom:1px dashed $border_color;
//     margin-bottom:5px;
//     padding-bottom:6px;
//     i {width: 25px;}
// }
// .social_account {
//     .el-card__body {
//         text-align: center;
//         i {width: 52px;}
//     }
// }
// </style>