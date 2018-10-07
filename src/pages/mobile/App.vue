<template>
  <div id="app" v-cloak >
 <router-view/>     
  </div>
</template>

<script>
export default {
  name: 'Mobile',
  created(){
    this.get_session().then(res=>{this.$store.state.session = res.data;});
  },
};
</script>