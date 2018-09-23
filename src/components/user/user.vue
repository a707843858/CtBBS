<template>
<el-container>
    <!--顶部-->
        <common_header></common_header>        
    <!--主体-->
        <el-main class="user_page"> 
            <div class="user-max-wrap mx-auto container">
                <!--用户面板-->
                    <el-row type="flex" class="user_tab">
                        <!--左侧导航-->
                            <el-col :lg="4" :md="4" :sm="4" :xs="3" class="tab_guide">
                                    <a ><i class="iconfont icon-yonghuzhongxin"></i><span v-text="label.user_status_name"></span></a>
                                    <router-link :to="{path:'/profile',query:{tab:'information'}}"><i class="iconfont icon-wendangzhongxin"></i><span v-text="label.information_tab"></span></router-link>
                                    <router-link :to="{path:'/profile',query:{tab:'profile'}}" ><i class="iconfont icon-user"></i><span  v-text="label.profile_tab"></span></router-link>
                                    <router-link :to="{path:'/profile',query:{tab:'financial'}}"><i class="iconfont icon-qianbao"></i><span  v-text="label.financial_tab"></span></router-link>
                                    <router-link :to="{path:'/profile',query:{tab:'social'}}"><i class="iconfont icon-shejiao"></i><span v-text="label.social_tab"></span></router-link>
                            </el-col>
                        <!--右侧内容-->
                            <el-col :lg="20" :md="20" :sm="20"  :xs="21" class="tab_container">
                                    <div class="hd">
                                        <span v-text="value.user_status_tab" class="tit"></span>
                                    </div>
                                    <div class="bd" :class="`${$route.query.tab}_tab`">
                                        <information_tab v-if="isActive[0] == 1" :userInfo="userInfo" :session="session"></information_tab>
                                        <profile_tab v-else-if="isActive[1] == 1" :userInfo="userInfo" :session="session"></profile_tab>
                                        <financial_tab v-else-if="isActive[2] == 1" :userInfo="userInfo" :session="session"></financial_tab>
                                        <social_tab v-else-if="isActive[3] == 1" :userInfo="userInfo" :session="session"></social_tab>                                        
                                    </div>
                            </el-col>
                    </el-row>
                    <!-- <el-card :class="'box-card user_tab' " shadow="never">
                        <div slot="header" style="padding:0">
                            <el-row type="flex">
                                <el-col :span="4" style="border-right:1px dashed #ebeef5;" class="text-center">{{label.user_status_name}}</el-col>
                                <el-col :span="20" ><span class="mr-3 cub-left align-top" ></span>{{label.user_status_tab}}</el-col>
                            </el-row>
                        </div>
                        <el-row type="flex">
                            <el-col :span="4" >
                                <a href="/tab=information"><li id="information_tab" v-text="label.information_tab" :class="{active:isActive[0]}"></li></a>
                                <a href="/tab=profile"><li id="profile_tab" v-text="label.profile_tab" :class="{active: isActive[1]}"></li></a>
                                <a href="/tab=financial"><li id="financial_tab" v-text="label.financial_tab"  :class="{active: isActive[2]}"></li></a>
                                <a href="/tab=social"><li id="social_tab" v-text="label.social_tab"  :class="{active: isActive[3]}"></li></a>
                            </el-col>
                            <el-col :span="20">
                                <information_tab v-if="isActive[0] == 1"></information_tab>
                                <profile_tab v-if="isActive[1] == 1"></profile_tab>
                                <financial_tab v-if="isActive[2] == 1"></financial_tab>
                                <social_tab v-if="isActive[3] == 1"></social_tab>
                            </el-col>
                        </el-row>
                    </el-card> -->
            </div>        
        </el-main>
    <!--底部-->
        <el-footer>
            <common_footer></common_footer>
        </el-footer>            
</el-container>
</template>


<script>
import common_header from '@/components/common/header';
import common_footer from '@/components/common/footer';
import information_tab from './user_information';
import profile_tab from './user_profile';
import financial_tab from './user_financial';
import social_tab from './user_social'
export default {
        name : 'user_index',
        data(){
            return {
                label:{
                    user_status_name:'个人中心',                    
                    information_tab : '我的信息',
                    profile_tab : '修改头像',
                    financial_tab : '我的钱包',
                    social_tab : '社交账号',  
                },
                value:{
                    user_status_tab : '',
                },
                isActive : [],
                userInfo:[],
                session:[],
            }
        },
        beforeCreate(){
            this.get_session().then(res=>{
                if(res.data.uid > 0){
                    this.session = res.data;
                }else {
                    this.$router.push('/login');
                }
            });
        },
        created(){
            var self = this;
            var tab = this.$route.query.tab;
            if(tab == 'information'){
                self.value.user_status_tab = self.label.information_tab;
                self.isActive[0] = 1;
            }else if(tab == 'profile'){
                self.value.user_status_tab = self.label.profile_tab;
                self.isActive[1] = 1;
            }else if(tab == 'financial'){
                self.value.user_status_tab = self.label.financial_tab;
                self.isActive[2] = 1;
            }else if(tab == 'social'){
                self.value.user_status_tab = self.label.social_tab;
                self.isActive[3] = 1;
            }
            //获取user信息
            this.get_user_meta('*').then((res)=>{this.userInfo = res.data[0]});
        },
        methods:{
        },
        components : {
            information_tab,
            profile_tab,
            financial_tab,
            social_tab,
            common_header,
            common_footer,
        },
};
</script>