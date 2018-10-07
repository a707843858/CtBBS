<template>
<div class="blog_setting setting_box w-full">
    <el-row type="flex" style="flex-wrap:wrap">
    <el-card class="box-card cub_left bg-white b-radius-3 mb-3">
        <div slot="header"><div class="title">{{label.all_posts}}</div></div>
        <!--Post Serach-->
        <el-row type="flex" style="flex-wrap:wrap"  justify="space-between"  :gutter="20" class="search_box bg-white b-radius-5 w-full">
            <el-col :lg="4" :md="4" :sm="4" class="mb-3">
                <el-select size="small" v-model="value.search_meta" @change="changePlaceholder">
                        <el-option v-for="(item,index) in search_options" :key="index" :label="item" :value="index" ></el-option>
                </el-select>
            </el-col>
            <el-col :lg="9" :md="9" :sm="9" class="mb-3">
                <el-input size="small" v-model="value.search_key"  :placeholder="value.search_placeholder"></el-input>
            </el-col>
            <el-col :lg="9" :md="9" :sm="9" :xs="12" class="mb-3">
                <el-button @click="postSearch(value.search_meta,value.search_key)" size="small">{{label.search}}</el-button>
            </el-col>
            <el-col :lg="2" :md="2" :sm="2" :xs="12" class="mb-3 ">
                <el-button size="small" class="float-right">{{label.batchOparation}}</el-button>
            </el-col>
        </el-row>
        <!--Post Form-->
        <el-table :data="postData" border style="width: 100%;border-radius:5px;" class="tb-edit" highlight-current-row  ref="multipleTable">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column fixed width="50" :label="label.id" type="index" :inde="tableIndex"></el-table-column>
            <!--Title-->
            <el-table-column  width="200" :label="label.title">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.title"></el-input>
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <!--Category-->
            <el-table-column width="200" :label="label.category">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.cid">
                        <el-option v-for="item in category_options" :label="item.title" :value="item.id" :key="item.id"></el-option></el-select>
                    <span>{{scope.row.category_title}}</span>
                </template>
            </el-table-column>
            <!--Author-->
            <el-table-column width="100" :label="label.author" prop="nick_name"></el-table-column>
            <!--Content-->
            <el-table-column width="300" :label="label.content">
                <template slot-scope="scope">
                    <el-input type="textarea"rows="3" v-model="scope.row.content"></el-input>
                    <span style="font-size:12px;overfllow:hidden;">{{scope.row.summary}}</span>
                </template>
            </el-table-column>
            <!--Status-->
            <el-table-column width="100" :label="label.status">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.status">
                        <el-option :label="label.publish" value="publish"></el-option>
                        <el-option :label="label.close" value="close"></el-option>
                    </el-select>
                    <span>{{scope.row.status | postStatusTOString}}</span>
                </template>
            </el-table-column>
            <!--Password-->
            <el-table-column width="150" :label="label.password">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.password"></el-input>
                    <span>{{scope.row.password}}</span>
                </template>
            </el-table-column>
            <!--Comment Status-->
            <el-table-column width="100" :label="label.comment_status">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.comment_status" active-value="open" inactive-value="close"></el-switch>
                    <span>{{scope.row.comment_status | statusToString }}</span>
                </template>
            </el-table-column>
            <!--Control-->
            <el-table-column with="100" :label="label.control" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" size="small" v-text="label.delete" class="d-inline" ></el-button> 
                </template>
            </el-table-column>
        </el-table>
        <!--Pagination-->
        <div class="admin_pagination bg-white b-radius-3">
                <el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="value.page_sizes" :page-size="value.page_size" layout="total, sizes, prev, pager, next, jumper" :total="value.page_total">
                </el-pagination>
        </div>
    </el-card>
     </el-row>
</div>
</template>

<script>
export default {
    name : 'admin_post',
    data(){
        return{
            label : {
                id:'ID',
                title:'标题',
                author : '作者',
                status : '状态',                
                content : '内容',
                publish : '发布',
                close : '关闭',
                password : '密码',
                comment_status : '评论开关',
                control : '操作',
                delete : '删除',
                category:'分类',
                search : '搜索',
                batchOparation:'批量操作',
                search_by_id:'请输入帖子ID',
                search_by_author:'请输入用户ID',
                search_by_title:'请输入帖子标题',
                search_by_status:'请输入帖子状态,publish(发布),close(关闭)',
                all_posts:'所有帖子',
            },
            value : {
                search_placeholder:'',
                search_meta:'',
                search_key:'',
                page_total : 0,
                curren_page : [],
                page_sizes:[10,20,50,100,200,500],
                page_size:0,
            },
            postData:[],
            category_options:[],
            search_options :[],
        }
    },
    created(){
        //获取帖子信息
        var self = this ;
        function get_post(){        
            var start = start ? start : 0;
            return self.axios.post('/api/admin/get_post',{start:start});
        };
        // //预设帖子信息分类选择
        function get_category(){
            return self.axios.get('/api/admin/get_category');
        };
        //获取总条数，用于分页
        function get_page_cout(){
            return self.axios.post('/api/common/get_total_count',{table:'comment'});
        };
        //发出请求获取信息
        this.axios.all([get_post(),get_category()])
        .then(this.axios.spread(function(post,category){
            self.postData = post.data;
            self.category_options = category.data;
        }));
        //预设顶部搜索栏
        var search = {};
        for(var key in this.label){
            search[key] = this.label[key];
            if(key == 'status'){
                break;
                return search;
            }
        };
        this.search_options = search;
    },
    methods : {
        //设置table的索引为帖子实际ID
        tableIndex(index){
            return this.postData[index].pid;
        },
        //动态加载搜索栏提示
        changePlaceholder(){
            if(this.value.search_meta == 'id'){
                this.value.search_placeholder = this.label.search_by_id;
            }else if (this.value.search_meta == 'author'){
                this.value.search_placeholder = this.label.search_by_author;
            }else if (this.value.search_meta == 'title'){
                this.value.search_placeholder = this.label.search_by_title;
            }else if (this.value.search_meta == 'status'){
                this.value.search_placeholder = this.label.search_by_status;
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
            this.axios.post('/api/user/get_post',{start:start}).then(function(res){
                self.postData = res.data;
            })
        },
        //搜索帖子
        postSearch(meta,val){
            var self = this ;
            this.axios.post('/api/admin/search_post',{meta:meta,val:val}).then(function(res){
                self.postData = res.data;
            });
        },

    },
}
</script>


