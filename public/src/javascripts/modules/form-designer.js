/**
 * 自定义表单设计器
 * @author yanglang
 * @type {Framework}
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/form-designer.scss');
require('../libs/kindeditor/themes/default/default.css');


var FormDesigner = function(){ };

//继承自框架基类
FormDesigner.prototype = $.extend({},frameworkBase);
FormDesigner.prototype.id = 'form-designer';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
FormDesigner.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle('自定义表单设计器').setHeight(700).setWidth(900);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();

    var that = this;
    require.ensure([],function(){
        //实例化编辑器
        require('../libs/kindeditor/kindeditor-all');
        require('../libs/kindeditor/lang/zh-CN');

        require('../libs/kindeditor/plugins/input_text_widget/input_text_widget');
        require('../libs/kindeditor/plugins/input_multi_widget/input_multi_widget');
        require('../libs/kindeditor/plugins/input_number_widget/input_number_widget');
        require('../libs/kindeditor/plugins/input_select_widget/input_select_widget');
        require('../libs/kindeditor/plugins/input_date_widget/input_date_widget');
        require('../libs/kindeditor/plugins/input_daterange_widget/input_daterange_widget');
        require('../libs/kindeditor/plugins/input_attachment_widget/input_attachment_widget');
        require('../libs/kindeditor/plugins/input_details_widget/input_details_widget');

        that.um = window.um = KindEditor.create('#myEditor',{
            basePath:'/src/javascripts/libs/kindeditor/',
            resizeType:0,
            height:550,
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
            filterMode:false,
            cssPath:'/src/stylesheets/editor.css',
            jsPath:['/src/javascripts/libs/jquery.min.js','/src/javascripts/libs/kindeditor/kindeditor-extend.js']
        });

        Events.subscribe('kindeditor_extend_location_point',function(node){
            that.um.cmd.selection(true);
            that.um.cmd.range.selectNode(node);
            that.um.cmd.range.collapse(true);
            that.um.cmd.select();
        }).subscribe('kindeditor_extend_insert_node',function(node){
            try{
                that.um.insertHtml('{{'+node.outerHTML+'}}');
                node.previousSibling.nodeType === 3 && (node.previousSibling.nodeValue = node.previousSibling.nodeValue.replace('{{',''));
                node.nextSibling.nodeType === 3 && (node.nextSibling.nodeValue = node.nextSibling.nodeValue.replace('}}',''));
                $(node).remove();
            }catch(e){console.log(e);}
        });
        
        if(that.options.action == '002'){
            that.restoreData();
        }
    });
};

FormDesigner.prototype.dialogResize = function(width,height){
    $('.ke-edit',this.dom).css('height',height-210);
    $('.ke-edit-iframe',this.dom).css('height',height-210);
};
FormDesigner.prototype.loadBaseView = function(){
    var html = require('../../../../views/modules/form-designer.html');
    this.render(html);
};

/**
 * 修改状态返显数据
 */
FormDesigner.prototype.restoreData = function () {
    var that = this;
    this.query('/form/search/'+this.options.form_id,function(data){
        if(data.success){
            that.um.html(data.data.form_html);
            $('#title',that.dom).val(data.data.form_title);
        }else
            that.toast(data.message);
    });
};

FormDesigner.prototype.bindEvents = function () {
    var that = this;

    $('.widget-list',that.dom).on('click','li',function(){
        Events.notify('kindeditor_clear_widget_var');
        var widget = $(this).attr('data-widget');
        that.um.clickToolbar(widget);
    });

    $('#submitBtn',this.dom).click(function(){
        var content = that.um.html(), title = $('#title',that.dom).val();
        if($.trim(title) == ''){
            swal('提示','请输入表单标题','warning');
            return;
        }
        that.save('/form/save',{
            action:that.options.action,
            form_id:that.options.form_id,
            form_title:title,
            form_html:content,
            form_text:that.um.text().replace(/(?:<img[^>]*?\/?>|<\/img>)/gi,'')//由于kindeditor的text获取纯文本方法会携带img标签 ，所以过滤一下
        },function(data){
            Events.notify('onRefresh:form-manage');
            data.success?(that.toast('保存成功!')):(that.toast(data.message));
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
FormDesigner.prototype.finish = function () {
    try{
        this.dom && this.dom.hide();
        this.um && this.um.remove();
        frameworkBase.finish.apply(this,arguments);
        Events.unsubscribe('kindeditor_extend_location_point').unsubscribe('kindeditor_extend_insert_node');
    }catch(e){
        console.log(e);
    }
};
/**
 * 重新调整大小
 */
FormDesigner.prototype.resize = function () {
    try{
        //this.um.setWidth(this.dom.width());
    }catch(e){
        console.log(e);
    }
};
var formDesigner = new FormDesigner();
Events.subscribe('onWindowResize',function(){
    if(!formDesigner.dom || !formDesigner.um)
        return;
    formDesigner.resize();
});

module.exports = formDesigner;