<template>
    <div class="information_wrap">
        <div class="user_info">
            <van-field v-model="userInfo.id" :label="label.id" disabled/>
            <van-field v-model="userInfo.nick_name" :label="label.nick_name" @change="update_user({value:userInfo.nick_name,meta:'nick_name',uid:session.uid})"/>
            <van-field v-model="userInfo.age" :label="label.age" @change="update_user({value:userInfo.age,meta:'age',uid:session.uid})"/>
            <van-field v-model="userInfo.job" :label="label.job" @change="update_user({value:userInfo.job,meta:'job',uid:session.uid})"/>
            <van-field v-model="userInfo.email" :label="label.email" disabled/>
            <van-field v-model="userInfo.experience" :label="label.experience" disabled/>
            <van-field v-model="label.develope" :label="label.level" disabled/>
            <van-field v-model="userInfo.group_title" :label="label.group" disabled/>
            <van-field v-model="userInfo.sign" :label="label.sign" type="textarea" @change="update_user({value:userInfo.sign,meta:'sign',uid:session.uid})"/>
        </div>
    </div>    

</template>

<script>
export default {
    name:'m_profile_home',
    props:['userInfo','session'],
    data(){
        return {
            label:{
                id:'UID',
                nick_name:'昵称',
                age:'年龄',
                job:'职业',
                email:'邮箱',
                experience:'经验',
                level:'等级',
                develope:'开发中',
                group:'用户组',
                sign:'签名',
            },
            value:{
                
            },
        }
    },
    methods:{
    },

}
</script>

