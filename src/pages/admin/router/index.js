import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/index.vue';
import blog from '../views/blog.vue'
import carousel from '../views/carousel.vue'
import background from '../views/background.vue'
import user from '../views/user.vue'
import post from '../views/post.vue'

Vue.use(Router);

export default new Router ({
    routes:[
        {//首页
            path:'/',
            name:'home',
            component:home,
        },{//基础设置
            path:'/blog',
            name:'blog',
            component:blog,
        },{   //轮播图
            path:'/carousel',
            name:'carousel',
            component:carousel,
        },{ //背景图
            path:'/background',
            name:'background',
            component:background,
        },{//用户管理
            path:'/user',
            name:'user',
            component:user,
        },{//文章管理
            path:'/post',
            name:'post',
            component:post,
        }
    ]
});