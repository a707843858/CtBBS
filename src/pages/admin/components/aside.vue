<template>
    <div class="ct-aside" :class="{'aside-hide':$store.state.leftAside}">
        <div class="logo"><span>C</span><span class="title">AT ADMIN</span></div><!--<span>CAT ADMIN</span> -->
        <div class="ct-aside-nav">
            <el-collapse v-model="value.menu_tab" accordion>
                <router-link  :to="{name:'home'}" class="collapse-menu">
                    <i class="iconfont icon-test"></i><span v-text="label.dashboard" class="title"></span>
                </router-link>
                <el-collapse-item name="home">
                    <template slot="title">
                    <i class="iconfont icon-shezhi"></i><span v-text="label.baseSetting" class="title"></span>
                    </template>
                    <router-link :to="{name:'blog'}"><span v-text="label.blog_setting"></span></router-link>
                    <router-link :to="{name:'carousel'}"><span v-text="label.carousel"></span></router-link>
                    <router-link :to="{name:'background'}"><span v-text="label.background"></span></router-link>
                </el-collapse-item>
                <el-collapse-item name="user">
                    <template slot="title">
                    <i class="iconfont icon-user" style="font-size:18px;"></i><span class="title" v-text="label.user" ></span>
                    </template>
                    <router-link :to="{name:'user'}"><span v-text="label.user_control"></span></router-link>
                    <router-link :to="{name:'user_group'}"><span v-text="label.user_group"></span></router-link>
                </el-collapse-item>
                <el-collapse-item name="post">
                    <template slot="title">
                        <i class="iconfont icon-nav-log-center"></i><span class="title" v-text="label.post"></span>
                    </template>
                    <router-link :to="{name:post}"><span v-text="label.post_control"></span></router-link>
                    <router-link :to="{name:post_category}"><span v-text="label.post_category"></span></router-link>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="ct-copy-right" v-text="value.copyRight" v-show="!$store.state.leftAside"></div>
    </div>
</template>

<script>
    export default {
        name:'ct-aside',
        data(){
            return {
                label:{
                   dashboard:'仪表盘',
                   baseSetting:'基本设置',
                   blog_setting:'网页设置',
                   carousel:'轮播图',
                   background:'背景图',
                   user:'用户',
                   user_control:'用户管理',
                   user_group:'用户组',
                   post:'文章',
                   post_control:'文章管理',
                   post_category:'分类管理',

                },
                value:{
                    menu_tab:'',
                    copyRight:'© 2018 | CHUANGSHE.INC',
                },
            }
        }
    }
</script>
