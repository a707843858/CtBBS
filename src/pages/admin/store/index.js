import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        leftAside:false,
    },
    mutations:{
        leftAsideSwitch(state){
            state.leftAside = !state.leftAside;
        }
    },
    actions:{

    },

})