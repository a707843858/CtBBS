<template>
<el-container>       
    <!--主体-->
        <el-main class="user_page"> 
            <div class="user-max-wrap mx-auto container">
                <!--用户面板-->
                    <el-row type="flex" class="user_tab">
                        <!--左侧导航-->
                            <el-col :lg="4" :md="4" :sm="4" :xs="3" class="tab_guide">
                                    <a ><i class="iconfont icon-yonghuzhongxin"></i><span v-text="label.user_status_name"></span></a>
                                    <router-link :to="{name:'profile',params:{tab:'information'}}"><i class="iconfont icon-wendangzhongxin"></i><span v-text="label.information_tab"></span></router-link>
                                    <router-link :to="{name:'profile',params:{tab:'profile'}}" ><i class="iconfont icon-user"></i><span  v-text="label.profile_tab"></span></router-link>
                                    <router-link :to="{name:'profile',params:{tab:'financial'}}"><i class="iconfont icon-qianbao"></i><span  v-text="label.financial_tab"></span></router-link>
                                    <router-link :to="{name:'profile',params:{tab:'social'}}"><i class="iconfont icon-shejiao"></i><span v-text="label.social_tab"></span></router-link>
                                    <router-link :to="{name:'profile',params:{tab:'collect'}}"><i class="iconfont icon-shoucang"></i><span v-text="label.collect_tab"></span></router-link>
                            </el-col>
                        <!--右侧内容-->
                            <el-col :lg="20" :md="20" :sm="20"  :xs="21" class="tab_container">
                                    <div class="hd">
                                        <span v-text="value.user_status_tab" class="tit"></span>
                                        <div class="float-right collect_guide" v-if="isActive[4] == 1">
                                            <span :class="{'active':value.collect_tab == 'post'}"  @click="value.collect_tab = 'post'">帖子</span>
                                            <span :class="{'active':value.collect_tab == 'category'}" @click="value.collect_tab = 'category'" >版块</span>
                                        </div>
                                    </div>
                                    <div class="bd" :class="`${$route.params.tab}_tab`">
                                        <information v-if="isActive[0] == 1" :userInfo="userInfo" :session="session"></information>
                                        <portrait v-else-if="isActive[1] == 1" :userInfo="userInfo" :session="session"></portrait>
                                        <financial v-else-if="isActive[2] == 1" :userInfo="userInfo" :session="session"></financial>
                                        <social v-else-if="isActive[3] == 1" :userInfo="userInfo" :session="session"></social>                 <collect v-else-if="isActive[4] == 1" :collect_tab="value.collect_tab"></collect>                
                                    </div>
                            </el-col>
                    </el-row>
            </div>        
        </el-main>           
</el-container>
</template>


<script>
import common_header from '@/pages/index/components/header';
import common_footer from '@/pages/index/components/footer';
import information from '@/pages/index/views/user/profile_information';
import portrait from '@/pages/index/views/user/profile_portrait';
import financial from '@/pages/index/views/user/profile_financial';
import social from '@/pages/index/views/user/profile_social';
import collect from '@/pages/index/views/user/profile_collect';
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
                    collect_tab:'我的收藏',
                },
                value:{
                    user_status_tab : '',
                    collect_tab:'post',
                },
                isActive : [],
                userInfo:[],
                session:[],
            }
        },
        beforeCreate(){
            // this.get_session().then(res=>{
            //     console.log(res.data.uid);
            //     if(res.data.uid){
            //         this.session = res.data;
            //     }else {
            //         this.$router.push('/login');
            //     }
            // });
        },
        created(){
            var self = this;
            var tab = this.$route.params.tab;
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
            }else if(tab == 'collect'){
                self.value.user_status_tab = self.label.collect_tab;
                self.isActive[4] = 1;
            }
            //获取user信息
            this.get_user({uid:0}).then((res)=>{this.userInfo = res.data[0]});
        },
        methods:{
        },
        components : {
            information,
            portrait,
            financial,
            social,
            collect,
            common_header,
            common_footer,
        },
};
</script>