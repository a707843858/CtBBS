import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/mobile/views/index.vue'
import category from '@/pages/mobile/views/post/category.vue'
import article from '@/pages/mobile/views/post/view.vue'


Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      //首页
      path: '/',
      name: 'home',
      component: home
    },{
      //404页面
      path : '*',
      name : 'notFound',
      // component : notFound ,

    },{
      //登录页
      path:'/login',
      name : 'login',
      // component : login
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
      // component : profile,
    },{
      //管理台
      path : '/admin',
      name : 'admin',
      // component : admin ,
    },{
      //空间
      path : '/author/:id(\\d+)/:tab',
      name : 'author',
      // component : author
     },{
      //发帖页面
      path:'/editor/:id(\\d+)',
      name:'editor',
      // component:editor,
    },{
      //友情链接
      path:'/link',
      name:'link',
      // component:link,
    },
  ]
})
