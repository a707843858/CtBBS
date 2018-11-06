<template>
    <el-row type="flex" style="flex-wrap:wrap" justify="space-between" :gutter="20">
        <!--Body Background-->
        <el-col :lg="12" :md="12">
            <el-card class="box-card cub_left bg-white b-radius-3 mb-3 background_group" shadow="never">
                <div slot="header" class="title">{{label.body_background}}</div>
                    <el-collapse  accordion>
                                <el-collapse-item :title="item.title" :name="item.id" v-for="item in body_bg_options" :key="item.id">
                                    <el-row type="flex" style="flex-wrap:wrap" justify="space-between" :gutter="20">
                                        <el-col :lg="6" :md="6">
                                            <img :src="'/static/img/background/thumb/'+item.url" class="thumb mb-2">
                                        </el-col>
                                        <el-col :lg="18" :md="18">
                                            <el-row type="flex" justify="space-between" style="flex-wrap:wrap" :gutter="20">
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="item.title" @change="backgroundUpdate(item.id,'title',item.title)" ><template slot="prepend">{{label.title}}</template></el-input>
                                                </el-col>
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="item.url" @change="backgroundUpdate(item.id,'url',item.url)" ><template slot="prepend">{{label.img_url}}</template></el-input>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex" justify="space-between" style="flex-wrap:wrap" :gutter="20">
                                                <el-col :lg="20" :md="20" class="mb-3">
                                                    <el-input size="small" v-model="item.extend" @change="backgroundUpdate(item.id,'extend',item.extend)"     ><template slot="prepend">{{label.background_extend}}</template></el-input>
                                                </el-col>
                                                <el-col :lg="4" :md="4" class="mb-3 text-right">
                                                    <el-button size="small" v-text="label.delete" @click="backgroundDelete(item.id)" ></el-button>
                                                </el-col>
                                            </el-row>                                           
                                        </el-col>
                                    </el-row>
                                </el-collapse-item>
                                <!--Add Body Background-->
                                <el-collapse-item :title="label.add_background" name="add_body_background" >
                                    <el-row type="flex" style="flex-wrap:wrap" justify="space-between" :gutter="20">
                                        <el-col :lg="6" :md="6">
                                            <img :src="'/static/img/background/thumb/'+ value.add_body_background.url" class="thumb mb-2">
                                        </el-col>
                                        <el-col :lg="18" :md="18">
                                            <el-row type="flex" justify="space-between" style="flex-wrap:wrap" :gutter="20">
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="value.add_body_background.title"><template slot="prepend">{{label.title}}</template></el-input>
                                                </el-col>
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="value.add_body_background.url"><template slot="prepend">{{label.img_url}}</template></el-input>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex" justify="space-between" :gutter="20" style="flex-wrap:wrap">
                                                <el-col :lg="20" :md="20" class="mb-3">
                                                    <el-input size="small" v-model="value.add_body_background.extend" ><template slot="prepend">{{label.background_extend}}</template></el-input>
                                                </el-col>
                                                <el-col :lg="4" :md="4" class="mb-3">
                                                    <el-button v-text="label.add" @click="backgroundInsert(value.add_body_background.title,'body_bg',value.add_body_background.url,value.add_body_background.extend)" size="small" class="float-right"></el-button>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-collapse-item>
                    </el-collapse>
            </el-card>
        </el-col>
        <!--Name Card Background-->
        <el-col :lg="12" :md="12">
            <el-card class="box-card cub_left bg-white b-radius-3 mb-3 background_group" shadow="never">
                <div slot="header" class="title">{{label.name_card_background}}</div>
                                    <el-collapse  accordion>
                                <el-collapse-item :title="item.title" :name="item.id" v-for="item in name_card_options" :key="item.id">
                                    <el-row type="flex" style="flex-wrap:wrap" justify="space-between" :gutter="20">
                                        <el-col :lg="6" :md="6">
                                            <img :src="'/static/img/background/thumb/'+item.url" class="thumb mb-2">
                                        </el-col>
                                        <el-col :lg="18" :md="18">
                                            <el-row type="flex" justify="space-between" style="flex-wrap:wrap" :gutter="20">
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="item.title" @change="backgroundUpdate(item.id,'title',item.title)" ><template slot="prepend">{{label.title}}</template></el-input>
                                                </el-col>
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="item.url" @change="backgroundUpdate(item.id,'url',item.url)" ><template slot="prepend">{{label.img_url}}</template></el-input>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex" justify="end" style="flex-wrap:wrap" :gutter="20">
                                                <el-col :lg="4" :md="4" class="mb-3 ">
                                                    <el-button size="small" class="right" v-text="label.delete" @click="backgroundDelete(item.id)"></el-button>
                                                </el-col>
                                            </el-row>                                           
                                        </el-col>
                                    </el-row>
                                </el-collapse-item>
                                <!--Add Name Card Background-->
                                <el-collapse-item :title="label.add_background" name="add_body_background" >
                                    <el-row type="flex" style="flex-wrap:wrap" justify="space-between" :gutter="20">
                                        <el-col :lg="6" :md="6">
                                            <img :src="'/static/img/background/thumb/'+ value.add_body_background.url" class="thumb mb-2">
                                        </el-col>
                                        <el-col :lg="18" :md="18">
                                            <el-row type="flex" justify="space-between" style="flex-wrap:wrap" :gutter="20">
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="value.add_body_background.title"><template slot="prepend">{{label.title}}</template></el-input>
                                                </el-col>
                                                <el-col :lg="12" :md="12" class="mb-3">
                                                    <el-input size="small" v-model="value.add_body_background.url"><template slot="prepend">{{label.img_url}}</template></el-input>
                                                </el-col>
                                            </el-row>
                                            <el-row type="flex" justify="end" :gutter="20" style="flex-wrap:wrap">
                                                <el-col :lg="4" :md="4" class="mb-3">
                                                    <el-button v-text="label.add" @click="backgroundInsert(value.add_body_background.title,'name_card',value.add_body_background.url)" size="small" class="float-right"></el-button>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                    </el-row>
                                </el-collapse-item>
                    </el-collapse>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name:'admin_background',
    data(){
        return{
            label:{
                title : '标题',
                img_url : '图片链接',
                background_extend: ' background CSS',
                add_background: '添加背景',
                body_background : '主题背景',
                name_card_background:'名片卡背景',
                delete:'删除',
                add:'添加',
            },
            value:{
                add_body_background:[],
            },
            body_bg_options: [],
            name_card_options : [],
        }
    },
    created(){
        var self = this ;
        //获取背景数据
        function get_body_bg(){
            return self.axios.post('/api/blog/get_background_list',{type:'body_bg'});
        };
        function get_nameCardBg(){
            return self.axios.post('/api/blog/get_background_list',{type:'name_card'});
        };
        //传输数据
        this.axios.all([get_body_bg(),get_nameCardBg()]).then(this.axios.spread(function(body_bg,name_card){
            self.body_bg_options = body_bg.data;
            self.name_card_options = name_card.data;
        }));
    },
    methods:{
        //保存background
        backgroundUpdate(id,meta,val){
            var self = this ;
            this.axios.post('/api/admin/update_background',{id:id,meta:meta,val:val}).then(function(res){
                self.showFail(res.data.status);
            });
        },
        //插入background
        backgroundInsert(title,type,url,extend){
            var self = this ;
            this.axios.post('/api/admin/insert_background',{title:title,type:type,url:url,extend:extend}).then(function(res){
                if(res.data.status == 1){
                    window.location.reload();
                }else{
                    this.showFail(res.data.status);
                }
            });
        },
        //删除background
        backgroundDelete(id){
            var self = this ;
            this.axios.post('/api/admin/delete_background',{id:id}).then(function(res){
                if(res.data.status == 1){
                    $('.background_group .el-collapse-item.is-active').remove();
                }else{
                    self.showFail(res.data.status);
                };
            });
        },
    },
}
</script>

