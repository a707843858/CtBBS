import common_header from '@/pages/index/components/header.vue';
import common_footer from '@/pages/index/components/footer.vue';
import post_sm from '@/pages/index/components/post_sm.vue';

export default {
    install(Vue,options) {
        Vue.component('common_header',common_header);
        Vue.component('common_footer',common_footer);
        Vue.component('post_sm',post_sm);
    }
};

