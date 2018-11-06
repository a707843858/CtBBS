<template>
  <div id="app" class="admin-wrap ct-row" v-cloak>
        <ct-aside></ct-aside>
        <div class="ct-page-wrap" :class="{'page-over':$store.state.leftAside}">
            <ct-header></ct-header> 
            <router-view/> 
            <ct-footer></ct-footer>
        </div>  
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
  },
};
</script>

