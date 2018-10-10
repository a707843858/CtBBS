import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/mobile/views/index.vue'
import lost from '@/pages/mobile/views/lost.vue'
import category from '@/pages/mobile/views/post/category.vue'
import article from '@/pages/mobile/views/post/view.vue'
import editor from '@/pages/mobile/views/post/editor.vue'
import author from '@/pages/mobile/views/user/zone.vue'
import profile from '@/pages/mobile/views/user/profile.vue'

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
      name : 'lost',
      component : lost ,

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
      //管理台
      path : '/admin',
      name : 'admin',
      // component : admin ,
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
      // component:link,
    },
  ]
})
