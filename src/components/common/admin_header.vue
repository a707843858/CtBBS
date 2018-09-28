<template>
    <div class="header">            
        <!--Header-->
        <div class="nav_bar">
            <el-row type="flex">
                <el-col>
                    <li><i class="fa fa-exchange" @click="closeAside"></i></li>
                    <li><i class="fa fa-calendar-o"></i></li>
                    <div class="float-right">
                        <li><i class="fa fa-power-off"></i></li>
                        <li><i class="fa fa-cog fa-spin"></i></li>
                    </div>
                </el-col>
            </el-row> 
        </div>
    </div>
</template>

<script>
export default {
    name:'admin_index',
    data(){
        return{
            label:{
            },
            value:{
                uid:1,
            },
        }
    },
    created(){

    },
    methods : {
        //关闭侧边栏
        closeAside(){
            $('#aside').addClass('w-none');
        },
    },
}
</script>

<style lang="scss" type="text/css" scoped>
$card_item_p:0 1rem;
$card_item_mb:1rem;
body {
  font-family: -apple-system,
 system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: #292b2c;
  background-color: #f4f6f9; }

.admin_pagination {
  padding: 5px; }

.el-header {
  margin-bottom: 0px;
  height: 60px !important; }

.nav_bar {
  position: fixed;
  z-index: 99;
  background-color: #6572b8;
  width: 100%;
  height: 60px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  top: 0;
  left: 0; }

.nav_bar li {
  padding: 15px;
  color: #fff;
  display: inline-block; }

.nav_logo {
  line-height: 60px;
  color: #7b7b7b; }

.admin_avatar img {
  padding: 3px;
  border-radius: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15); }

.aside {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #fff;
  padding-top: 5px;
  z-index: 100;
  width: 250px;
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 2px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 1px 0 2px rgba(0, 0, 0, 0.08); }

.aside .header {
  border-bottom: 1px solid #ebeef5;
  margin: 0 10px;
  padding-bottom: 10px; }

.aside .container {
  margin: 0 10px; }

.aside .container .el-collapse-item {
  padding: 0 15px;
  color: #546e7a; }

.aside .container .el-collapse, .aside .container .el-collapse-item__header, .aside .container .el-collapse-item__wrap {
  border: none; }

.aside .container .el-collapse-item__header .title {
  font-size: 15px; }

.aside .container .el-collapse-item__header .title i {
  float: left;
  line-height: 52px;
  font-size: 20px; }

.aside .container .el-collapse-item__header .title i, .aside .container .el-collapse-item__content i {
  width: 30px; }

.aside .container .is_tab .el-collapse-item__header {
  color: #6572b8 !important;
  font-weight: bold; }

.admin-wrap {
  position: relative;
  padding-top: 60px; }

.el-card {
  position: relative;}

.el-card__header {
  padding: 1rem 0.5rem; }

.el-card__header .title {
  padding-left: 15px;
  color: #546e7a; }

.el-card__body {
  border-top: 0; }

.el-collapse-item__content {
  padding-bottom: 5px; }

.admin-wrap:before {
  content: '';
  background-color: #6572b8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  z-index: -1; }

.admin_container {
  padding: 0 20px;
  box-sizing: border-box; }

@media screen and (min-width: 1200px) {
  .el-container, .nav_bar {padding-left: 250px;} 
  .group_item .el-input--suffix {width: 50%;}
}

@media screen and (min-width:769px) and (max-width: 1200px) {
  .group_item .el-input--suffix {width: 50%;}
 }

@media screen and (max-width: 768px) {
  .search_box {
    margin-left: 0 !important;
    margin-right: 0 !important; }
  .search_box > div {
    padding-left: 0 !important;
    padding-right: 0 !important; } 
}
@media screen and (max-width: 1200px) {
    .aside {width: 0px;display: none; }
}
.search_box .el-select {
  width: 100%; }

.search_box {
  margin-left: 0 !important;
  margin-right: 0 !important; }

.search_box > div:first-child {
  padding-left: 0 !important; }

.search_box > div:last-child {
  padding-right: 0 !important; }

.blog_setting .el-select .el-input__inner, .blog_setting .el-input-number .el-input__inner {
  border-radius: 0 4px 4px 0;
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0; }

.carousel_group, .background_group {
  position: relative; }

.carousel_group .el-card__body, .background_group .el-card__body {
  border-top: none; }

.carousel_group .thumb {
  width: 100%;
  height: 79px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px; }

.background_group .thumb {
  width: 100%;
  height: 80px;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px; }

.el-dialog__body .el-select .el-input__inner {
  display: table-cell;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px; }

.el-dialog__body .el-select {
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px; }

.tb-edit .el-input, .tb-edit .el-textarea, .tb-edit .current-row .edit_btn, .tb-edit .save_btn {
  display: none; }

.tb-edit .current-row .el-input + span, .tb-edit .current-row .tb-edit, .tb-edit .current-row .el-select + span, .tb-edit .current-row .el-textarea + span {
  display: none; }

.tb-edit .current-row .el-input, .tb-edit .current-row .el-textarea {
  display: block; }

.tb-edit .edit_btn, .tb-edit .current-row .save_btn {
  display: inline-block; }
.card_item {
  padding:$card_item_p;
  margin-bottom: $card_item_mb;
  .input-label {
    min-width: 10%;
  }
  .el-input-group__prepend {min-width: 15%;}
}
</style>




