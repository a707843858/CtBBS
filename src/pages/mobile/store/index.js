import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        shareSwitch:false,
        loginAside:false,
        rightAside:false,
        leftAside:false,
        session:[],
    },
    mutations:{
        switch_rightAside(state){
            if(state.session.uid > 0){
                state.rightAside = !state.rightAside;
            }else{
                state.loginAside = !state.loginAside;
            } 
        },
        switch_leftAside(state){
            state.leftAside = !state.leftAside;
        },   
        shareSwitch(state){
            state.shareSwitch = !state.shareSwitch;
        },   
    },
    actions:{
        toLogin(context){
            context.commit('switch_leftAside',);
            context.commit('switch_rightAside');
        }
    }

})