import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router'
import apply from './assets/js/apply_config';
import Mint from 'mint-ui'; 
import 'mint-ui/lib/style.css'
// import fn from '@/assets/js/function';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import store from './store'
import * as commonFilter  from '@/assets/js/filter';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import components from '@/pages/mobile/assets/js/components.js';
//全局注册
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Mint); 
Vue.use(apply.fn);
// Vue.use(fn);
Vue.use(components);
Vue.use(Vant);
Vue.use(commonFilter);
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
      hljs.highlightBlock(block)
  })
});


let app = new Vue({
  el: '#app',
  router,
  store,
  apply,
  render: h => h(App)
})


Vue.use({app})