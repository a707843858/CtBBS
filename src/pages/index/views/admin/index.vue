<template>
<el-container>
    <!--顶部-->
    <el-header>
        <admin-header></admin-header>        
    </el-header>
    <!--主体-->
    <el-main class="admin_page" style="margin-top:0px;">
    <!--Left Aside-->
    <div class="aside" id="aside">
                <div class="header">
                    <div class="nav_logo bg-white text-center"><h4 class="d-inline-block mr-2">Cat Uncle Admin</h4><small >V1.0</small></div>
                    <div class="admin_avatar text-center"><img :src="'/static/img/avatar/avatar_'+value.uid +'.png'" width="60" height="60"></div>            
                    <h5 v-text="adminInfo.nick_name" class="text-center mt-2 mb-3 nick_name"></h5>
                </div>
                <!--List-->
                <div class="container">
                    <el-collapse class="mt-3" v-model="value.asideCollapse" accordion>
                        <div class="mt-2 mb-2">-- Main</div>
                        <!--Home-->
                        <el-collapse-item name="home" :class="tabClass[0]">
                            <template slot="title">
                                <div class="title o-hidden"><i class="fa fa-home "></i><span>{{label.blog}}</span></div>
                            </template>
                            <a href="/admin=blog"><li><i class="fa fa-long-arrow-right"></i>{{label.base_setting}}</li></a>
                            <a href="/admin=carousel"><li><i class="fa fa-long-arrow-right"></i>{{label.carousel}}</li></a>
                            <a href="/admin=background"><li><i class="fa fa-long-arrow-right"></i>{{label.background_img}}</li></a>
                            <a href="#"><li><i class="fa fa-long-arrow-right"></i>例子</li></a>
                        </el-collapse-item>
                        <!--User-->
                        <el-collapse-item name="user" :class="tabClass[1]">
                            <template slot="title">
                                <div class="title o-hidden"><i class="fa fa-user "></i><span>{{label.user}}</span></div>
                            </template>
                            <a href="/admin=user"><li><i class="fa fa-long-arrow-right"></i>{{label.all_users}}</li></a>
                            <a href="#"><li><i class="fa fa-long-arrow-right"></i>{{label.user_group}}</li></a>
                        </el-collapse-item>
                        <!--Post-->
                        <el-collapse-item name="post" :class="tabClass[2]">
                            <template slot="title">
                                <div class="title o-hidden"><i class="fa fa-newspaper-o" style="font-size:14px;line-height:57px;"></i><span>{{label.post}}</span></div>
                            </template>
                            <a href="/admin=post"><li><i class="fa fa-long-arrow-right"></i>{{label.all_posts}}</li></a>
                            <a href="#"><li><i class="fa fa-long-arrow-right"></i>{{label.all_category}}</li></a>
                        </el-collapse-item>
                         <!--Comment-->
                        <el-collapse-item name="comment" :class="tabClass[3]">
                            <template slot="title">
                                <div class="title o-hidden"><i class="fa fa-comment" style="font-size:14px;line-height:57px;"></i><span>{{label.comment}}</span></div>
                            </template>
                            <a href="/admin=comment"><li><i class="fa fa-long-arrow-right"></i>{{label.all_commont}}</li></a>
                        </el-collapse-item>
                    </el-collapse>
                </div>
    </div>                     
    <!--Section Main-->
    <div class="admin-wrap">    
            <div class="admin_container w-full">
                    <blog v-if="isActive[0] == 1"></blog>
                    <user v-if="isActive[1] == 1"></user>        
                    <post v-if="isActive[2] == 1"></post>
                    <comment v-if="isActive[3] == 1"></comment>
                    <carousel v-if="isActive[4]"></carousel>
                    <background v-if="isActive[5]"></background>       
            </div>
    </div>
    </el-main>
    <!--底部-->
    <el-footer>
        <admin-footer></admin-footer>         
    </el-footer>
</el-container> 
</template>

<script>
import admin_header from '@/components/common/admin_header'
import admin_footer from '@/components/common/admin_header'
import user from './user';
import carousel from './carousel';
import blog from './blog';
import post from './post';
import comment from './comment';
import background from './background';
export default {
    name : 'admin',
    data(){
        return {
            label : {
                blog:'论坛',
                post:'帖子',
                user:'用户',
                comment:'评论',
                carousel:'轮播图',
                background_img:'背景图',
                base_setting : '基本设置',
                all_users:'所有用户',
                user_group:'用户组',
                all_posts: '所有帖子',
                all_category:'所有分类',
                all_commont:'所有评论',
            } ,
            value: {
                uid : 1 ,
                asideCollapse : 'home',
            },
            isActive : [],
            adminInfo : [],
            tabClass : [],
        }
    },
    created() {
        //判断页面标签
        var self = this ;
        var tab = this.$route.params.admin;
        if(tab == 'blog' ){
            self.isActive[0] = 1 ;
            self.tabClass[0] = 'is_tab';
            self.value.asideCollapse = 'home';
        }else if(tab == 'user'){
            self.isActive[1] = 1 ;
            self.tabClass[1] = 'is_tab';
            self.value.asideCollapse = 'user';
        }else if(tab == 'post'){
            self.isActive[2] = 1;
            self.tabClass[2] = 'is_tab';
            self.value.asideCollapse = 'post';
        }else if(tab == 'comment'){
            self.isActive[3] = 1;
            self.tabClass[3] = 'is_tab';
            self.value.asideCollapse = 'comment';
        }else if(tab == 'carousel'){
            self.isActive[4] = 1 ;
            self.tabClass[0] = 'is_tab';
        }else if(tab == 'background'){
            self.isActive[5] = 1 ;
            self.tabClass[0] = 'is_tab';
        }
        var self = this ;
        //获取admin用户信息
        this.axios.post('/api/user/get_user_meta',{uid:self.value.uid,meta:'*'}).then(function(res){
            self.adminInfo = res.data[0];
        });
    },
    metthods:{
   
    },
    components : {
        'admin-header' : admin_header,
        'admin-footer' : admin_footer,
        blog : blog,
        user : user,
        comment : comment,
        post : post ,
        carousel:carousel,
        background:background,
    }
}
</script>
