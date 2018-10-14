<template>
<el-container>
    <!--顶部-->
        <common_header></common_header>        
    <!--主体-->
    <el-main class="erro_page"> 
            此页面找不到。    
    </el-main>
    <!--底部-->
    <el-footer>
        <common_footer></common_footer>         
    </el-footer>
</el-container>

</template>

<script>
import common_header from '@/pages/index/components/header';
import common_footer from '@/pages/index/components/footer';
export default {
    name:'lost',
    data(){
        return {
            
        }
    },
    components:{
        common_header,
        common_footer,
    },
}
</script>
