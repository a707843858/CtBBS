# 基于Vue.js搭建博客

## 项目简介
这是我第一个用Vue全家桶搭建的应用，后端运Node.js开发，利用业余时间持续在GitHub上迭代版本并不断完善功能,数据存储部署于腾讯云。

## 效果演示
* [PC端预览](http://193.112.0.105/)<br>
* [移动端预览](http://193.112.0.105/app) （请用chrome手机模式预览）<br>


## 技术栈
### 前端
* Vue.js 3.0.4
* Vue-router 
* Vuex
* Axios
* Element UI
* Mint UI
* Vant UI
* Markdown
* Highlight

### 后端
* Node.js 8.11.3
* Express 应用框架

### 功能
- [x] 响应式界面 <br>
- [x] 移动端 <br>
- [x] 发布文章 (支持三种显示形式,分别为文章，视频，图册。)<br>
- [x] 文章评论 <br>
- [x] 文章分类 <br>
- [x] 用户注册/登录 <br>

## 版本跌送
Version 1.0  项目初始化版本，基本完成前台PC样式，以及部分基础功能连接。
Version 2.0  增加移动端，以及项目优化。

## 项目布局
<pre>
.                                               
├── build                                           webpack配置
├── config                                          运行配置
├── server                                          后端目录 
|   ├── index.js                                    入口文件  
|   └── route                                       路由 
|       ├── router.js                               路由配置
|       ├── db.js                                   数据库配置
|       ├── post.js                                 文章相关请求
|       ├── user.js                                 用户相关请求
|       └── public.js                               公共类请求
|                                               
├── src                                             前端目录 
|   ├── assets                                      静态资源 
|   └── pages                                       前端模板
|       ├── index                                   PC端模板(结构类似移动端，待整理)
|       └── mibile                                  移动端模板
|           ├── mobile.js                           程序入口 
|           ├── mobile.html                         html入口 
|           ├── APP.vue                             页面入口 
|           ├── store                               数据存储
|           ├── router                              路由 
|           ├── conponents                          组件 
|           └── views                               页面
|              ├── index.vue                        首页
|              ├── lost.vue                         404
|              ├── user                             空间&&资料
|              |   ├── profile.vue                  资料页
|              |   ├── profile_collect.vue          收藏
|              |   ├── profile_financial.vue        钱包&积分
|              |   ├── profile_information.vue      个人信息
|              |   ├── profile_portrait.vue         修改头像
|              |   ├── profile_social.vue           社交账号
|              |   ├── zone.vue                     空间页
|              |   ├── zone_home.vue                首页
|              |   ├── zone_info.vue                资料
|              |   └── zone_post.vue                动态
|              └── post                             文章
|                  ├── category.vue                 分类查看
|                  ├── editor.vue                   发布&编辑
|                  ├── view.vue                     查看文章
|                  ├── view_gallery.vue             相册形式
|                  ├── view_normal.vue              标准形式
|                  └── view_video.vue               视频形式
|
├── static                                          静态资源
├── .babelrc 
├── main.js                                         入口文件 
├── package.json                                    组件依赖配置
├── README.md                                       帮助手册
├── ..
.
</pre><br>


## 本地预览
``` bash
git clone https://github.com/a707843858/mybbs 

npm install 或 yarn

npm run dev

访问: http://localhost:8001
```