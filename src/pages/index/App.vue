<template>
  <div id="app" v-cloak>
    <common_header></common_header> 
 <router-view/>  
    <el-footer>
        <common_footer></common_footer>         
    </el-footer>   
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
  },
};
</script>