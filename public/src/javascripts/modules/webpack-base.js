/**
 * Created by 杨浪 on 2016/10/12.
 * webpack 打包需要，扫描当前文件夹下的所有需要自动打包的动态模块，所以需要一个require(变量)
 * webpack的require在没有给变量的情况下会自动扫描当前文件目录下（递归）所有的尚未打包的js文件并进行打包。
 */

Events.addMethod('require',function(moduleId,options){
    //此处有两种可能，一种是菜单，会传进来配置的./modules/aboutus（比如），另一种是直接引用模块，比如aboutus，需要判断格式
    var flag = /^\.\/modules\/(.*)$/.test(moduleId);
    return require(flag?'./'+RegExp.$1:'./'+moduleId);
});
module.exports = {};