<template>
<div class="m_header">
    <mt-header :title="title" :class="{'hide_header':$store.state.loginAside}">
        <mt-button slot="left" @click="$router.go(-1)" v-if="back"><i class="iconfont icon-jiantou-zuo"></i></mt-button>
        <mt-button slot="left" @click="$store.commit('switch_leftAside')" v-else><i class="iconfont icon-fenlei"></i></mt-button>
        <mt-button slot="right" @click="$store.commit('switch_rightAside')" v-if="!hideUser"><i class="iconfont icon-user"></i></mt-button>
    </mt-header>
</div>

</template>

<script>
    export default {
        name:'m_header',
        props:['tab','title','session','loginAside','back','hideUser'],
        data(){
            return {
                    
            }
        },
}
</script>
