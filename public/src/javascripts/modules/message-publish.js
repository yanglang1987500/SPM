/**
 * 信息发布模块
 * @author yanglang
 * @type {Framework}
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/message-publish.scss');
//require('../libs/umeditor/themes/default/css/umeditor.min.css');
require('../libs/kindeditor/themes/default/default.css');

//require('../libs/umeditor/umeditor.config');

var MessagePublish = function(){ };

//继承自框架基类
MessagePublish.prototype = $.extend({},frameworkBase);
MessagePublish.prototype.id = 'message-publish';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
MessagePublish.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle('学校信息发布').setHeight(610).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();

    var that = this;
    require.ensure([],function(){
        /*require('../libs/umeditor/umeditor.min');
        require('../libs/umeditor/lang/zh-cn/zh-cn');
        //实例化编辑器
        that.um = UM.getEditor('myEditor');*/
        require('../libs/kindeditor/kindeditor-all-min');
        require('../libs/kindeditor/lang/zh-CN');
        that.um = window.um = KindEditor.create('#myEditor',{
            basePath:'/src/javascripts/libs/kindeditor/',
            resizeType:0,
            height:470,
            uploadJson:'/file/upload',
            items:[
                'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
                'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
                'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
                'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
                , 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
                'anchor', 'link', 'unlink'
            ],
            filterMode:false
        });
        if(that.options.action == '002'){
            that.restoreData();
        }
    });


};

MessagePublish.prototype.loadBaseView = function(){
    var html = require('../../../../views/modules/message-publish.html');
    this.render(html);
};

/**
 * 修改状态返显数据
 */
MessagePublish.prototype.restoreData = function () {
    var that = this;
    this.query('/publish/search-id',{publish_id:this.options.publish_id},function(data){
        if(data.success){
            that.um.html(data.data.publish_content);
            $('#title',that.dom).val(data.data.publish_title);
        }else
            that.toast(data.message);
    });
};

MessagePublish.prototype.bindEvents = function () {
    var that = this;

    $('#submitBtn',this.dom).click(function(){
        var content = that.um.html(), title = $('#title',that.dom).val();
        if($.trim(content) == ''){
            swal('提示','请输入信息内容','warning');
            return;
        }
        if($.trim(title) == ''){
            swal('提示','请输入标题','warning');
            return;
        }
        that.save('/publish/save',{
            action:that.options.action,
            publish_id:that.options.publish_id,
            publish_title:title,
            publish_content:content,
            publish_content_pure:that.um.text().replace(/(?:<img[^>]*?\/?>|<\/img>)/gi,'')//由于kindeditor的text获取纯文本方法会携带img标签 ，所以过滤一下
        },function(data){
            data.success?(that.finish()):(that.toast(data.message));
        });
    });
    $('#cancelBtn',this.dom).click(function(){
        that.finish();
    });
    $('#title',this.dom)[0].focus();
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
MessagePublish.prototype.finish = function () {
    try{
        this.dom && this.dom.hide();
        //this.um.destroy();
        this.um && this.um.remove();
        frameworkBase.finish.apply(this,arguments);
    }catch(e){
        console.log(e);
    }
};
/**
 * 重新调整大小
 */
MessagePublish.prototype.resize = function () {
    try{
        //this.um.setWidth(this.dom.width());
    }catch(e){
        console.log(e);
    }
};
var messagePublish = new MessagePublish();
Events.subscribe('onWindowResize',function(){
    if(!messagePublish.dom || !messagePublish.um)
        return;
    messagePublish.resize();
});

module.exports = messagePublish;