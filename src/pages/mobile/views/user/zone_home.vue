<template>
    <div class="home_wrap">
        <!--  -->
        <div class="user_info m_card">
            <div class="hd">
                <span v-text="label.introduce"></span>
                <router-link :to="{name:'zone_info',params:{id:$route.params.id}}" class="float-right"><i class="iconfont icon-gengduo"></i></router-link>
            </div>
            <div class="bd">
                <!-- <div>{{userInfo}}</div> -->
                <div class="item"><i class="iconfont icon-user"></i><span v-text="userInfo.nick_name"></span></div>
                <div class="item"><i class="iconfont icon-idcard"></i><span v-text="userInfo.id"></span></div>
                <div class="item"><i class="iconfont icon-fensi"></i><span v-text="userInfo.fans"></span></div>
                <div class="item"><i class="iconfont icon-weizhi"></i><span v-text="userInfo.city"></span></div>
            </div>
        </div>
        <div class="post_data m_card">
            <div class="hd">
                <span v-text="label.representative"></span>
                <router-link :to="{name:'zone_post',params:{id:$route.params.id}}" class="float-right"><i class="iconfont icon-gengduo "></i></router-link>
            </div>
            <div class="bd" v-if="postData">
                <router-link :to="{name:'article',params:{id:item.pid}}" v-for="item in postData" :key="item.pid"><span v-text="item.title"></span></router-link>
            </div>
            <div class="bd" v-else><div class="empty_tip"><i class="iconfont icon-kulian"></i><p v-text="label.empty_tip"></p></div></div>
        </div>
    </div>
</template>

<script>
export default {
    name:'m_zone_home',
    data(){
        return {
            label:{
                empty_tip:'Ta还没有发布帖子哦',
                introduce:'个人简介',
                representative:'代表作',
            },
            userInfo:[],
            postData:[],
        }
    },
    created(){
        this.get_user({uid:this.$route.params.id}).then(res=>{this.userInfo = res.data[0];});
        this.get_post({start:0,limit:5,sort:'desc',uid:this.$route.params.id}).then(res=>{this.postData = res.data;});
    },
}
</script>

