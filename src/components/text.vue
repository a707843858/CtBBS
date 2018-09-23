<template>
<div><vue-editor v-model="content"></vue-editor></div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
    name:'text',
    data(){
        return{
            content: '<h1>Some initial content</h1>'
        }
    },
    created(){
   
    },
    methods:{

},
components: {
      VueEditor
   },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.carousel_group,.background_group {position: relative;}
.carousel_group .el-card__body,.background_group .el-card__body {border-top: none;}
.carousel_group .el-tabs__header,.background_group .el-tabs__header {position: absolute;top: 17px;left: 144px;}
.carousel_group .el-tabs__header .el-tabs__item,.background_group .el-tabs__header .el-tabs__item {height: 20px;line-height: 20px;padding: 0 15px !important;border-radius: 3px;background: #c0c4cc;color: #fff;margin-right: 10px;}
.carousel_group .el-tabs__header .el-tabs__nav-wrap::after,.background_group .el-tabs__header .el-tabs__nav-wrap::after{background-color:transparent;}
.carousel_group .el-tabs__header .el-tabs__item.is-active,.background_group .el-tabs__header .el-tabs__item.is-active {color: #fff;background: #409EFF;}
.carousel_group .el-tabs__header .el-tabs__active-bar,.background_group .el-tabs__header .el-tabs__active-bar {display: none;}
.carousel_group .thumb {max-width: 368px;height:127px;border-radius: 3px;border: 1px solid #c0c4cc;}
.background_group .thumb {width:123px;height:80px;border-radius: 3px;border: 1px solid #c0c4cc;}
</style>
