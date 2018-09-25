<template>  
<el-container>
    <!--顶部-->
        <el-header>
            <common-header></common-header>        
        </el-header>
    <!--主体-->
        <el-main class="home_page"> 
        <!--主页顶部图片-->
            <div class="header_bg">
                <el-row class="search" justify="center" type="flex">
                    <el-col class="item" :lg="7" :md="9" :sm="11" :xs="22">
                        <div class="hd">
                            <p v-text="label.header_logo"></p>
                        </div>
                        <div class="bd">
                            <el-input size="small" :placeholder="label.header_placeholder" ><el-button slot="append" icon="el-icon-search"></el-button></el-input>
                        </div>                            
                    </el-col>                  
                </el-row>
            </div>
        <!--主页简介-->
            <div class="home_introduce">
                <el-row class="f-wrap mx-auto container bbs-max-wrap" type="flex">
                    <el-col :lg="4" :md="4" :sm="4"  :xs="8" v-for="item in guide" :key="item.tit" class="item">
                        <div class="hd"><img :src="`/static/img/other/${item.src}`" alt=""></div>
                        <div class="bd">
                            <h2 class="tit" v-text="item.tit"></h2>
                            <p class="subtit" v-text="item.subtit"></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        <!--轮播图&右侧展示-->
            <div class="home_slide bg-white">
                <div class="hd  bbs-max-wrap">
                    <p class="tit"><span v-text="label.home_slide_tit"></span></p>
                    <p class="subtit hidden-xs-only" v-text="label.home_slide_sbutit"></p>
                </div>
                <el-row type="flex" class="f-wrap bd bbs-max-wrap">
                    <!--轮播图-->
                        <el-col :lg="12" :md="12" :sm="12" class="carousel">
                            <el-carousel tigger="click">
                                <el-carousel-item v-for="item in carousel_options" :key="item.id">
                                    <a :href="item.link">
                                        <img :src="item.url" class="img">
                                        <h3 class="tit hidden-xs-only">{{item.title}}</h3>
                                    </a>
                                </el-carousel-item>
                            </el-carousel>  
                        </el-col>
                    <!--右侧展示-->
                        <el-col :lg="12" :md="12" :sm="12" class="exhibition">
                            <el-col :lg="12" :md="12" :sm="12" :xs="12" class="item" v-for="item in homeAside" :key="item.link">
                                <a class="container" :href="item.link">
                                    <img :src="`${item.url}`" alt="" class="img">
                                    <div class="tit hidden-xs-only">{{item.title}}</div>
                                </a>
                            </el-col>
                        </el-col>
                </el-row>
            </div>
        <!--帖子层-->
            <div class="home_post">
                <div class="hd bbs-max-wrap">
                    <p class="tit"><span>{{label.home_post_tit}}</span></p>
                    <p class="subtit hidden-xs-only">{{label.home_post_subtit}}</p>
                </div>
                <el-row type="flex" class="f-wrap bd bbs-max-wrap mx-auto post_sm_item">
                    <div class="container">
                        <el-col v-for="item in postData" :key="item.pid" class="item">
                            <a :href="`/article?id=${item.pid}`" class="hd">
                                <img :src="item.thumb" alt="" class="img">  
                            </a>
                            <div class="bd hidden-xs-only">
                                <div class="avatar"><a :href="`/author=${item.authorId}`"><img :src="`/static/img/avatar/${item.avatar_url}`" alt="" width="33" height="33" class="float-left"></a></div>
                                <div class="info">
                                    <p class="tit"><a :href="`/article?id=${item.pid}`">{{item.title}}</a></p>
                                    <div class="btm">
                                        <div class="author"><a :href="`/author=${item.uid}`">{{item.nick_name}}</a></div>
                                    </div>
                                </div>
                                <!-- <div class="comment float-right"><i class="fa fa-comment-o mr-2"></i><span>{{item.comment}}</span></div> -->
                            </div>
                        </el-col>                    
                    </div>
                </el-row>
            </div>
        <!--引导注册-->
            <div class="btm_guide">
                <div class="hd bbs-max-wrap">
                    <p class="tit">
                        <span><i class="iconfont icon-yundongzuqiu"></i></span>           
                    </p>
                </div>
                <el-row class="bd bbs-max-wrap mx-auto" type="flex" justify="center">
                    <el-col :lg="3" :md="3" :sm="3" :xs="8" ><a href="/login" class="el-button register">{{label.register_now}}</a></el-col>
                    <el-col :lg="3" :md="3" :sm="3" :xs="5"></el-col>
                    <el-col :lg="3" :md="3" :sm="3" :xs="8"><router-link :to="{path:'/category',query:{tab:'all'}}" class="el-button more">{{label.more}}</router-link></el-col>
                </el-row>
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
export default {
  name: 'home',
  data(){
    return {
      label : {
          register_now:'立即注册',
          more:'发现更多',
          read_more : '阅读更多',
          fans : '粉丝',
          dynamic : '动态',
          click_to_sign : '点击签到',
          signed : '已签到',
          login:'登录',
          register:'注册',
          header_placeholder:'从1215449个分享里发现自己',
          header_logo:'分享.me,Share.快乐',
          home_slide_tit:'与众不同的交流社区',
          home_slide_sbutit:'让我们因分享成为朋友',
          home_post_tit:'独具匠心的设计理念',
          home_post_subtit:'让我们因交流愈加精致',
      },          
      guide:[
          {tit:'分享作品',subtit:'炫出你最好的作品',src:'share.svg'},
          {tit:'海量更新',subtit:'追求完美的解决方案',src:'icon-xiaba.svg'},
          {tit:'灵感头条',subtit:'寻找灵感的海量资料库',src:'find.svg'},
          {tit:'精彩活动',subtit:'参与精选设计大赛',src:'prize-line.svg'},
          {tit:'摄影社区',subtit:'追寻摄影的灵感',src:'icon_500px.svg'},
      ],
      homeAside:[],
      postData:[],
      value : {
          uid : 0,
          is_sign : '',      
          nameCard_bg:'',
          user_status:false,
          model:'gird',
      },    
      blogInfo:[],
      carousel_options : [],
      userInfo:[],
      session:[],
    }
  },    
   created() {
        var self = this ;
        //Get Session
        this.get_session().then((res)=>{this.session = res.data});
        //加载首页最新帖子
        this.getLatestPost(0,10).then((res)=>{this.postData = res.data});
        //获取轮播图数据
        this.get_carousel_list('home').then((res)=>{this.carousel_options = res.data});
        //获取侧边栏文章自定义
        this.get_carousel_list('home_aside').then((res)=>{this.homeAside = res.data});
  },
    components:{
        'common-header' : header,
        'common-footer' : footer,
    },
};
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    wow.init();
</script>

