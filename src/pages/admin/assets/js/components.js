import ct_header from '../../components/header.vue'
import ct_aside from '../../components/aside.vue'
import ct_footer from '../../components/footer.vue'

export default {
    install(Vue,options) {
        Vue.component('ct-header',ct_header);
        Vue.component('ct-aside',ct_aside);
        Vue.component('ct-footer',ct_footer);
    }
};