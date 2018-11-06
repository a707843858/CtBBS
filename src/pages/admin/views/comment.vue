<template>
    <div class="setting_box w-full">
        <el-card class="box-card cub_left bg-white mb-3 b-radius-3" shadow="never">
            <div slot="header" class="title">{{label.all_comments}}</div>
            <!--Comment Search-->
            <el-row type="flex" style="flex-wrap:wrap"  justify="space-between"  :gutter="20" class="search_box bg-white b-radius-5 w-full">
                <el-col :lg="4" :md="4" :sm="4" class="mb-3">
                    <el-select size="small" v-model="value.search_meta" @change="changePlaceholder">
                        <el-option v-for="(item,index) in search_options" :key="index" :label="item" :value="index" ></el-option>
                    </el-select>
                </el-col>
                <el-col :lg="9" :md="9" :sm="9" class="mb-3">
                    <el-input size="small" v-model="value.search_key" :placeholder="value.search_placeholder"></el-input>
                </el-col>
                <el-col :lg="9" :md="9" :sm="9" :xs="12" class="mb-3">
                    <el-button @click="commentSearch(value.search_meta,value.search_key)" size="small" >{{label.search}}</el-button>
                </el-col>
                <el-col :lg="2" :md="2" :sm="2" :xs="12" class="mb-3 ">
                    <el-button size="small" class="float-right">{{label.batchOparation}}</el-button>
                </el-col>
            </el-row>
            <!--Comment Form-->
            <el-table :data="commentData" border style="width: 100%;border-radius:5px;" class="tb-edit mb-3" highlight-current-row  ref="multipleTable" >
                <!--Checkbox-->
                <el-table-column fixed type="selection" width="40"></el-table-column>
                <!--Comment Id-->
                <el-table-column  fixed :label="label.id" width="50" type="index" :index="tableIndex"></el-table-column>
                <!--Nick Name-->
                <el-table-column width="100" :label="label.author" prop="nick_name">
                </el-table-column>
                <!--Comment Content-->
                <el-table-column :label="label.content" width="400">
                    <template slot-scope="scope">
                        <el-input type="textarea" v-model="scope.row.content" @change="commentUpdate(scope.row.id,'content',scope.row.content)"></el-input>
                        <span>{{scope.row.content}}</span>
                    </template>
                </el-table-column>
                <!--Comment Post-->
                <el-table-column :label="label.response_to_post" width="250">
                    <template slot-scope="scope">
                        <a :href="'/pid='+scope.row.pid" v-text="scope.row.title"></a>
                    </template>
                </el-table-column>
                <!--Comment Publish Time-->
                <el-table-column :label="label.publish_time" width="250">
                    <template slot-scope="scope">
                        <template>
                            <el-date-picker v-model="scope.row.publishTime"
                                    type="datetime" :placeholder="label.date_time_placeholder" @change="commentUpdate(scope.row.id,'publishTime',scope.row.publishTime)">
                            </el-date-picker>
                        </template>
                        <span>{{ scope.row.publishTime | formatDate(1)}}</span>
                    </template>
                </el-table-column>
                <!--control-->
                <el-table-column fixed="right" :label="label.control" width="100">
                    <template slot-scope="scope">
                        <el-button type='text' size="small" v-text="label.delete" @click="commentDelete(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--Pagination-->
            <div class="admin_pagination bg-white b-radius-3">
                <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="value.page_sizes" :page-size="value.page_size" layout="total, sizes, prev, pager, next, jumper" :total="value.page_total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'admin_comment',
    data(){
        return{
            label : {
                id : 'ID',
                author : '作者',                
                response_to_post : '所属文章',                
                publish_time : '发布时间',               
                content : '评论',
                date_time_placeholder : '选择日期时间',
                delete : '删除',
                control : '操作',
                search : '搜索',
                batchOparation : '批量操作',
                search_user_tip :'请输入作者ID',
                search_post_tip : '请输入文章ID',
                all_comments : '所有评论',
            },
            value : {
                search_meta : '',
                search_key : '',
                search_placeholder : '',
                page_total : 0,
                curren_page : [],
                page_sizes:[10,20,50,100,200,500],
                page_size:0,
            },
            commentData : [],
            search_options : [],
        }
    },
    created(){
        //预设页面
        var self = this ;
        function get_comment(){
            return self.axios.post('/api/admin/get_comment',{start:0});
        }
        //获取总条数，用于分页
        function get_page_cout(){
            return self.axios.post('/api/common/get_total_count',{table:'comment',type:'post'});
        };
        //axios获取数据
        this.axios.all([get_comment(),get_page_cout()]).then(this.axios.spread(function(commentAll,pageTotal){
            self.commentData = commentAll.data;
            self.value.page_total = pageTotal.data[0]['COUNT(*)'];
        }));
        //预设搜索栏
        var search = {};
        for(var key in this.label){
            search[key] = this.label[key];
            if(key == 'response_to_post' ){
                break;
                return search;
            }
        };
        this.search_options = search;
    },
    methods:{
        //预设每行的index为评论的ID
        tableIndex(index){
            return this.commentData[index].id
        },
        //查询信息
        commentSearch(meta,value){
            var self = this ;
            this.axios.post('/api/admin/search_comment',{meta:this.value.search_meta,value:this.value.search_key}).then(function(res){
                console.log(res);
                self.commentData = res.data;
            });
        },
        //修改搜索框的提示语句
        changePlaceholder(){
            var self = this ;
            if(this.value.search_meta == 'author'){
                self.value.search_placeholder = self.label.search_user_tip;
            }else if (this.value.search_meta == 'response_to_post'){
                self.value.search_placeholder = self.label.search_post_tip;
            };
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
            this.axios.post('/api/user/get_comment',{start:start}).then(function(res){
                self.userData = res.data;
            })
        },
        //保存页面数据
        commentUpdate(id,meta,val){
            var self = this ;
            this.axios.post('/api/admin/update_comment',{id:id,meta:meta,val:val}).then(function(res){
                if(res.data.status != 1){
                    self.$message({
                        type : 'warning',
                        message : '保存失败',
                    });
                }
            });
        },
        //删除评论
        commentDelete(id){
            var self = this ;
            this.axios.post('/api/admin/delete_comment',{id:id}).then(function(res){
                if(res.data.status == 1){
                    $('.current-row').remove();
                }
            });
        }

    },

}
</script>
