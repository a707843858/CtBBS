<template>
<el-container>
    <!--顶部-->
    <el-header>
        <common-header></common-header>        
    </el-header>
    <!--主体-->
    <el-main class="erro_page"> 
            此页面找不到。    
    </el-main>
    <!--底部-->
    <el-footer>
        <common-footer></common-footer>         
    </el-footer>
</el-container>

</template>

<script>
import header from '@/components/common/header';
import footer from '@/components/common/footer';
export default {
    name:'404',
    data(){
        return {
            
        }
    },
    components:{
        'common-header' : header,
        'common-footer' : footer,
    },
}
</script>
