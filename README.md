[SPM](https://github.com/yanglang1987500/spm) — SPM权限管理平台
==================================================


简介
----

该项目为SPA（单页应用）管理系统，实现了RBAC权限管理模块，基于nodejs开发，后端使用express+ejs搭建服务，另外扩展了ejs支持解析自定义标签，包括权限标签；前端使用webpack进行资源打包，得益于webpack强大的打包能力，使用了ES6、Sass、Vue（H5移动端）等较新的技术。


安装
```javascript
$ npm install -d
```
启动
```javascript
$ node app.js
```

描述
----

* 从我之前的和云筹账户管理中心项目移植过来一套模块化开发框架，但是由AMD改造成了CMD模式，同样是继承式架构并提供各种展现形式，让开发人员只需要关注业务逻辑；
* 使用director.js实现PC端路由，vue-router实现移动端路由；
* 引入包括easyui，echarts3.x等，能快速制作报表；
* 扩展ejs支持解析权限标签；
* 服务端启动时会自动扫描/routes目录下的路由中间件，无须额外配置，只需要实现路由即可；
* 移动端使用Vuex进行状态管理；
* 引入环信SDK，实现了一套基于好友与群的IM体系；
* 采用RBAC架构设计权限体系，权限控制到页面元素级别；
* PC端扩展KindEditor，支持组件拖拽配置自定义表单（工作流里那种），至于工作流目前暂未实现，还在计划。
* 移动端与PC端都支持主题切换，数据保存在localStorage里。

示例图
----

### 移动端示例图

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-0.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-1.png)

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-2.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-3.png)

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-4.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-5.png)

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-6.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-7.png)

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-8.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-9.png)

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-10.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-11.png)

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-12.png)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/192.168.1.109-8080-13.png)


### PC端示例图

 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-1.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-2.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-3.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-4.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-5.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-6.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-7.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-8.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-9.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-10.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-11.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-12.jpg)
 ![image](https://github.com/yanglang1987500/SPM/blob/master/screenshot/PC-13.jpg)