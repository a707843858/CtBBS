<template>
    <el-container>
    <!--顶部-->
        <el-header>
            <common-header></common-header>
        </el-header>
    <!--中部-->
        <el-main class="link_page">       
            <el-row class="bbs-max-wrap mx-auto f-wrap" type="flex" justify="center">
                <div class="cub_left_btm w-full mb-4">
                    <div class="el-card__header" style="font-size:14px;"><div class="title">{{label.friendlink}}</div></div>
                </div>
                <div class="clearfix"></div>
                <el-col :lg="4" :md="4" :sm="6" :xs="24" class="link_box" v-for="item in links" :key="item.name">
                <div class="item">
                    <div class="hd" :style="'background:'+ item.color"></div>
                    <div class="bd">
                        <div class="avatar"><img :src="'/static/img/link/'+item.src"  width="100" height="100"></div>
                        <div class="btm">
                            <div class="title">{{item.name}}</div>
                            <div class="introduce">{{item.introduce}}</div>
                            <div class="line"></div>
                            <!-- <div class="">{{item.link}}</div> -->
                            <a :href="item.link" class="link" target="_black" :style="'background:'+item.color">{{label.visit_website}}</a>
                        </div>
                    </div>
                </div>
                </el-col>
            </el-row>
        </el-main>
    <!--底部-->
        <el-footer>
            <!-- <el-row class="footer_btm text-center link_page_btm" >&copy;&nbsp;2018 All Rights Reserved.
                    <a href="/">Power by Catuncle</a><span v-if="value.icp"> | {{value.icp}}</span><div class="d-inline-block ml-3">技术支持: Catuncle</div>
            </el-row> -->
            <common-footer></common-footer>
        </el-footer>        
    </el-container>
</template>

<script>
import header from '@/components/common/header';
import footer from '@/components/common/footer';
export default {
    name:'friendLink',
    data(){
        return {
            label:{
                friendlink:'友情链接',
                visit_website:'访问网站',
            },
            value:{
                copyright:'',  
                icp: '',
            },
            links:[
                {name:'极客学院',src:'jike.jpg',link:'http://www.jikexueyuan.com/',color:'#35b558',introduce:'一个IT最新资源学习网站'},
                {name:'贝塔空间',src:'beitakongjian.jpg',link:'http://meia.me/team/6',color:'#ffe200',introduce:'全国首个以产品设计驱动的互联网众创空间。'},
                {name:'优设',src:'youshe.jpg',link:'https://www.uisdc.com/',color:'#ff5a00',introduce:'国内人气极高的设计师学习平台。'},
                {name:'腾讯大学',src:'tencendaxue.jpg',link:'http://daxue.qq.com/',color:'rgb(44, 108, 174)',introduce:'一个互联网大学平台。'},
                {name:'IXDC',src:'ixdc.jpg',link:'https://ixdc.org/',color:'#d7000f',introduce:'一个设计体验国际交流平台。'},
                {name:'牛客网',src:'niuke.jpg',link:'https://www.nowcoder.com/',color:'#31363c',introduce:'一个IT求职神器,提供海量C++、JAVA、前端等职业笔试题库'},
                {name:'Bootstrap',src:'bootstrap.jpg',link:'http://www.bootcss.com/',color:'#5C4283',introduce:'一个开源的CSS/HTML框架'},
                {name:'花瓣网',src:'huaban.jpg',link:'http://huaban.com/',color:'#E9506F',introduce:'发现网络上你喜欢的事物.你可以用它收集灵感,保存有用的素材'},
                {name:'百度用户体验中心',src:'uxc.jpg',link:'http://ued.baidu.com/',color:'#222222',introduce:'致力于杰出的视觉、交互及用户研究方面的突破'},
                {name:'Layui',src:'layui.jpg',link:'https://www.layui.com/',color:'#EB8989',introduce:'一款采用自身模块规范编写的情怀型前端UI框架'},
            ],
        }
    },
    created(){
        //获取icp
        this.get_blog_meta('icp').then((res) =>{this.value.icp = res.data[0].meta_value});
    },
    methods:{

    },
    components:{
        'common-header':header,
        'common-footer':footer,
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        },
    }
}
</script>
