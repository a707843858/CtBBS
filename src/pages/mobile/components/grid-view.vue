<template>
    <div class="ct-grid-view" >
        <div class="hd" v-if="title || link" :class="{'border':border}">
            <span v-text="title"></span>
            <router-link :to="link" v-if="link">
                <i class="iconfont icon-gengduo float-right"></i>
            </router-link>
        </div>
        <div class="bd ct-row f-wrap">
                <div class="ct-col grid-item" :class="col"  v-for="(item,index) in data" :key="index">
                    <router-link :to="{name:'category',params:{tab:item.id}}">
                        <div class="logo"><img :src="item.icon" :alt="item.title" class="img"></div>
                        <div class="tit" v-text="item.title"></div>
                    </router-link>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ct-gird-view',
        props:['title','link','border','span','data'],
        data(){
            return {

            }
        },
        computed:{
            col(){
                return `ct-col-${this.span}`;
            }
        }
    }
</script>
