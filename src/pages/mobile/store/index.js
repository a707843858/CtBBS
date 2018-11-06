import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        shareSwitch:false,
        loginAside:false,
        rightAside:false,
        leftAside:false,
        category:false,
        registerAside:false,
        pageLoad:false,
        pageLoadProgress:0,
        pageLoadProgressMax:0,
        login:false,
    },
    mutations:{
        switch_userStatus(state){
            state.rightAside = !state.rightAside;
        },
        switch_loginAside(state){
            state.loginAside = !state.loginAside;
        },
        switch_leftAside(state){
            state.leftAside = !state.leftAside;
        },  
        resetAside(state){
            state.loginAside == false;
            state.rightAside == false;
            state.leftAside  == false;
        },
        shareSwitch(state){
            state.shareSwitch = !state.shareSwitch;
        }, 
        categorySwith(state){
            state.category = !state.category;
        },
        switch_registerAside(state){
            state.registerAside = !state.registerAside;
        },
        pushPageLoad(state){
            state.pageLoadProgress++;
            if(state.pageLoadProgress >= state.pageLoadProgressMax){
                setTimeout(()=>{
                    state.pageLoad = false;
                },2000);
            };  
        },
        setPageLoad(state,n){
            state.pageLoad = true;
            state.pageLoadProgress = 0;
            state.pageLoadProgressMax = n;
        },
        switchLoginState(state){
            state.login = !state.login ;
        }
    },
    actions:{

    }

})