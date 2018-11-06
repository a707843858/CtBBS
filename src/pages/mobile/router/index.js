import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/mobile/views/index.vue'
import lost from '@/pages/mobile/views/lost.vue'
import category from '@/pages/mobile/views/post/category.vue'
import article from '@/pages/mobile/views/post/view.vue'
import editor from '@/pages/mobile/views/post/editor.vue'
import zone from '@/pages/mobile/views/user/zone.vue'
import zone_home from '@/pages/mobile/views/user/zone_home.vue'
import zone_post from '@/pages/mobile/views/user/zone_post.vue'
import zone_info from '@/pages/mobile/views/user/zone_info.vue'
import profile from '@/pages/mobile/views/user/profile.vue'
import profile_infomation from '@/pages/mobile/views/user/profile_information.vue'
import profile_portrait from '@/pages/mobile/views/user/profile_portrait'
import profile_financial from '@/pages/mobile/views/user/profile_financial'
import profile_social from '@/pages/mobile/views/user/profile_social'
import profile_collect from '@/pages/mobile/views/user/profile_collect'
import profile_message from '@/pages/mobile/views/user/profile_message'



Vue.use(Router)

let router =  new Router({
  // mode:'history',
  routes: [
    {
      //首页
      path: '/',
      name: 'home',
      component: home,
      meta:{
        index:0,
        title:'aa',
      },
    },{
      //404页面
      path : '/lost',
      name : 'lost',
      component : lost ,
      meta:{
        index:1,
      },
    },{
      //帖子页
      path:'/article/:id(\\d+)',
      name:'article',
      component : article,
      meta:{
        index:2,
      },
    },{
      //分类页
      path:'/category/:tab',
      name:'category',
      component:category,
      meta:{
        index:1,
      }
    },{
      //个人中心（首页）
      path:'/profile',
      name:'profile',
      component : profile,
      meta:{
        index:1,
      }
    },{//基本资料
        path:'/profile/information',
        name:'profile_infomation',
        component:profile_infomation,
        meta:{
          index:5,
        }
    },{//修改头像
      path:'/profile/portrait',
      name:'profile_portrait',
      component:profile_portrait,
      meta:{
        index:5,
      }
    },{//我的钱包
      path:'/profile/financial',
      name:'profile_financial',
      component:profile_financial,
      meta:{
        index:5,
      }
    },{//社交信息
      path:'/profile/social',
      name:'profile_social',
      component:profile_social,
      meta:{
        index:5,
      }
    },{//我的收藏
      path:'/profile/collect',
      name:'profile_collect',
      component:profile_collect,
      meta:{
        index:5,
      }
    },{//我的消息
      path:'/profile/message',
      name:'profile_message',
      component:profile_message,
      meta:{
        index:5,
      }
    },{
      //空间
      path : '/zone/',
      name : 'zone', 
      component:zone,
      redirect: { name: 'lost' },
      meta:{
        index:2,
      },
      children : [
          {
            path:'home/:id(\\d+)',
            name:'zone_home',
            component:zone_home,
            meta:{
              index:0,
            },
          },
          {
            path:'post/:id(\\d+)',
            name:'zone_post',
            component:zone_post,
            meta:{
              index:1,
            },
          },
          {
            path:'info/:id(\\d+)',
            name:'zone_info',
            component:zone_info,
            meta:{
              index:2,
            },
          }
      ],      
     },{
      //发帖页面
      path:'/editor/:id(\\d+)',
      name:'editor',
      component:editor,
      meta:{
        index:1,
      },
    },{
      //友情链接
      path:'/link',
      name:'link',
      meta:{
        index:1,
      },
      // component:link,
    },
  ]
});

router.beforeEach((to,from,next) => {
    next();
})
router.afterEach((to,from)=>{
  window.scroll(0, 0);
});

export default router;
