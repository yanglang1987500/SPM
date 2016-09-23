/**
 * Created by yanglang on 2016/4/13.
 * 学校信息发布列表维护 
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/jquery.easyui.min.js');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/message-publish-list.scss');
require('../../stylesheets/easyui.css');
var juicer = require('juicer');
var MessagePublishList = function () {};

//继承自框架基类
MessagePublishList.prototype = $.extend({}, frameworkBase);
MessagePublishList.prototype.id = 'message-publish-list';
var widgetTpl = "<ul>" +
    "{@each rows as it}" +
        "<li class='shadow-block view-block'>" +
    "    <header class='title'>" +
    "    <span class='fa fa-bell'></span>" +
    "     ${it.publish_title}" +
    "    <i>${it.update_time}</i>" +
    "    </header>" +
    "    <article class='content clearfix'>$${it.publish_content}</article>" +
    "    </li>" +
    "     {@/each}" +
"    </ul>";

/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
MessagePublishList.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('学校信息发布').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
    this.bindEvents();
};

MessagePublishList.prototype.loadBaseView = function () {
    var that = this;
    var html = require('../../../../views/modules/message-publish-list.html');
    this.render(html);
    $('.tablecontainer',this.dom).height(this.dom.height()-55);
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/message-publish-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/publish-search',
        method: 'get',
        columns: [columns],
        pagination: true,
        pageSize: 20,
        ctrlSelect: true,
        checkOnSelect: true,
        selectOnCheck: true,
        loadMsg: '正在查询，请稍候……',
        striped: true,
        fit: true,
        fitColumns: true,
        loadFilter: function (data) {
            if(!data.success){
                that.toast(data.message);
            }
            return data.data;
        },
        onDblClickRow: function (rowIndex, rowData) {
            Events.require('message-publish').addCallback(function(){
                that.init();
            }).init({showType:'Pop',action:'002',publish_id:rowData.publish_id});
        },
        toolbar: '#message-publish-list-toolbar'
    });

    var searchBox = $('#message-publish-list #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:message-publish-list');
        },
        prompt: '请输关键字，如公告标题'
    });

    var startDate = $("#startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:message-publish-list');
        }
    });
    var endDate = $("#enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:message-publish-list');
        }
    });

    //绑定下拉框事件 通知刷新消息
    $('#is_show,#is_publish',this.dom).on('change',function(){
        Events.notify('onRefresh:message-publish-list');
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:message-publish-list',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue'),
            is_show:$('#is_show',that.dom).val(),
            is_publish:$('#is_publish',that.dom).val(),
            startdate:startDate.combo('getValue').replace(/-/gi,''),
            enddate:endDate.combo('getValue').replace(/-/gi,'')
        });
    });
};


/**
 * 绑定按钮点击事件
 */
MessagePublishList.prototype.bindEvents = function () {
    var that = this;
    //添加信息
    $('#add_message_btn',this.dom).click(function(){
        Events.require('message-publish').addCallback(function(){
            that.init();
        }).init({showType:'Pop'});
    });
    //修改信息
    $('#modify_message_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('message-publish').addCallback(function(){
            that.init();
        }).init({showType:'Pop',action:'002',publish_id:rowData.publish_id});
    });
    //删除信息
    $('#delete_message_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/publish-save',{action:'003',publish_id:rowData.publish_id},function(data){
            if(data.success){
                that.toast("删除信息成功!");
                Events.notify('onRefresh:message-publish-list');
            }else{
                that.toast(data.message);
            }
        });
    });
    //设置显示隐藏
    $('#set_show_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/publish-save',{
            action:'002',
            publish_id:rowData.publish_id,
            is_show:rowData.is_show == '0'?'1':'0'
        },function(data){
            if(data.success){
                that.toast((rowData.is_show == '0'?'显示':'隐藏')+"信息成功!");
                Events.notify('onRefresh:message-publish-list');
            }else{
                that.toast(data.message);
            }
        });
    });
    //发布信息
    $('#publish_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/publish-save',{
            action:'002',
            publish_id:rowData.publish_id,
            is_publish:'1'
        },function(data){
            if(data.success){
                that.toast("发布信息成功!");
                Events.notify('onRefresh:message-publish-list');
            }else{
                that.toast(data.message);
            }
        });
    });
    //取消发布信息
    $('#unpublish_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return; 
        that.save('/publish-save',{
            action:'002',
            publish_id:rowData.publish_id,
            is_publish:'0'
        },function(data){
            if(data.success){
                that.toast("取消发布信息成功!");
                Events.notify('onRefresh:message-publish-list');
            }else{
                that.toast(data.message);
            }
        });
    });

    function getSelectRow(){
        var rowData = that.$table.datagrid('getSelected');
        if(!rowData){
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        return rowData;
    }
};

/**
 * 加载插件
 */
MessagePublishList.prototype.loadWidgets = function(temp){
    var widget = null,that = this;
    if(temp && $.isArray(temp)){
        temp.forEach(function(i){
           if(i.module.indexOf('message-publish-list')!=-1){
               widget = i;
               return false;
           }
        });
    }
    if(widget == null)
        return;
    var $dom = $(widget.container);
    this.query('/publish-search',{detail:true},function(ret){
        if(!ret.success){
            that.toast(ret.message);
            return;
        }
        var html = juicer(widgetTpl, ret.data);
        $dom.html(html);
    });
    Events.subscribe('websocket:message-publish-new',function(data){
        $dom.find('ul').prepend('<li class="shadow-block view-block uk-animation-scale-up"><header class="title"><span class="fa fa-bell"></span> '+data.publish_title+'<i>'+data.update_time+'</i></header><article class="content clearfix">'+data.publish_content+'</article></li>');
    });
};

/**
 * 销毁插件
 */
MessagePublishList.prototype.destoryWidgets = function(){
    Events.unsubscribe('websocket:message-publish-new');
};
/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
MessagePublishList.prototype.finish = function () {
    Events.unsubscribe('onRefresh:message-publish-list');
    frameworkBase.finish.call(this);
};

var messagePublishList = new MessagePublishList();
Events.subscribe('onWindowResize',function(){
    if(!messagePublishList.dom)
        return;
    $('.tablecontainer',messagePublishList.dom).height(messagePublishList.dom.height()-55);
});

module.exports = messagePublishList;