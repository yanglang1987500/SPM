[RenderCloud](https://github.com/yanglang1987500/RenderCloud) — 基本webpack搭建的一套模块化框架
==================================================

简介
----

之前搭建过一套基于requirejs(AMD)的模块化框架，主要用于公网项目，能极大的优化开发人员的效率以及用户的访问速度，另外也规范了代码的写法。<br>
这次是针对后台管理端搭建的，后端采用nodejs+express+ejs，前端开发基于webpack，ES6、sass等各种写法都支持，<br>
框架方面支持模块化定义与继承重用，全站单页应用，使用jquery-history做的路由。<br>
另外我扩展了ejs让其支持权限标签的写法，比如<authority role="admin"><button id="saveBtn">保存</button></authority>，不过目前权限体系还未引入，<br>
权限配置这块还没动工。<br>

安装
```javascript
$ npm install -d
```
启动
```javascript
$ node app.js
```
