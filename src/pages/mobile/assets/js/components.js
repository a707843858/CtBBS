import header from '@/pages/mobile/components/header.vue'
import share from '@/pages/mobile/components/share.vue'
import category_list from '@/pages/mobile/components/category-list.vue'
import post_xs from '@/pages/mobile/components/post-xs.vue'
import post_sm from '@/pages/mobile/components/post-sm.vue'
import post_md from '@/pages/mobile/components/post-md.vue'
import comment from '@/pages/mobile/components/comment.vue'
import swipe from '@/pages/mobile/components/swipe.vue'
import grid_view from '@/pages/mobile/components/grid-view.vue'
import ct_aside from '@/pages/mobile/components/aside.vue'
import ct_page_load from '@/pages/mobile/components/page-load.vue'

export default {
    install(Vue){
        Vue.component('ct-header',header);
        Vue.component('ct-share',share);
        Vue.component('ct-category-list',category_list);
        Vue.component('ct-post-xs',post_xs);
        Vue.component('ct-post-sm',post_sm);
        Vue.component('ct-post-md',post_md);
        Vue.component('ct-comment',comment);
        Vue.component('ct-swipe',swipe);
        Vue.component('ct-grid-view',grid_view);
        Vue.component('ct-aside',ct_aside);
        Vue.component('ct-page-load',ct_page_load);
    }
}