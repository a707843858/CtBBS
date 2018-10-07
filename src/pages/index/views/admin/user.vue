<template>
    <div class="setting_box w-full">
        <el-card class="box-card cub_left bg-white  mb-3" shadow="never">
            <div slot="header"><div class="title">{{label.all_user}}</div></div>
        <!--User Serach-->
        <el-row type="flex" style="flex-wrap:wrap"  justify="space-between"  :gutter="20" class="search_box bg-white b-radius-5 w-full">
            <el-col :lg="4" :md="4" :sm="4" class="mb-3">
                <el-select size="small" v-model="value.search_meta">
                    <el-option v-for="(item,index) in search_options" :key="index" :label="item" :value="index" ></el-option>
                </el-select>
            </el-col>
            <el-col :lg="9" :md="9" :sm="9" class="mb-3">
                <el-input size="small" v-model="value.search_key"></el-input>
            </el-col>
            <el-col :lg="9" :md="9" :sm="9" :xs="12" class="mb-3">
                <el-button @click="userSearch(value.search_meta,value.search_key)" size="small">{{label.search}}</el-button>
            </el-col>
            <el-col :lg="2" :md="2" :sm="2" :xs="12" class="mb-3 ">
                <el-button size="small" class="float-right">{{label.batchOparation}}</el-button>
            </el-col>
            <!-- <el-button size="small"  class="align-top float-right" @click ="value.add_user_dialog = true ">{{label.add_user}}</el-button> -->   
        </el-row>          
        <!--User form-->
        <el-table :data="userData" border style="width: 100%;border-radius:5px;" class="tb-edit mb-3" highlight-current-row mix-height="690" ref="multipleTable">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column fixed  :label="label.id" width="50" type="index" prop="id" :index="tableIndex"></el-table-column>
            <!--nickName-->
            <el-table-column   :label="label.nick_name" width="100">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.nick_name" @change="userUpdate(scope.row.id,scope.row.nick_name,'nick_name')"></el-input><span>{{scope.row.nick_name}}</span>
                </template>
            </el-table-column>
            <!--realName-->
            <el-table-column  :label="label.real_name" width="90">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.real_name"   @change="userUpdate(scope.row.id,scope.row.real_name,'real_name')"></el-input><span>{{scope.row.real_name}}</span>
                </template>
            </el-table-column>
            <!--email-->
            <el-table-column  :label="label.email" width="120">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.email" @change="userUpdate(scope.row.id,scope.row.email,'email')"></el-input><span>{{scope.row.email}}</span>
                </template>
            </el-table-column>
            <!--Password-->
            <el-table-column width="150" :label="label.password">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.password" @change="userUpdate(scope.row.id,'password',scope.row.password)"></el-input>
                    <span>******</span>
                </template>
            </el-table-column>
            <!--age-->
            <el-table-column  :label="label.age" width="80">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.age" @change="userUpdate(scope.row.id,scope.row.age,'age')"></el-input><span>{{scope.row.age}}</span>
                </template>
            </el-table-column>
            <!--sex-->
            <el-table-column  :label="label.sex" width="95">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.sex" width="30" @change="userUpdate(scope.row.id,scope.row.sex,'sex')">
                        <el-option
                        v-for="item in sex_options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <span>{{scope.row.sex | sexToString}}</span>
                </template>
            </el-table-column>
            <!--sige-->
            <el-table-column  :label="label.sign" width="200">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.sign" type="textarea" rows="3" @change="userUpdate(scope.row.id,scope.row.sign,'sign')"></el-input>
                    <span>{{scope.row.sign}}</span>
                </template>
            </el-table-column>
            <!--QQ-->
            <el-table-column :label="label.qq" width="150">
                <template slot-scope="scope">
                    <el-input size="samll" v-model="scope.row.qq" @change="userUpdate(scope.row.id,scope.row.qq,'qq')"></el-input>
                    <span>{{scope.row.qq}}</span>
                </template>
            </el-table-column>
            <!-- Wechat -->
            <el-table-column :label="label.wechat" width="150">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.wechat" @change="userUpdate(scope.row.id,scope.row.wechat,'wechat')"></el-input>
                    <span>{{scope.row.wechat}}</span>
                </template>
            </el-table-column>
            <!--weibo-->
            <el-table-column :label="label.weibo" width="150">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.weibo" @change="userUpdate(scope.row.id,scope.row.weibo,'weibo')"></el-input>
                    <span>{{scope.row.weibo}}</span>
                </template>
            </el-table-column>
            <!--github-->
            <el-table-column :label="label.github" width="150">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.github" @change="userUpdate(scope.row.id,scope.row.github,'github')"></el-input>
                    <span>{{scope.row.github}}</span>
                </template>
            </el-table-column>
            <!--facebook-->
            <el-table-column  :label="label.facebook" width="150">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.facebook" @change="userUpdate(scope.row.id,scope.row.facebook,'facebook')"></el-input>
                    <span>{{scope.row.facebook}}</span>
                </template>
            </el-table-column>
            <!--alipay-->
            <el-table-column  :label="label.alipay" width="150">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.alipay" @change="userUpdate(scope.row.id,scope.row.alipay,'alipay')"></el-input>
                    <span>{{scope.row.alipay}}</span>
                </template>
            </el-table-column>
            <!--experience-->
            <el-table-column  :label="label.experience" width="70">
                <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.experience" @change="userUpdate(scope.row.id,scope.row.experience,'experience')"></el-input>
                    <span>{{scope.row.experience}}</span>
                </template>
            </el-table-column>
            <!--recieve Address-->
            <el-table-column  :label="label.recieve_address" width="150">
                <template slot-scope="scope">
                    <el-input size="small"  type="textarea" v-model="scope.row.recieve_address" @change="userUpdate(scope.row.id,scope.row.recieve_address,'recieve_address')"></el-input>
                    <span>{{scope.row.recieve_address}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" :label="label.control" width="100">
            <template slot-scope="scope">
                <el-button type="text" size="small" v-text="label.delete" class="d-inline" @click ="userDelete(scope.row.id,scope.row)"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <!--Pagination-->
        <div class="admin_pagination bg-white b-radius-3">
            <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="value.page_sizes" :page-size="value.page_size" layout="total, sizes, prev, pager, next, jumper" :total="value.page_total">
            </el-pagination>
        </div>   
        </el-card>
        <!--add User Dialog-->
        <el-dialog :title="label.add_user" :visible.sync="value.add_user_dialog" width="30%" :before-close="cleanAddUser">
            <el-alert :title="label.addUserTip" type="info" class="mb-3" :closable="false"></el-alert>
            <el-input size="small" v-model="value.add_user_email" prefix-icon="el-icon-message" :placeholder="label.emailInput" class="mb-3"></el-input>
            <el-input size="small" v-model="value.add_user_password" prefix-icon="el-icon-edit" :placeholder="label.passwordInput" class="mb-3"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cleanAddUser">{{label.cancel}}</el-button>
                <el-button type="primary" @click="userAdd(value.add_user_email,value.add_user_password)">{{label.confirm}}</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name:'admin_user',
    data(){
        return {
            label : {
                id:'ID',
                nick_name:'昵称',
                real_name:'真实姓名',
                email:'邮箱',
                age:'年龄',
                sex:'性别',
                sign:'个性签名',
                qq:'QQ',
                wechat:'微信',
                weibo : '微博',
                github:'Github',
                facebook:'Facebook',
                alipay:'支付宝',
                experience:'经验',
                recieve_address:'收货地址',
                password : '密码',
                delete:'删除',
                control:'操作',
                search : '搜索',
                batchOparation : '批量删除',
                add_user : '添加用户',
                emailInput : '请输入邮箱',
                passwordInput : '请输入密码',
                addUserTip : '* 填写新用户账号密码即可,注册成功会返回新用户UID',
                cancel : '取消',
                confirm : '确认',
                all_user:'所有用户',

            },
            value : {
                search_meta:'',
                search_key : '',
                add_user_dialog : false,
                add_user_email : '',
                add_user_password : '',
                loading : true,
                page_total : 0,
                curren_page : [],
                page_sizes : [10, 50, 100, 200,500],
                page_size : 10,
            },
            sex_options : [
                {label : '女',value:0},
                {label : '男',value:1},
                {label : '保密',value:2},
            ],            
            userData:[],
            search_options : [],       
        }
    },
    created(){
        //获取user全部信息
        var self = this ;
        function get_user_all(){
            return self.axios.post('/api/user/get_user_all',{start:0});
        };
        //获取总条数，用于分页
        function get_user_page_cout(){
            return self.axios.post('/api/common/get_total_count',{table:'user'});
        };
        //传输数据
        this.axios.all([get_user_all(),get_user_page_cout()]).then(this.axios.spread(function(userAll,pageTotal){
            self.userData = userAll.data;
            self.value.page_total = parseInt(pageTotal.data[0]['COUNT(*)']);
        }));
        //预设顶部搜索栏
        var search = {};
        for(var key in this.label ){
                search[key] = this.label[key];
                if(key == 'recieve_address'){
                    break;
                    return search;
                };
        };
        this.search_options = search ;
    },
    methods : {
        //设置每行的index
        tableIndex(index) {
            return this.userData[index].id;
        },
        //保存设置
        userUpdate(uid,value,meta){
            var self = this;
            console.log(uid,value,meta);
            this.axios.post('/api/admin/update_user_meta',{uid:uid,value:value,meta:meta}).then(function(res){
                console.log(res);
                self.$message({
                    type:'success',
                    message : res.data.msg,
                });
            });
        },
        //查询信息
        userSearch(meta,value){
            var self = this ;
            if(meta == 'sex'){
                if(value == '女'){
                    value = 0;
                }else if (value == '男'){
                    value = 1;
                }else {
                    value = 2;
                }
            };
            this.axios.post('/api/admin/search_user',{meta:meta,value:value}).then(function(res){
                console.log(res.data);
                self.userData = res.data;
            });
        },
        //删除用户
        userDelete(uid,row){
            var self = this ;
            this.axios.post('/api/admin/delete_user',{uid:uid}).then(function(res){
                if(res.data.status == 1){            
                    $('.current-row').remove();
                    self.$message({
                        type : 'seccess',
                        message : res.data.msg,
                    });
                }else{
                        self.$message({
                        type : 'error',
                         message : '删除失败',
                     });
                }
            });
        },
        //重置添加用户窗口数值为空
        cleanAddUser(){            
            this.value.add_user_dialog = false;
            this.value.add_user_email = '';
            this.value.add_user_password = '';
        },
        //添加新用户
        userAdd(email,password){
            var self = this ;
            if(email == ''){
                alert('账号不能为空');
                return;
            }else if(password == ''){
                alert('密码不能为空');
                return;
            }
            this.axios.post('/api/admin/add_user',{email:email,password:password}).then(function(res){
                self.value.add_user_dialog = false;
                console.log(res);
                self.$message({
                    type : 'success',
                    message : '添加用户成功。',
                    duration : 0,
                    showClose : true,
                });
                this.value.add_user_email = '';
                this.value.add_user_password = '';
            });
        },
        //修改每页显示的条数
        pageSizeChange(val) {
            this.value.page_size = val;
            console.log(this.value.page_size);
        },
        //点击换页后，获取页面的数据
        pageCurrentChange(val) {
            var self = this ;
            var start = (val-1) * this.value.page_size;
            this.axios.post('/api/user/get_user_all',{start:start}).then(function(res){
                self.userData = res.data;
            })
        },
    },

}
</script>