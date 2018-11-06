<template>
    <div class="category-list" :class="{'active':$store.state.category}">
        <router-link :to="{name:'category',params:{tab:'all'}}" v-text="label.all"></router-link>
        <router-link :to="{name:'category',params:{tab:item.id}}" v-for="item in data" :key="item.id" v-text="item.title"></router-link>
    </div>
</template>

<script>
    export default {
        name:'category-list',
        props:['data'],
        data(){
            return {
                label:{
                    all:'全部',

                },
            }
        }
    }
</script>