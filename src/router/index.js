import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/page/home'
import login from '@/components/page/login'
import article from '@/components/post/view'
// import text from '@/components/text'
import user_index from '@/components/user/user'
import zone from '@/components/user/zone'
import notFound from '@/components/page/404'
import admin from '@/components/admin/index'
import post_editor from '@/components/post/editor'
import link from '@/components/page/link';
import text from '@/components/common/post_editor'
import category from '@/components/post/category';



Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      //text
      path:'/text',
      name:'text',
      component:text,
    },{
      //首页
      path: '/',
      name: 'home',
      component: home
    },{
      //404页面
      path : '*',
      name : 'notFound',
      component : notFound ,

    },{
      //登录页
      path:'/login',
      name : 'login',
      component : login
    },{
      //帖子页
      path:'/article',
      name:'article',
      component : article 
    },{
      //分类页
      path:'/category',
      name:'category',
      component:category,
    },{
      //编辑资料
      path:'/profile',
      name:'user',
      component : user_index,
    },{
      //管理台
      path : '/admin',
      name : 'admin',
      component : admin ,
    },{
      //空间
      path : '/author',
      name : 'zone',
      component : zone
     },{
      //发帖页面
      path:'/editor',
      name:'post_editor',
      component:post_editor,
    },{
      //友情链接
      path:'/link',
      name:'link',
      component:link,
    }
  ]
})
