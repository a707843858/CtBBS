<template>
<div class="container">
        <el-col><el-upload
  class="avatar-uploader text-center" action="/profile" :show-file-list="false" ><img v-if="userInfo.avatar_url" :src="`/static/img/avatar/${userInfo.avatar_url}`" class="avatar"><i v-else class="el-icon-plus avatar-uploader-icon"></i>
<div slot="tip" class="el-upload__tip" v-text="label.upload_tip"></div></el-upload></el-col>
</div>
</template>
<script>
export default {
    name:'profile',
    props:['userInfo','session'],
    data(){
        return{
            label:{
              upload_tip : '只能上传jpg/png文件，且不超过500kb',
            },
        }
    },
    methods : {
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    }


    
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius:3px;
    padding:0.5rem;

  }
</style>