import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router'
import axios from 'axios';
import Mint from 'mint-ui'; 
import 'mint-ui/lib/style.css'
import fn from '@/assets/js/fn/function';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import store from './store'
import * as commonFilter  from '@/assets/js/filter';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
//全局注册
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.axios = axios;
Vue.use(Mint); 
Vue.use(fn);
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
  axios,
  store,
  render: h => h(App)
})


Vue.use({app})