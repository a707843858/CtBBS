<template>
  <div id="app" v-cloak >
    <div class="page_wrap">
      <router-view/>  
    </div>
    <m_aside></m_aside>      
  </div>
</template>

<script>
import m_aside from '@/pages/mobile/components/aside'
export default {
  name: 'Mobile',
  created(){
  },
  mounted(){
  },
  components:{
    m_aside,
  },
};
</script>