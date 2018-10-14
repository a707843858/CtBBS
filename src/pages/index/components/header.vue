<template>
<el-header>
    <div class="header-nav"  id="header-nav" :style="`background-color:#fff;`">
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
                                    <div class="menu_body"> 
                                        <div class="menu_category">
                                            <router-link :to="{name:'category',params:{tab:'all'}}" class="hd hidden-xs-only category_tit"><li v-text="label.category"></li></router-link>
                                            <a class="hd subtit"  ><li v-text="label.category_guide"></li></a>
                                            <div class="bd ">
                                                <router-link :to="{name:'category',params:{tab:'all'}}"><li v-text="label.category_all"></li></router-link>
                                                <router-link :to="{name:'category',params:{tab:item.id}}" v-for="item in categoryData" :key="item.id" ><li v-text="item.title"></li></router-link>
                                                <router-link :to="{name:'category',params:{tab:'comment'}}"><li v-text="label.more_comment"></li></router-link>
                                            </div>
                                        </div>
                                        <div class="menu_a">
                                            <router-link :to="item.path" v-for="(item,index) in menus"  :key="index"><li v-text="item.tit"></li></router-link>
                                    </div>
                                               
                                </div>
                            </el-col>
                        <!--右侧菜单栏-->
                            <el-col class="float-right menu-right position-relative" :lg="3" :md="3" :sm="2" :xs="3">
                                <!--User control-->
                                    <div class="userBar">
                                                <li id="userBar_hd" @click="toggleUserStatus()" v-if="session.uid"><div class="d-inline-block nick_name hidden-sm-and-down" v-text="userInfo.nick_name"></div><i class="iconfont icon-jiantou-shang ml-2  hidden-sm-and-down" :class="{'rotate-180':exist.hd_userStatus}"></i><i class="iconfont icon-user ml-2"></i></li>
                                                <a href="/login" class="text-white" v-else><li id="userBar_hd"><div class="d-inline-block nick_name hidden-sm-and-down" v-text="label.login_or_register"></div><i class="iconfont icon-jiantou-shang   hidden-sm-and-down ml-2"></i><i class="iconfont icon-user ml-2"></i></li></a>
                                                <!--Logined  Template-->
                                                    <div id="userBar_bd" class="am-5 " v-if="session.uid" v-show="exist.hd_userStatus">
                                                        <div class="user_hd">
                                                            <div class="email" v-text="$options.filters.star(userInfo.email,0,1)"></div>
                                                            <div class="level">Lv.0</div>
                                                        </div>
                                                        <div class="user_bd">
                                                            <router-link tag="li" :to="{name:'profile',params:{tab:'financial'}}"><a><i class="iconfont icon-qianbao"></i><span v-text="label.balance" class="tit"></span><span class="value" v-text="userInfo.charge"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'home'}"><a><i class="iconfont icon-xinyujifen"></i><span class="tit" v-text="label.credit"></span><span class="value" v-text="userInfo.credit"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'home'}"><a><i class="iconfont icon-xiaoxi"></i><span class="tit" v-text="label.notice"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'author',params:{tab:'home',id:session.uid}}"><a><i class="iconfont icon-user"></i><span class="tit" v-text="label.zone"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'profile',params:{tab:'information'}}"><a><i class="iconfont icon-ziliao"></i><span class="tit" v-text="label.profeld"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'profile',params:{tab:'collect',id:session.uid}}"><a><i class="iconfont icon-shoucang"></i><span class="tit" v-text="label.collect"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'editor',params:{id:0}}"><a><i class="iconfont icon-fabiao"></i><span class="tit" v-text="label.publish"></span></a></router-link>
                                                            <li @click="toggleSetting" style="cursor:pointer;"><i class="iconfont icon-shezhi"></i><span class="tit" v-text="label.setting"></span></li>
                                                            <router-link tag="li" :to="{name:'admin',params:{tab:'blog'}}"><a><i class="iconfont icon-diannao"></i><span class="tit" v-text="label.backend"></span></a></router-link>
                                                            <router-link tag="li" :to="{name:'home'}"><a class="loginout" v-text="label.loginOut"></a></router-link>
                                                        </div>                    
                                                    </div>
                                                
                                    </div>
                            </el-col>
                </el-row>     
            <!--换肤盒子--> 
                <div class="setting_box" v-show="exist.setting_box"> 
                    <!--导航栏-->
                        <div class="hd">
                            <div class="container bbs-max-wrap mx-auto">
                                <li :class="{'active':value.setting_tab == 'zone'}" @click="value.setting_tab = 'zone'" v-text="label.zone_bg"></li>
                                <li :class="{'active':value.setting_tab == 'other'}" @click="value.setting_tab = 'other'" v-text="label.nameCard_bg"></li>
                                <li class="float-right" id="bg_box_close" @click="toggleSetting"><i class="iconfont icon-close" style="font-size:20px;"></i></li>
                            </div>
                        </div>
                    <!--主体部分-->
                        <div class="bd">
                            <div class="container bbs-max-wrap mx-auto">
                                <!--空间背景-->
                                    <div class="zone_bg" v-if="value.setting_tab == 'zone'">
                                        <el-radio-group v-model="value.zone_bg" @change="BgUpdate()">
                                            <el-radio-button :label="item.id" v-for="item in zoneBg_options" :key="item.id" >
                                                <li :style="'background:url(/static/img/background/thumb/'+ item.url +') no-repeat'"><span class="tit" v-text="item.title"></span><i></i></li> 
                                            </el-radio-button>
                                        </el-radio-group>
                                    </div>
                            </div>
                        </div>
                    <!---->
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
                zone_bg : '模板背景',
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
                category:'版块',
                category_guide:'发现更多',
                more_comment:'评论最多',
                category_all:'全部',
            },
            value : { 
                logo_type:'',      
                blog_name : '',
                zone_bg: 1 ,
                body_bg_class : '',  
                uid:0,
                setting_tab:'zone',               
            },
            exist:{
                bg_box:false,
                hd_userStatus:false,
                setting_box:false,
            },
            menus: [
                { tit: '首页' ,path:'/'},
                { tit: '示例页面' ,path:'http://baidu.com' },
            ],
            zoneBg_options : [],
            session:[],
            carousel_options:[],
            userInfo:[],
            categoryData:[],
            app:[],
            }
    },           
    created(){        
        this.get_logo().then((res)=>{
            this.value.blog_name = res.data[0].meta_value;
            this.value.logo_type = res.data[1].meta_value;
        });
        this.get_background().then((res)=>{this.zoneBg_options = res.data;});
        this.get_category().then(res=>{this.categoryData  = res.data;});
        this.get_session().then((res)=>{
            this.session = res.data;
            if (res.data.uid > 0) {this.get_user({uid:0}).then(res=>{this.userInfo = res.data[0]});}
        });    
    },
    methods : {
        //保存背景数据
        BgUpdate(){
            this.update_background({uid:0,bid:this.value.zone_bg}).then(res=>{
                if(this.$route.name == 'author'){
                    this.get_background({uid:0}).then(res=>{
                        let bg = document.getElementById('hd_bg');
                        bg.style.background = 'url(/static/img/background/'+res.data[0].url+')'+ res.data[0].extend;                         
                    });
                }
            });
        },
        //退出
        loginOut(){
            console.log('1');
        },
        //设置中心
        toggleSetting(){
            this.exist.setting_box = !this.exist.setting_box;
        },
        //顶部菜单显示按钮
        toggleGuide(){
            toggleGuide();
        },
        //顶部个人中心
        toggleUserStatus(){
            this.exist.hd_userStatus = !this.exist.hd_userStatus;
        },
        //传值：背景数据
    },
    watch: {
        '$route' (to, from) {
        this.$router.go(0);
        },

    }
};
</script>

