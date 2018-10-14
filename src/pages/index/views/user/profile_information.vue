<template>
<div class="container">
        <!--ID-->
            <el-col :lg="8"><el-input :disabled="true" size="small" v-model="userInfo.uid"><template slot="prepend">UID</template></el-input></el-col>
        <!--用户名-->
            <el-col :lg="10"><el-input size="small"  v-model="userInfo.nick_name" @change="update_user({value:userInfo.nick_name,meta:'nick_name',uid:session.uid})"><template slot="prepend">{{label.nick_name}}</template></el-input></el-col>
        <!--年龄-->
            <el-col :lg="10"><el-input  size="small" v-model="userInfo.age" @change="update_user({value:userInfo.age,meta:'age',uid:session.uid})"><template slot="prepend">{{label.age}}</template></el-input></el-col>
        <!--性别-->
            <el-col :lg="10" class="input-label-group"><div class="input-label">{{label.sex}}</div><template><el-select v-model="userInfo.sex" @change="update_user({value:userInfo.sex,meta:'sex',uid:session.uid})" :placeholder="label.sex_placeholder" size="small"><el-option   v-for="item in sex_options" :key="item.value" :label="item.label" :value="item.value" ></el-option></el-select></template></el-col>
        <!--工作-->
            <el-col :lg="10"><el-input size="small" v-model="userInfo.job" @change="update_user({value:userInfo.job,meta:'job',uid:session.uid})"><template slot="prepend">{{label.job}}</template></el-input></el-col>
        <!--邮箱-->
            <el-col :lg="10"><el-input :disabled="true" size="small" v-model="userInfo.email"><template slot="prepend">{{label.email}}</template></el-input></el-col>
        <!--经验-->
            <el-col :lg="10"><el-input :disabled="true" size="small" v-model="userInfo.experience"><template slot="prepend">{{label.experience}}</template></el-input></el-col>
        <!--等级-->
            <el-col :lg="10"><el-input :disabled="true" size="small" v-model="label.disabled"><template slot="prepend">{{label.level}}</template></el-input></el-col>
        <!--用户组-->
            <el-col :lg="10"><el-input :disabled="true" size="small" v-model="userInfo.group_title"><template slot="prepend">{{label.group}}</template></el-input></el-col>
        <!--个性签名-->
            <el-col class="input-label-group"><div class="input-label">{{label.sign}}</div><el-input type="textarea" size="small" rows="3" v-model="userInfo.sign" @change="update_user({value:userInfo.sign,meta:'sign',uid:session.uid})"></el-input></el-col>
</div>
</template>
<script>
export default {
    name:'information',
    props:['userInfo','session'],
    data(){
        return{
            label:{
                nick_name : '昵称',
                email : '邮箱',
                experience : '经验',
                level : '等级',
                age : '年龄',
                sex : '性别',            
                sex_placeholder : '请选择性别',            
                sign : '签名',
                update : '更新',
                job : '工作',
                group:'用户组',
                disabled:'开发中',
            },
            sex_options : [
                {label:'女',value:0},
                {label:'男',value:1},
                {label:'保密',value:2},
            ],
        }
    },   
}
</script>