import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/index/views/index'
import login from '@/pages/index/views/login'
import article from '@/pages/index/views/post/view'
import profile from '@/pages/index/views/user/profile'
import author from '@/pages/index/views/user/zone'
import lost from '@/pages/index/views/lost'
import editor from '@/pages/index/views/post/editor'
import link from '@/pages/index/views/link';
import category from '@/pages/index/views/post/category';



Vue.use(Router)

let router =  new Router({
  mode:'history',
  routes: [
    {
      //首页
      path: '/',
      name: 'home',
      component: home
    },{
      //404页面
      path : '*',
      name : 'lost',
      component : lost ,

    },{
      //登录页
      path:'/login',
      name : 'login',
      component : login
    },{
      //帖子页
      path:'/article/:id(\\d+)',
      name:'article',
      component : article,
    },{
      //分类页
      path:'/category/:tab',
      name:'category',
      component:category,
    },{
      //编辑资料
      path:'/profile/:tab',
      name:'profile',
      component : profile,
    },{
      //空间
      path : '/author/:id(\\d+)/:tab',
      name : 'author',
      component : author
     },{
      //发帖页面
      path:'/editor/:id(\\d+)',
      name:'editor',
      component:editor,
    },{
      //友情链接
      path:'/link',
      name:'link',
      component:link,
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   let userAgent = navigator.userAgent.toLowerCase();
//   let _userAgent = (userAgent.match(/iphone/i) && 'iphone') || (userAgent.match(/ipad/i) && 'ipad') || (userAgent.match(/ipod/i) && 'ipod') || (userAgent.match(/midp/i) && 'midp') || (userAgent.match(/android/i) && 'android') || (userAgent.match(/blackberry/i) && 'blackberry') || (userAgent.match(/hpwos/i) && 'hpwos') || (userAgent.match(/symbian/i) && 'symbian') || (userAgent.match(/windows phone/i) && 'windows phone') || (userAgent.match(/ucweb/i) && 'ucweb') || 'pc';
//   let _isMobile = _userAgent.match(/(iphone|ipad|ipod|midp|android|blackberry|hpwos|symbian|windows phone|ucweb)/i)?true:false;
//   let url = '/app#/'+ to.path;
//   console.log(url);
//   if(_isMobile){
//     router.push(url);
//   }
//   console.log(userAgent);
//   console.log(_userAgent);
//   console.log( _isMobile);
//   console.log(to.path);
//   next();
// });

export default router;