# 基于Vue.js搭建博客

## 项目简介&nbsp;&nbsp;&nbsp;[在线预览](http://193.112.0.105/)<br>
这是我第一个用Vue全家桶搭建的应用，后端运Node.js开发，利用业余时间持续在GitHub上迭代版本并不断完善功能,数据存储部署于腾讯云。


## 技术栈
### 前端
* Vue.js 3.0.4
* Vue-router 
* Axios
* Element UI
* Markdown

### 后端
* Node.js 8.11.3
* Express 应用框架

### 功能
- [x] 响应式界面 <br>
- [x] 发布文章 (支持三种显示形式,分别为文章，视频，图册。)<br>
- [x] 文章评论 <br>
- [x] 文章分类 <br>
- [x] 用户注册/登录 <br>

## 版本跌送
Version 1.0  项目初始化版本，基本完成前台PC样式，以及部分基础功能连接。


## 文件结构
<pre>
.
├──  ... 
├── dist 打包好的文件 
├── server 后端目录 
|   ├── index.js 后端入口  
|   └── route 后端路由 
├── src 前端目录 
|   ├── assets 静态资源 
|   ├── router 前端路由 
|   ├── App.vue 挂载主件 
|   ├── main.js Vue项目入口 
|   └── components 组件扩展 
|       ├── admin 博客后台
|       ├── common 共用组件
|       ├── page 页面 
|       ├── post 文章
|       └── user 用户空间/设置 
├── static 静态资源
├── index.html 根页面
├── package.json 组件依赖配置
├── ..
.
</pre><br>


## 本地预览
``` bash
克隆代码或下载代码。
npm install
npm run dev
```