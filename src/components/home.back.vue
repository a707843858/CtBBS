<template>    
  <section class="bg-white" style="padding: 2rem 0;">
      <div class="bbs-wrap mx-auto">
        <el-row type="flex" style="padding:0 1rem">
            <!--Left container-->
            <el-col :span="17">
                <!--Home carouse-->
                    <el-carousel tigger="click" height="260px" class="mb-3 b-radius-3">
                        <el-carousel-item v-for="item in carousel_options" :key="item.id">
                            <a :href="item.link"><img :src="'/static/img/carousel/'+item.url" class="b-radius-3"></a>
                        </el-carousel-item>
                    </el-carousel>    
                <!--Lates Post-->
                <div class="recent-post">
                    <el-card class="box-card post-card-big mb-3" shadow="never" v-for="post in posts" :key="post.id">
                            <div slot="header">
                                <div class="avatar d-inline-block mr-3 align-top">
                                        <a href="#"><img v-bind:src="'/static/img/avatar/'+post.avatar_url" width="34" height="34" class="b-radius-3"></a>
                                </div>
                                <div class="info d-inline-block">
                                    <a href="#" class="mr-3 avatar" style="line-height:20px;"><i class="fa fa-user mr-2"></i>{{post.nick_name}}</a>
                                    <p class="info-bottom">
                                    <span class="mr-3"><i class="fa fa-clock-o mr-2"></i>{{post.publishTime | formatDate}}</span>
                                    <a href="#" class="mr-3">
                                    <i class="fa fa-bookmark mr-2"></i>{{post.category_title}}
                                    </a>
                                     </p>
                                </div>
                                <div class="read-more float-right">
                                    <a :href="'/pid='+ post.pid">{{label.read_more}}</a>
                                </div>
                            </div>
                            <div class="card-title  mb-1" ><h5 v-text="post.title"></h5></div>
                            <div class="card-text" v-text="post.summary"></div>
                    </el-card>
                </div>
            </el-col>
            <!--Right container-->
            <el-col :span="7" style="padding-left:1rem;">
                <!--User Info-->
                <el-card class="box-card widget_userInfo mb-3 b-radius-3">
                    <div slot="header" class="avatar_bg position-relative" id="nameCard_bg" :style="'background:url(/static/img/background/'+ value.nameCard_bg +') no-repeat'">
                        <img :src="'/static/img/avatar/'+ userInfo.avatar_url" class="avatar" width="70" height="70">
                    </div>
                        <div v-text="userInfo.nick_name" class="nick_name text-center"></div>
                        <div class="fans "><li><p>1</p>{{label.fans}}</li><li><p>1</p>{{label.dynamic}}</li></div>
                        <div class="goSign"><el-button type="text" v-if="value.is_sign" v-text="label.signed" class="signed"></el-button><el-button type="text" v-text="label.click_to_sign"  class="sign" @click="value.is_sign = true " v-else></el-button></div>
                </el-card>
                <!--Blog Info-->
                <el-card class="box-card widget_webInfo">
                    <div slot="header" class="bg-white text-center" v-text="blogInfo[0].meta_value"></div>
                    <div class="card-body text-center">
                            <el-tooltip class="item" effect="dark" :content="blogInfo[1].meta_value"    placement="bottom"><i class="fa fa-qq d-inline-block"></i></el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="blogInfo[2].meta_value"  placement="bottom"><i class="fa fa-wechat d-inline-block"></i></el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="blogInfo[3].meta_value" placement="bottom"><i class="fa fa-weibo d-inline-block"></i></el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="blogInfo[4].meta_value" placement="bottom"><i class="fa fa-github d-inline-block"></i></el-tooltip>
                            <el-tooltip class="item" effect="dark" :content="blogInfo[5].meta_value" placement="bottom"><i class="fa fa-facebook d-inline-block"></i></el-tooltip>
                    </div> 
                </el-card>
            </el-col>
        </el-row>
    </div>
  </section>
</template>
<script>
export default {
  name: 'home',
  data(){
    return {
      label : {
          read_more : '阅读更多',
          fans : '粉丝',
          dynamic : '动态',
          click_to_sign : '点击签到',
          signed : '已签到',
      },
      value : {
          uid : 1 ,
          is_sign : '',      
          nameCard_bg:'',
          user_status:false,
      },    
      posts:[],
      blogInfo:[],
      carousel_options : [],
      userInfo:[],
      user_session:[],

    }
  },    
   created() {
        var self = this ;
        //Get Session
        this.axios.get('/api/user/get_session').then(function(res){
            if(res.data !== false){
                self.user_session = res.data;
                self.value.user_status = res.data.isLogin;
            }
        });
        //加载首页最新帖子
        this.axios.post('/api/post/get_latest_post',{type:'post'}).then(function(res){
              self.posts = res.data;  
              console.log(res); 
        });
        //加载右侧网站信息数据
        function get_blog_info(){
            return self.axios.get('/api/get_blog_info');
        };
        //获取轮播图数据
        function get_home_carousel(){
            return self.axios.post('/api/admin/get_carousel_list',{type:'home'});
        };
        //右侧用户信息
        function get_user_info(){
            return self.axios.post('/api/user/get_user_meta',{meta:'*'});
        }
        //获取用户名片背景图
        function get_user_nameCard_bg(){
             return self.axios.post('/api/user/get_user_bg',{meta:'name_card'});
        }
        //传输数据
        this.axios.all([get_user_info(),get_home_carousel(),get_blog_info(),get_user_nameCard_bg()]).then(this.axios.spread(function(userInfo,carouselList,blogInfo,user_nameCard_bg){            
            self.userInfo = userInfo.data[0] != null ? userInfo.data[0]:'';
            self.carousel_options = carouselList.data;
            self.blogInfo = blogInfo.data;
            self.value.nameCard_bg = user_nameCard_bg.data[0].url;
        }));
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">
.widget_userInfo .el-card__header {padding:0;height: 100px;}
.widget_userInfo .el-card__header .avatar_bg {background-size:100% 100px !important;height: 100px;width: 100%;}
.widget_userInfo .avatar {
    border-radius: 100%;
    padding:3px;
    background: rgba(255,255,255,0.35);
    position: absolute;
    top: 45px;
    left: 124px;
}
.widget_userInfo  .el-card__body {
    margin: 0;
    border-radius: 0 0 3px 3px;
    border-top: none;
    padding: 0;

}
.widget_userInfo .nick_name {
    padding:25px 1rem 17px 1rem;
    overflow: hidden;
    text-overflow:hidden;
    white-space: nowrap;
    font-size: 15px;
    font-weight: bold;
}
.widget_userInfo .fans li {
    display: inline-block;
    width: 49.5%;
    text-align: center;
    line-height: 25px;
    font-size: 14px;
}
.widget_userInfo .fans {
    padding-bottom: 6px;
}
.widget_userInfo .fans li:first-child {
    border-right:1px solid #dcdfe6;
}
.widget_userInfo .fans p {
    font-weight: bold;
    font-size: 16px;
}
.goSign button {
    font-size: 16px;
    width: 100%;
    border-radius:0;
}
.goSign .sign {
    border-top: 1px solid #fff;
    background-color: #5fb878;
    color: #fff;
}
.goSign .signed {
    border-top: 1px solid #dcdfe6;
    color: #7b7b7b;
}
</style>

