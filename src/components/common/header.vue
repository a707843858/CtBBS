<template>
<el-header>
    <div class="header-nav"  id="header-nav" :style="`background:url(/static/img/background/${bodyBg.url}) ${bodyBg.extend};background-color:#fff;`">
        <!--顶部-->
            <!--菜单-->    
                <el-row type="flex" class="f-wrap position-relative">
                    <!--Logo-->
                        <el-col class="logo align-top" :lg="3" :md="3" :sm="3" :xs="6" > 
                        <span v-text="value.blog_name" v-if="value.logo_type==0"></span><img src="/static/img/other/logo.png" v-else>
                                    </el-col>
                    <!--顶部菜单栏-->
                                    <!--左侧菜单栏-->
                                        <el-col class="menus position-relative" :lg="18" :md="18" :sm="19" :xs="15">
                                            <div class="menu_guide" @click="toggleGuide()"><i class="iconfont icon-fenlei"></i><i class="iconfont icon-close" style="opacity:0;"></i></div>
                                            <div class="menu_body position-absolute am-5">
                                                <a v-for="(item,index) in menus"  :href="item.a" ><li v-text="item.message"></li></a>
                                            </div>
                                        </el-col>
                                    <!--右侧菜单栏-->
                                        <el-col class="float-right menu-right position-relative" :lg="3" :md="3" :sm="2" :xs="3">
                                            <!--User control-->
                                            <div class="userBar">
                                                <li id="userBar_hd" @click="toggleUserStatus()" v-if="session.uid > 0"><div class="d-inline-block nick_name hidden-sm-and-down" v-text="userInfo.nick_name"></div><i class="iconfont icon-jiantou-shang ml-2" :class="{'rotate-180':exist.hd_userStatus}"></i></li>
                                                <a href="/login" class="text-white" v-else><li id="userBar_hd"><div class="d-inline-block nick_name hidden-sm-and-down" v-text="label.login_or_register"></div><i class="iconfont icon-jiantou-shang ml-2"></i></li></a>
                                                <!--Logined  Template-->
                                                <div id="userBar_bd" class="am-5 " v-if="session.uid > 0" v-show="exist.hd_userStatus">
                                                    <div class="user_hd">
                                                        <div class="email" v-text="$options.filters.star(userInfo.email,0,1)"></div>
                                                        <div class="level">Lv.0</div>
                                                    </div>
                                                    <div class="user_bd">
                                                        <li><a href="/#"><i class="iconfont icon-qianbao"></i><span v-text="label.balance" class="tit"></span><span class="value" v-text="userInfo.charge"></span></a></li>
                                                        <li><a href="/#"><i class="iconfont icon-xinyujifen"></i><span class="tit" v-text="label.credit"></span><span class="value" v-text="userInfo.credit"></span></a></li>
                                                        <li><a href="/#"><i class="iconfont icon-xiaoxi"></i><span class="tit" v-text="label.notice"></span></a></li>
                                                        <li><a :href="`/author?tab=home&id=${session.uid}`"><i class="iconfont icon-user"></i><span class="tit" v-text="label.zone"></span></a></li>
                                                        <li><a :href="`/profile?tab=information`"><i class="iconfont icon-ziliao"></i><span class="tit" v-text="label.profeld"></span></a></li>
                                                        <li><a href="#"><i class="iconfont icon-shoucang"></i><span class="tit" v-text="label.collect"></span></a></li>
                                                        <li><a href="/editor?id=0"><i class="iconfont icon-fabiao"></i><span class="tit" v-text="label.publish"></span></a></li>
                                                        <li @click="toggleBgBox()" style="cursor:pointer;"><i class="iconfont icon-shezhi"></i><span class="tit" v-text="label.setting"></span></li>
                                                        <li><a href="/admin?tab=blog"><i class="iconfont icon-diannao"></i><span class="tit" v-text="label.backend"></span></a></li>
                                                        <li><a href="#" class="loginout" v-text="label.loginOut"></a></li>
                                                    </div>                    
                                            </div>
                                                </li>
                                            </div>
                                        </el-col>
                </el-row>     
            <!--换肤盒子--> 
                <div class="change_bg_box" v-show="exist.bg_box">
                    <el-card class="box-class bg_box" id="bg_box" shadow="never" >
                                <div slot="header">
                                        <div class="bbs-wrap mx-auto">
                                            <li :class="[value.bg_tab == 'body'?'active':'']" @click="value.bg_tab = 'body'" v-text="label.body_bg"></li>
                                            <li :class="[value.bg_tab == 'nameCard'?'active':'']" @click="value.bg_tab = 'nameCard'" v-text="label.nameCard_bg"></li>
                                            <li class="float-right"id="bg_box_close" @click="toggleBgBox(e)"><i class="fa fa-times" style="font-size:20px;"></i></li>
                                        </div>
                                </div>                    
                                <div class="bbs-wrap mx-auto bg_container" >
                                    <!--Body Background-->
                                    <div class="body_bg_container" v-if="value.bg_tab == 'body'">
                                        <el-radio-group v-model="value.body_bg" @change="BgUpdate('body_bg')">
                                            <el-radio-button :label="item.id" v-for="item in bodyBg_options" :key="item.id" >
                                                <li :style="'background:url(/static/img/background/thumb/'+ item.url +') no-repeat'"><span class="tit" v-text="item.title"></span><i></i></li> 
                                            </el-radio-button>
                                        </el-radio-group>
                                    </div>
                                    <!--Name Card Background-->
                                    <div class="nameCard_bg_container" v-if="value.bg_tab == 'nameCard'">
                                        <el-radio-group v-model="value.nameCard_bg" @change="BgUpdate('name_card')">
                                            <el-radio-button :label="item.id" v-for="item in nameCardBg_options" :key="item.id" >
                                                <li :style="'background:url(/static/img/background/thumb/'+ item.url +') no-repeat'"><span class="tit" v-text="item.title"></span><i></i></li> 
                                            </el-radio-button>
                                        </el-radio-group>
                                    </div>

                                </div>
                    </el-card>
                </div>  
    </div>     
</el-header>         
</template>

<script>
export default { 
    name:'header-nav', 
    data(){
        return{      
            label : {
                publish : '发表',
                loginOut : '退出',
                login_or_register:'登录 / 注册',
                nick_name : '',
                body_bg : '模板背景',
                nameCard_bg:'名片卡背景',
                setting:'设置',
                close:'关闭',
                manage : '管理',
                blog:'论坛',
                user:'用户',
                post:'文章',
                comment:'评论',
                login:'登录',
                zone:'空间',
                profeld:'资料',
                backend:'后台',
                login:'登录',
                register:'注册',
                level:'等级',
                fans:'粉丝',
                credit:'积分',
                balance:'余额',
                notice:'消息',
                collect:'收藏',
                change_bg:'换肤',
            },
            value : { 
                logo_type:'',      
                blog_name : '',
                body_bg: 1,
                body_bg_class : '',  
                uid:0,
                bg_tab:'body',
            },
            exist:{
                bg_box:false,
                hd_userStatus:false,
            },
            menus: [
                { message: '首页' ,a:'http://127.0.0.1:8080/#/'},
                { message: '示例页面' ,a:'#' },
            ],
            bodyBg:{},
            bodyBg_options : [],
            session:[],
            carousel_options:[],
            userInfo:[],
            }
    },           
    created(){
        //获取session
        this.get_session().then((res)=>{this.session = res.data;});
        //获取logo Type
        this.get_logo().then((res)=>{
            this.value.blog_name = res.data[0].meta_value;
            this.value.logo_type = res.data[1].meta_value;
        });
        //获取背景图片列表
        this.get_background_list('body_bg').then((res)=>{this.bodyBg_options = res.data;});
        //获取用户背景
        // this.get_user_background(body_bg).then((res)=>{
            //设置用户背景
            //this.bodyBg = bodyBg.data[0];           
            //document.body.style.background = `url(/static/img/background/${bodyBg.data[0].url} ) ${bodyBg.data[0].extend}`;  
        // });
        //获取user信息
        this.get_user_meta('*').then((res)=>{this.userInfo = res.data[0]});
    },
    methods : {
        //保存背景数据
        BgUpdate(meta){
            this.update_user_background(meta,this.value.body_bg).then(function(res){
                //设置Body背景
                        if(res.data[0].id > 0){
                            $('#hd_bg').attr('style','background:url("/static/img/background/'+ res.data[0].url +'") '+ res.data[0].extend);
                        }else {
                            self.showFail(1);
                        }                
            });
        },
        //退出
        loginOut(){
            console.log('1');
        },
        //换肤中心
        toggleBgBox(){
            this.exist.bg_box = !this.exist.bg_box;
        },
        //顶部菜单显示按钮
        toggleGuide(){
            toggleGuide();
        },
        //顶部个人中心
        toggleUserStatus(){
            this.exist.hd_userStatus = !this.exist.hd_userStatus;
        },

    },
    watch: {
        '$route' (to, from) {
        this.$router.go(0);
        },

    }
};
</script>

