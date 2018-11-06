<template>
    <div class="ct-swipe">
        <van-swipe  :autoplay="autoplay" :height="height">
            <van-swipe-item v-for="item in data" :key="item.id" class="item">
                <router-link :to="item.link">
                    <img :src="item.url" class="img">
                    <div class="tit" v-text="item.title"></div>
                </router-link>
            </van-swipe-item>
        </van-swipe> 
    </div>
</template>

<script>
    export default {
        name:'ct-swipe',
        props:['data','autoplay','height'],
        data(){
            return {

            }
        }
    }
</script>
