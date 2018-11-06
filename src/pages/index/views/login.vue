<template>
<el-container>    
    <el-main class="login_page">
            <div class="hd d-none"></div>
            <el-tabs class="login_card" v-model="value.tab">
                <!--登录框--> 
                <el-tab-pane label="登录" name="login" class="login_box">
                    <el-input v-model="login.account" :placeholder="label.account" class="mb-3"></el-input>
                    <el-input v-model="login.password" :placeholder="label.password" class="mb-3" type="password"></el-input>
                    <el-button class="config_btn" @click="Login(login)" >{{label.config}}</el-button> 
                </el-tab-pane>
                <!--忘记密码-->
                <el-tab-pane label="忘记密码" name="forget" class="forget_box">
                    <el-input v-model="value.forget" :placeholder="label.account" style="margin-bottom:4.5rem;"></el-input>
                    <el-button class="config_btn" @click="develope()" >{{label.config}}</el-button>
                </el-tab-pane>
            </el-tabs>
            <!-- <el-row type="flex" class="w-frap container bd d-none" justify="center"> -->
                <!--忘记密码框-->
                    <!-- <el-col :lg="12" :md="12" :sm="12" :xs="20" class="forget_box" id="forget_box">
                        <div class="title">{{label.forget_password}}</div> -->
                        <!--账号-->
                        <!-- <div class="input input-line-animation" id="forget_account">
                            <label>{{label.account}}</label>
                            <input type="text" class="el-input__inner" v-model="value.account" @focus="addInputAnimation('forget_account')" @blur="removeInputAnimation('forget_account')">
                        </div> -->
                        <!--确认按钮-->
                        <!-- <div class="text-center">
                                <el-button class="login_btn" @click="develope()">{{label.config}}</el-button>                 
                        </div> -->
                        <!--切换导航-->
                        <!-- <div class="btm_nav">
                            <el-button type="text" class="float-right" @click="loginAnimation('hide')">
                                <span class="mr-1">{{label.login}}</span>&bull;&bull;<i class="iconfont icon-jiantou"></i><i class="iconfont icon-jiantou-you ml-1"></i>
                            </el-button>
                        </div>
                    </el-col> -->
                <!--登录框-->                
                    <!-- <el-col :lg="12" :md="12" :sm="12" :xs="20" class="login_box" id="login_box">
                            <div class="title">{{label.login}}</div> -->
                            <!--帐号框-->
                            <!-- <div class="input-line-animation input" id="account_input">
                                <label>{{label.account}}</label>
                                <input class="el-input__inner" v-model="login.account" @focus="addInputAnimation('account_input')" @blur="removeInputAnimation('account_input')">
                            </div> -->
                            <!--密码框-->
                            <!-- <div class="input-line-animation input" id="password_input">
                                <label>{{label.password}}</label>
                                <input class="el-input__inner" v-model="login.password" @focus="addInputAnimation('password_input')" @blur="removeInputAnimation('password_input')">
                            </div> -->
                            <!--登录按钮-->
                            <!-- <div class="text-center">
                                <el-button class="login_btn" @click="Login(login.account,login.password)">{{label.config}}</el-button>                        
                            </div> -->
                            <!--切换导航-->
                            <!-- <el-row type="flex" class="btm_nav f-wrap" justify="space-between">
                                <el-col :lg="3" :sm="5">
                                    <el-button type="text"  @click="loginAnimation('toForget')">
                                        <i class="iconfont icon-zuojiantou"></i>&bull;&bull;<span class="ml-1 mr-1">{{label.forget_password}}</span><span class="circle-right ml-l">&bull;&bull;</span>
                                    </el-button>
                                </el-col>
                                <el-col :lg="3" :sm="4">
                                    <a href="/" ><el-button type="text">&bull;&bull;<span class="mr-1 ml-1">{{label.toHome}}</span>&bull;&bull;</el-button></a>
                                </el-col>
                                <el-col :lg="3" :sm="6">
                                    <el-button type="text"  @click="loginAnimation('toRegister')"><span class="circle-left">&bull;&bull;</span>
                                        <span class="mr-1">{{label.register}}</span>&bull;&bull;<i class="iconfont icon-jiantou"></i>
                                    </el-button>
                                </el-col>

                            </el-row>
                    </el-col> -->
                <!--注册-->
                    <!-- <el-col :lg="12" :md="12" :sm="12" :xs="20" class="register_box" id="register_box">
                        <div class="title">{{label.register}}</div> -->
                        <!--账号框-->
                        <!-- <div class="input-line-animation input" id="register_account">
                            <label>{{label.account}}</label>
                            <input class="el-input__inner" type="text" v-model="register.account" @focus="addInputAnimation('register_account')" @blur="removeInputAnimation('register_account')">
                        </div> -->
                        <!--昵称框-->
                        <!-- <div class="input-line-animation input" id="register_nick_name">
                            <label>{{label.nick_name}}</label>
                            <input class="el-input__inner" type="text" v-model="register.nick_name" @focus="addInputAnimation('register_nick_name')" @blur="removeInputAnimation('register_nick_name')">
                        </div> -->
                        <!--密码-->
                        <!-- <div class="input-line-animation input" id="register_password">
                            <label>{{label.password}}</label>
                            <input class="el-input__inner" type="text" v-model="register.password" @focus="addInputAnimation('register_password')" @blur="removeInputAnimation('register_password')">
                        </div>  -->
                        <!--重复密码-->
                        <!-- <div class="input-line-animation input" id="register_rpwd">
                            <label>{{label.repeat_password}}</label>
                            <input class="el-input__inner" type="text" v-model="register.r_password" @focus="addInputAnimation('register_rpwd')" @blur="removeInputAnimation('register_rpwd')">
                        </div>  -->
                        <!--注册按钮-->
                        <!-- <div class="text-center">
                            <el-button class="login_btn" @click="Register(register)">{{label.config}}</el-button>                        
                        </div> -->
                        <!--切换导航-->
                        <!-- <div class="btm_nav">
                            <el-button type="text" class="float-left" @click="loginAnimation('hide')">
                                <i class="iconfont icon-zuojiantou"></i>&bull;&bull;<span class="ml-1">{{label.login}}</span>
                            </el-button>
                        </div>                                               -->
                    </el-col>    
            <!-- </el-row> -->
    </el-main>
</el-container>
</template>



<script>
export default {
  name: 'login' ,
  data(){
      return {
          label : {
            login:'会员登录',
            register:'会员注册',
            account:"邮箱",
            password:'密码',
            repeat_password:'重复密码',
            forget_password:'忘记密码',
            nick_name:'昵称',
            config:'确认',
            toHome:'返回首页',
          },
          value:{
              account:'',
              tab:'login',
              forget:'',
          },
            login:{account:'',password:'',},
      }
  },
  created(){    
  },
  methods:{ 
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        },
    },
};

</script>