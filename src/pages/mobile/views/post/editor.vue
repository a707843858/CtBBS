<template>
        <div class="container editor_page" :class="[{'page_l':$store.state.leftAside},{'page_r':$store.state.rightAside}]">
            <m_header :tab="value.tab" :title="value.title"></m_header>
            <div class="p_tit"><van-field v-model="postData.title"  :placeholder="label.title_tip"/></div>
            <div class="p_editor">
                <editor v-model="postData.content" :init="init"></editor>            
                <div class="imgList">                     
                    <van-uploader><i class="iconfont icon-jia"></i></van-uploader>
                    <img :src="postData.thumb" alt="">
                </div>
            </div>
            <div class="p_summary m_card">
                <div class="hd"><span v-text="label.summary"></span></div>
                <van-field type="textarea" rows="7" v-model="postData.summary"/>
            </div>
            <div class="btm_extend m_card">
                <div class="hd">
                    <span v-text="label.extend"></span>
                    <div class="float-right tip"><i class="iconfont icon-tishi1"></i><span v-text="label.extend_tip"></span></div>
                </div>
                <div class="bd">
                    <div class="item" @click="show.model = !show.model"><span v-text="`${label.model}：`" class="tit"></span>{{postData.model | postModel }}</div>
                    <div class="item" @click="show.status = !show.status"><span v-text="`${label.status}：`"></span>{{postData.status | postStatus}}</div>
                    <div class="item"><span v-text="`${label.comment_status}：`"></span><van-switch v-model="postData.comment_status" size="18px"  style="vertical-align:bottom;"/></div>
                </div>
            </div>
            <div class="update_btn">
                <van-button size="large" @click="updatePost(postData)">{{label.update}}</van-button>
            </div>
            <van-actionsheet v-model="show.model" :title="label.model" class="editor_actionsheet">
                <van-radio-group v-model="postData.model">
                    <van-radio name="normal">{{label.normal}}</van-radio>              
                    <van-radio name="gallery">{{label.gallery}}</van-radio>
                    <van-radio name="video">{{label.video}}</van-radio>
                </van-radio-group>
            </van-actionsheet>
            <van-actionsheet v-model="show.status" :title="label.status"  class="editor_actionsheet">
                <van-radio-group v-model="postData.status">
                    <van-radio name="publish">{{label.publish}}</van-radio>              
                    <van-radio name="privacy">{{label.privacy}}</van-radio>
                    <van-radio name="charge">{{label.charge}}</van-radio>
                    <van-radio name="password">{{label.password}}</van-radio>
                    <van-radio name="viper">{{label.viper}}</van-radio>
                </van-radio-group>
            </van-actionsheet> 
        </div>
</template>

<script>
import m_header from '@/pages/mobile/components/header'
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import editor from '@tinymce/tinymce-vue';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/print';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/autoresize';
export default {
    name:'m_editor',
    data(){
        return {
            label:{
                title_tip:'标题(必填)',
                extend:'其他设置',
                extend_tip:'点击即可修改',
                model:'文章形式',
                normal:'标准',
                gallery:'相册',
                video:'视频',
                status:'文章状态',
                normal:'标准',
                gallery:'相册',
                video:'视频',
                music:'音乐',
                publish:'公开',
                privacy:'隐私',
                charge:'付费',
                password:'密码',
                viper:'会员可见',
                comment_status:'评论权限',
                summary:'简介',
                update:'发布',
            },
            value:{
                tab:'editor',
                title:'编辑文章',
            },
            show:{
                model:false,
                status:false,
            },
            postStatus:[
                {text:'公开',value:''},
                {text:'隐私',value:''},
                {text:'付费',value:''},
                {text:'密码',value:''},
                {text:'会员可见',value:''},
            ],
            init:{
                language_url: '/static/tinymce/langs/zh_CN.js',
                language: 'zh_CN',
                skin_url: '/static/tinymce/skins/lightgray',
                images_upload_url: 'postAcceptor.php',
                resize:false,
                codesample_dialog_width: 600,
                codesample_dialog_height: 425,
                template_popup_width: 600,
                template_popup_height: 450,
                height: 500,
                powerpaste_allow_local_images: true,
                menubar:false,
                statusbar: false,
                plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table contextmenu paste imagetools wordcount hr toc charmap emoticons autoresize codesample"
                    ],
                toolbar:false,
                // toolbar: "undo redo | bold italic underline strikethrough removeformat | fontsizeselect fontselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent toc ", 
            },
            postData:{
                comment_status:'open',
                status:'publish',
                category:1, 
                model:'normal',
            },
            category_options:[],
        }
    },
    created(){
        this.get_category().then(res=>{this.category_options = res.data});
        if(this.$route.params.id > 0){
            this.get_post({pid:this.$route.params.id}).then(res=>{
                this.postData = res.data[0];
                for(var i = 0;i<this.postModel.length;i++){
                    if(this.postModel[i].value == res.data[0].model){
                        break;
                        return i ;
                    }
                }
                this.value.model_text = this.postModel[i].text
            });
        };
    },
    methods:{
        changeModel(picker,value,index) {
            this.postData.model = value.value;
            this.value.model_text = value.text
        },
        changeStatus(picker,value,index){
            this.postData.status = value.value;
            this.value.status_text = value.text
        }
    },
    components:{
        m_header,
        editor,
    },
    mounted(){
        tinymce.init({});
    }
}
</script>



