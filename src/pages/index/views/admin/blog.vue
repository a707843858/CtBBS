<template>
<div class="blog_setting setting_box w-full">
    <el-row type="flex" style="flex-wrap:wrap" justify="space-around" :gutter="20">
        <!--Left-->
        <el-col :lg="17" :md="17">
            <!--Base Setting-->
            <el-card class="box-card cub_left bg-white b-radius-3 mb-3" shadow="never">
                <div slot="header" class="title">{{label.base_setting}}</div>
                <div class="card_item"><el-input size="small" v-model="value.blog_name" @change="blogUpdate('blog_name',value.blog_name)"><template slot="prepend">{{label.blog_name}}</template></el-input></div>
                <div class="card_item"><el-input size="small" v-model="value.sign" @change="blogUpdate('sign',value.sign)"><template slot="prepend">{{label.sign}}</template></el-input></div>
                <div class="card_item"><el-input size="small" v-model="value.icp_number" @change="blogUpdate('icp_number',value.icp_number)"><template slot="prepend">{{label.icp}}</template></el-input></div>
                <!--Logo Type-->
                <div class="card_item group_item"><div class="el-input el-input--small el-input-group el-input-group--prepend"><div class="el-input-group__prepend">{{label.logo_type}}</div><template>
                    <el-select size="small" v-model="value.logo_type" @change="blogUpdate('logo_type',value.logo_type)" >
                        <el-option v-for="item in logo_type_options" :key="item.value" :label="item.label"  :value="item.value"></el-option>
                    </el-select></template></div>
                </div>
                <div class="card_item group_item"><div class="el-input el-input--small el-input-group el-input-group--prepend"><div class="el-input-group__prepend">{{label.register_pomision}}</div><template>
                    <el-select size="small" v-model="value.register_pomision" @change="blogUpdate('register_pomision',value.register_pomision)">
                        <el-option v-for="item in register_pomision_options" :key="item.value" :label="item.label"  :value="item.value"></el-option>
                    </el-select></template></div>
                </div>
                <div class="card_item group_item"><div class="el-input el-input--small el-input-group el-input-group--prepend"><div class="el-input-group__prepend">{{label.default_group}}</div><template>
                    <el-select size="small" v-model="value.default_group" @change="blogUpdate('default_group',value.default_group)">
                        <el-option v-for="item in default_group_options" :key="item.id" :label="item.title" :value="item.id"></el-option>
                    </el-select></template></div>
                </div>
            </el-card>
        </el-col>
        <!--Right-->
        <el-col :lg="7" :md="7" >
            <!--Post Setting-->
            <el-card class="box-card cub_left bg-white b-radius-3 mb-3" shadow="never">
                <div slot="header" class="title">{{label.post_setting}}</div>
                <div class="mb-3 mt-3 card_item"><div class="input-label el-input--small">{{label.default_category}}</div><template>
                    <el-select size="small" v-model="value.default_category" @change="blogUpdate('default_category',value.default_category)">
                        <el-option v-for="item in default_category_options" :key="item.id" :label="item.title" :value="item.id"></el-option>    
                    </el-select>
                    </template>
                </div>
                <div class="mb-3 card_item"><div class="input-label el-input--small">{{label.home_post_count}}</div><el-input-number size="small" :min="1" :max="10" v-model="value.home_post_count" @change="blogUpdate('home_post_count',value.home_post_count)" style="width:100%"></el-input-number></div>
            </el-card>
            <!--Blog Social-->
            <el-card class="box-card cub_left bg-white b-raduis-3 mb-3" shadow="never">
                <div slot="header" class="title">{{label.social}}
                </div>
                <!--QQ-->
                <div class="card_item"><el-input size="small" v-model="value.qq" @change="blogUpdate('qq',value.qq)"><template slot="prepend">{{label.qq}}</template></el-input></div>
                <!--Wechat-->
                <div class="card_item"><el-input size="small" v-model="value.wechat" @change="blogUpdate('wechat',value.wechat)"><template slot="prepend">{{label.wechat}}</template></el-input></div>
                <!--Weibo-->
                <div class="card_item"><el-input size="small" v-model="value.weibo" @change="blogUpdate('weibo',value.weibo)"><template slot="prepend">{{label.weibo}}</template></el-input></div>
                <!--Phone-->
                <div class="card_item"><el-input size="small" v-model="value.phone" @change="blogUpdate('phone',value.phone)"><template slot="prepend">{{label.phone}}</template></el-input></div>
                <!--Email-->
                <div class="card_item"><el-input size="small" v-model="value.email" @change="blogUpdate('email',value.email)"><template slot="prepend">{{label.email}}</template></el-input></div>
            </el-card>
            <!--Blog Carousel/Background-->
            <el-card class="box-card cub_left bg-white b-raius-3" shadow="never">
                <div slot="header" class="title">{{label.default_background}}</div>
                <!--Body Background-->
                <div class="card_item"><div class="input-label el-input--small">{{label.body_bg}}</div>
                    <el-select size="small"  v-model="value.body_bg" @change="blogUpdate('body_bg',value.body_bg)">
                        <el-option v-for="item in bodyBg_options" :key="item.id" :label="item.title"  :value="item.id" ></el-option>
                    </el-select>
                </div>
                <div class="card_item"><div class="input-label el-input--small">{{label.nameCard_bg}}</div><el-select size="small" v-model="value.nameCard_bg"><el-option v-for="item in nameCard_bg_options" :key="item.id" :value="item.id" :label="item.title" @change="blogUpdate('name_card',value.nameCard_bg)"></el-option></el-select></div>
            </el-card>
        </el-col>
    </el-row>
</el-row>


</div>
</template>

<script>
export default {
    name : 'admin_blog',
    data(){
        return {
            //文本标题
            label : {
                base_setting : '基本设置',
                blog_name: '网站标题',
                sign : '网站简介',
                logo_type : '网站LOGO',
                register_pomision : '注册资格',
                default_group : '默认用户组',
                icp : 'ICP备案号',
                post_setting : '帖子设置',
                default_category : '帖子默认分类',
                home_post_count : '首页文章数',
                social : '社交信息',
                qq : 'QQ',
                wechat : '微信',
                weibo : '微博',
                phone: '手机',
                email : '邮箱',
                title : '标题',
                add: '添加',
                link : '跳转地址',
                delete : '删除',
                default_background:'默认背景',
                body_bg:'模板背景',
                nameCard_bg:'名片卡背景',
            },
            //对应的数值
            value : {
                blog_name:'',
                sign : '',
                icp_number:'',  
                logo_type : 0,          
                register_pomision: [],
                default_group:[],  
                default_category : [],
                home_post_count : [],
                qq :'',
                wechat : '',
                weibo : '',
                github : '',
                facebook : '',
                body_bg:1,
                nameCard_bg:1,
            },
            //选择内容
            register_pomision_options:[
                {label:'允许注册',value:1},
                {label:'禁止注册',value:0},
            ],
            logo_type_options : [
                {label:'显示网站标题',value:0},
                {label:'显示网站Logo',value:1},
            ],
            default_group_options:[],
            default_category_options : [],
            bodyBg_options:[],
            nameCard_bg_options:[],

        }
    },
    created(){
        var self = this ;
        //预设默认用户组选项
        function get_user_group_meta(){
            return self.axios.get('/api/admin/get_user_group_meta');
        };
        //预设帖子分类选项
        function get_post_category_meta(){
            return self.axios.get('/api/admin/get_post_category_meta');
        };
        //预设blog所需要的Meta
        function get_blog_page(){
            return self.axios.get('/api/admin/get_blog_page');
        };
        //获取背景
        function get_body_bg(){
            return self.axios.post('/api/blog/get_background_list',{type:'body_bg'});
        };
        function get_nameCard_bg(){
            return self.axios.post('/api/blog/get_background_list',{type:'name_card'});
        }
        //传输数据
        this.axios.all([get_user_group_meta(),get_post_category_meta(),get_blog_page(),get_body_bg(),get_nameCard_bg()]).then(this.axios.spread(function(group,category,blog,body_bg,nameCard_bg){
            self.default_group_options = group.data;
            self.default_category_options = category.data;
            //社交信息加载
            self.value.blog_name = blog.data[0].meta_value;
            self.value.sign = blog.data[1].meta_value;
            self.value.qq = blog.data[2].meta_value;
            self.value.wechat = blog.data[3].meta_value;
            self.value.weibo = blog.data[4].meta_value;
            self.value.phone = blog.data[5].meta_value;
            self.value.email = blog.data[6].meta_value;
            self.value.logo_type = parseInt(blog.data[7].meta_value);
            self.value.icp_number = blog.data[8].meta_value;
            self.value.register_pomision = parseInt(blog.data[9].meta_value);
            self.value.default_category = parseInt(blog.data[11].meta_value);
            self.value.default_group = parseInt(blog.data[10].meta_value);
            self.value.home_post_count = parseInt(blog.data[12].meta_value);
            self.value.body_bg = parseInt(blog.data[13].meta_value);
            self.value.nameCard_bg = parseInt(blog.data[14].meta_value);
            self.bodyBg_options = body_bg.data;
            self.nameCard_bg_options = nameCard_bg.data;
         }));
        
    },
    methods : {
        //保存页面信息
        blogUpdate(meta,value){
            var self = this ;
            this.axios.post('/api/admin/update_blog_meta',{meta:meta,value:value}).then(function(res){
               self.showFail(res.data.status);
            });
        },
      
        

    },

}
</script>