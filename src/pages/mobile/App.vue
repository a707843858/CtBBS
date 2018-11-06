<template>
  <div id="app" v-cloak >   
        <transition :name="transitionName">
          <router-view ></router-view>
        </transition>  
  </div>
</template>

<script>
export default {
  name: 'Mobile',
  data(){
    return {
      transitionName:'slide-fade',
      pre_url:'',
    }
  },
  created(){
    this.mobileScale();
    this.get_session().then(res=>{res.data.uid && this.$store.commit('switchLoginState');});
  },
  watch: {//使用watch 监听$router的变化
      $route(to, from,next) {
          window.scroll(0, 0)
          if(to.meta.index > 0){
              if( to.meta.index < from.meta.index){
                  this.transitionName = 'slide-right';
              }else{
                  this.transitionName = 'slide-left';
              }
          }else if(to.meta.index == 0 && from.meta.index > 0){
              this.transitionName = 'slide-right';
          }
          this.$store.state.leftAside = false ;
          this.$store.state.rightAside = false ;
          this.$store.state.loginAside = false ;
      }
    }
};
</script>


