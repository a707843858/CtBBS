
exports.install = function (Vue, options) {
//开发中提示
Vue.prototype.develope = function(){
    this.$message({
        type:'warning',
        message:'开发中.....',
    });
}
//保存失败的时候显示
Vue.prototype.showFail = function(status){
    if(status != 1){
        this.$message({
            type : 'warning',
            message : '操作失败,请稍候再试。',
        });
    }
};
//登录页,跳转注册框
Vue.prototype.loginAnimation = function(tab){
    if(tab == 'toRegister'){
        $('#login_box').addClass('rotateToHide');
        $('#register_box').addClass('rotateToShow');
    }else if(tab == 'toForget'){
        $('#login_box').addClass('rotateToHide');
        $('#forget_box').addClass('rotateToShow');
    }else if(tab == 'hide'){
        $('#login_box').removeClass('rotateToHide');
        $('#register_box').removeClass('rotateToShow');
        $('#forget_box').removeClass('rotateToShow');
    }
}
//输入框下划线动画
Vue.prototype.addInputAnimation = (id) => {
    $(`#${id}`).addClass('input-is-focused');        
}
Vue.prototype.removeInputAnimation = (id) =>{
    var val = $(`#${id} .el-input__inner` ).val();
    if(val.length <= 0){
        $('#'+id ).removeClass('input-is-focused');        
    }
}
//获取网址tab名称
Vue.prototype.getUrlTab = function(){
    var arr = location.pathname.slice(1).split('=');
    var res = [];
    for(let i= 0;i<arr.length;i+=2){
        if(arr[i++].length>0){
            res[arr[i]] =  arr[i++];
        }else{
            res[arr[i]] = '';
        }
    }
    return res;
}
//登录
Vue.prototype.Login = function(account,password){
    var self = this;
    if(account.trim().length == 0 ){
        this.$message({
            type:'warning',
            message:'帐号不能为空',
        });
    }else if(password.trim().length == 0){
        this.$message({
            type:'warning',
            message:'密码不能为空',
        });
    }else {
        this.axios.post('/api/user/login',{account:account,password:password}).then(function(res){
            console.log(res.data.status);
            if(res.data.status == 1){
                self.$router.push('/');
                console.log(res.date.status);
            }else {
                self.$message({
                    type:'warning',
                    msg:re.date.msg,
                });
            }
        });        
    }

}

}