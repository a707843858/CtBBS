<template>
<el-row type="flex" style="flex-wrap:wrap" justify="space-around" :gutter="20">
    <!--首页轮播图-->
        <el-col :lg="12" :md="12">
            <el-card class="box-card cub_left bg-white b-radius-3 mb-3 carousel_group" shadow="never">
                <div slot="header" class="title">{{label.home_carousel}}</div>
                <el-collapse accordion> 
                    <el-collapse-item v-for="item in home_carousel_options" :key="item.id" :title="item.title" :value="item.id">
                        <el-row type="flex" style="flex-wrap:wrap" justify="space-around" :gutter="20">
                            <el-col :lg="10" :md="10" >
                                <img :src="item.url" class="thumb mb-2">
                                <div class="mb-3 align-top"><el-input size="small" v-model="item.link" @change="carouselUpdate(item.id,'link',item.link)"><template slot="prepend">{{label.link}}</template></el-input></div>    
                            </el-col>
                            <el-col :lg="14" :md="14">
                            <div class="mb-3"><el-input size="small" v-model="item.title" @change="carouselUpdate(item.id,'title',item.title)"><template slot="prepend">{{label.title}}</template></el-input></div>
                            <div class="mb-3"><el-input size="small" v-model="item.url" @change="carouselUpdate(item.id,'url',item.url)"><template slot="prepend">{{label.img_url}}</template></el-input></div>
                            <el-button  class="mb-3" v-text="label.delete" size="small" @click="carouselDelete(item.id)" style="margin-top:-1px;float:right;"></el-button>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <!--Add Home Carousel-->
                    <el-collapse-item :title="label.add_carousel" name="add_home_carouse" >
                        <el-row type="flex" style="flex-wrap:wrap" justify="space-around" :gutter="20">
                            <el-col :lg="10" :md="10" >
                                <img :src="value.add_home_carousel.url" class="thumb mb-2">
                                <div class="mb-3 align-top"><el-input size="small" v-model="value.add_home_carousel.link" ><template slot="prepend">{{label.link}}</template></el-input></div>
                            </el-col>
                            <el-col :lg="14" :md="14">
                            <div class="mb-3"><el-input size="small" v-model="value.add_home_carousel.title"><template slot="prepend">{{label.title}}</template></el-input></div>
                            <div class="mb-3"><el-input size="small" v-model="value.add_home_carousel.url"><template slot="prepend">{{label.img_url}}</template></el-input></div> 
                            <el-button v-text="label.add" @click="carouselInsert(value.add_home_carousel.title,'home',value.add_home_carousel.link,value.add_home_carousel.url)" class="mb-3" size="small" style="margin-top:-1px;float:right;"></el-button>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
    <!--首页侧边文章图片-->
        <el-col :lg="12" :md="12">
            <el-card class="box-card cub_left bg-white b-radius-3 mb-3 carousel_group" shadow="never">
            <div slot="header" class="title">{{label.home_aside}}</div>
                <el-collapse accordion> 
                    <el-collapse-item v-for="item in home_asideData" :key="item.id" :title="item.title" :value="item.id">
                        <el-row type="flex" style="flex-wrap:wrap" justify="space-around" :gutter="20">
                            <el-col :lg="10" :md="10">
                                <img :src="item.url" class="thumb mb-2">                        
                                <div class="mb-3 align-top"><el-input size="small" v-model="item.link" @change="carouselUpdate(item.id,'link',item.link)"><template slot="prepend">{{label.link}}</template></el-input></div>
                            </el-col>
                            <el-col :lg="14" :md="14">
                                <div class="mb-3"><el-input size="small" v-model="item.title" @change="carouselUpdate(item.id,'title',item.title)"><template slot="prepend">{{label.title}}</template></el-input></div>
                                <div class="mb-3"><el-input size="small" v-model="item.url" @change="carouselUpdate(item.id,'url',item.url)"><template slot="prepend">{{label.img_url}}</template></el-input></div>
                                <!-- <el-button class="mb-3 float-right" v-text="label.delete" size="small" @click="carouselDelete(item.id)" style="margin-top:-1px;"></el-button> -->
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
    name:'admin_carousel',
    data(){
        return{
            label :{
                carousel_section : '轮播图设置',
                home_carousel : '首页',
                home_aside:'首页侧边栏文章位置',
                login_carousel : '登陆页',
                add_carousel : '添加轮播图',
                title : '标题',
                img_url : '图片链接',
                link : '跳转地址',
                delete : '删除',
                add:'添加',
            },
            value:{
                carousel_tab : 'homeCarousel',
                home_carousel:[],
                add_home_carousel : [],
                add_login_carousel : [],

            },
            home_carousel_options : [],
            home_asideData:[],
        }
    },
    created(){
        var self = this;
        //获取首页轮播图数据
        this.axios.post('/api/admin/get_carousel_list',{type:'home'}).then(function(res){
             self.home_carousel_options = res.data;       
        });
        //获取首页侧边栏文章
        this.axios.post('/api/admin/get_carousel_list',{type:'home_aside'}).then(function(res){
             self.home_asideData = res.data;       
        });
    },
    methods:{
        //保存carousel
        carouselUpdate(id,meta,val){
            console.log(id,meta,val);
            var self = this;
            this.axios.post('/api/admin/update_carousel',{id:id,meta:meta,val:val}).then(function(res){
                self.showFail(res.data.status);
            });
        },
        //插入carousel
        carouselInsert(title,type,link,url){
            var self = this ;
            this.axios.post('/api/admin/insert_carousel',{type:type,title:title,link:link,url:url}).then(function(res){
                if(res.data.status == 1){
                    window.location.reload();
                }else{
                    this.showFail(res.data.status );
                }
            });
        },
        //删除carousel
        carouselDelete(id){
            var self = this ;
            this.axios.post('/api/admin/delete_carousel',{id:id}).then(function(res){
                if(res.data.status == 1){
                    $('.carousel_group .el-collapse-item.is-active').remove();
                }else{
                    self.showFail(res.data.staus);
                }
            });
        },
    }
}
</script>

