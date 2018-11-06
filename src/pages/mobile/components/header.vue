<template>
<div class="m_header" :class="[{'bg-none' : !$store.state.pageLoad && tab == 'zone'},{'hide_header':$store.state.loginAside}]">
    <div class="ct-header text-center" >
        <div class="ct-header-nav">
            <div class="float-left ct-header-left" @click="$router.go(-1)" v-if="back" ><i class="iconfont icon-jiantou-zuo"></i></div>
            <div class="float-left ct-header-left"  @click="$store.commit('switch_leftAside')" v-else ><i class="iconfont icon-fenlei"></i></div>
            <div class="ct-header-title" v-if="tab == 'category'" @click="$store.commit('categorySwith');"><span v-text="title"></span><i class="iconfont icon-jiantou-xia" :class="{'rotate-180':$store.state.category}"></i></div>
            <div class="ct-header-title" v-text="title" v-else></div>
            <div class="float-right ct-header-left"  @click="changRight" v-if="!hideUser"><i class="iconfont icon-user"></i></div>            
        </div>
        
    </div>
</div>

</template>

<script>
    export default {
        name:'m_header',
        props:['title','loginAside','back','hideUser','tab'],
        data(){
            return {
                session:[],
            }
        },
        created(){
            this.get_session().then(res=>{this.session = res.data;});  
        },
        methods:{
            changRight(){
                if(this.session.uid){        
                    this.$store.commit('switch_userStatus');
                }else{
                    this.$store.commit('switch_loginAside');
                }
            }
        },
        watch:{
            '$store.state.login'(){
                this.get_session().then(res=>{this.session = res.data;});
            }
        }
}
</script>
