<template>
        <div class="container zone_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
            <div class="zone_hd">
                <m_header style="background:none;"></m_header>
                <div class="user_info">
                    <div class="user_line"></div>
                    <div class="user_container">
                        <div class="user_avatar">
                            <img :src="`/static/img/avatar/${userInfo.avatar_url}`" :alt="userInfo.nick_name">
                        </div>
                        <div class="user_info">
                            <span class="nick_name" v-text="userInfo.nick_name"></span><small class="ml-2" v-text="`Lv.0`"></small>
                            <div class="sign" v-text="userInfo.sign"></div>
                        </div>
                        <div class="user_control">
                                <div class="pcount"><span v-text="label.post"></span> / {{userInfo.post}}</div>
                                <li class="follow"><i class="iconfont icon-guanzhu"></i><span v-text="label.follow"></span></li>
                                <li class="message"><i class="iconfont icon-liaotian"></i><span v-text="label.send_message"></span></li>
                        </div>
                    </div>
                </div>
                <div class="bg_mask" :style="`background:url('/static/img/avatar/${userInfo.avatar_url}')`"></div>
            </div>
            <div class="zone_nav">
                <router-link :to="{name:'author',params:{tab:'home',id:$route.params.id}}"><span v-text="label.home"></span></router-link>
                <router-link :to="{name:'author',params:{tab:'post',id:$route.params.id}}"><span v-text="label.dynamic"></span></router-link>
                <router-link :to="{name:'author',params:{tab:'info',id:$route.params.id}}"><span v-text="label.info"></span></router-link>
            </div>
            <div class="zone_container">
                <m_zone_home v-if="$route.params.tab == 'home'"></m_zone_home>
                <m_zone_post v-else-if="$route.params.tab == 'post'"></m_zone_post>
                <m_zone_info v-else-if="$route.params.tab == 'info'"></m_zone_info>
            </div>
        </div>
</template>

<script>
import m_header from '@/pages/mobile/components/header'
import m_zone_home from '@/pages/mobile/views/user/zone_home'
import m_zone_post from '@/pages/mobile/views/user/zone_post'
import m_zone_info from '@/pages/mobile/views/user/zone_info'
export default {
    name:'m_zone',
    data(){
        return {
            label:{
                follow:'关注',
                send_message:'私信',
                home:'首页',
                post:'创作',
                info:'资料',
                dynamic:'动态',
            },
            userInfo:[],
        }
    },
    created(){
        this.get_user({uid:this.$route.params.id}).then(res=>{this.userInfo = res.data[0];});
    },
    components:{
        m_header,
        m_zone_home,
        m_zone_post,
        m_zone_info,
    },
}
</script>

