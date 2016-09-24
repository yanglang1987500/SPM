/**
 * Created by yanglang on 2016/4/13.
 * 报修信息列表维护 
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/jquery.easyui.min.js');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/report-list.scss');
require('../../stylesheets/easyui.css');
var juicer = require('juicer');
require('../libs/jquery.mousewheel');
require('../libs/lightbox/lightbox4jquery');
require('../libs/lightbox/css/lightbox.css');
var ReportList = function () {};

//继承自框架基类
ReportList.prototype = $.extend({}, frameworkBase);
ReportList.prototype.id = 'report-list';
var widgetLiTpl = "<li class='shadow-block view-block ${it.new?\"uk-animation-scale-up\":\"\"}'>" +
    "    <header class='title'>" +
    "    <span class='fa fa-bell' style='color:${it.is_handle==\"1\"?\"#009587\":\"#E74C3C\"}'></span>" +
    "     ${it.report_title}" +
    "    <i>${it.update_time}</i>" +
    "    </header>" +
    "    <article class='content clearfix'><p>$${it.report_content}</p>" +
    "       <dl class='content clearfix'>" +
    "       {@each it.photos as photo}  " +
    "           <dd><img class='overview' src='${photo}'></dd>" +
    "       {@/each}" +
    "       </dl>" +
    "   </article>" +

    "    </li>" ;
var widgetTpl = "<ul>" +
    "{@each rows as it}" +
    widgetLiTpl+
    "     {@/each}" +
    "    </ul>";



/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
ReportList.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('报修信息列表').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
    this.bindEvents();
};

ReportList.prototype.loadBaseView = function () {
    var that = this;
    var html = require('../../../../views/modules/report-list.html');
    this.render(html);
    $('.tablecontainer',this.dom).height(this.dom.height()-55);
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/report-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/report/search',
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
        toolbar: '#report-list-toolbar'
    });

    var searchBox = $('#report-list #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:report-list');
        },
        prompt: '请输关键字，如公告标题'
    });

    var startDate = $("#startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:report-list');
        }
    });
    var endDate = $("#enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:report-list');
        }
    });

    //绑定下拉框事件 通知刷新消息
    $('#is_handle',this.dom).on('change',function(){
        Events.notify('onRefresh:report-list');
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:report-list',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue'),
            is_handle:$('#is_handle',that.dom).val(),
            startdate:startDate.combo('getValue').replace(/-/gi,''),
            enddate:endDate.combo('getValue').replace(/-/gi,'')
        });
    });
};

/**
 * 绑定按钮点击事件
 */
ReportList.prototype.bindEvents = function () {
    var that = this;

    //删除信息
    $('#delete_message_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/report/save',{action:'003',report_id:rowData.report_id},function(data){
            if(data.success){
                that.toast("删除信息成功!");
                Events.notify('onRefresh:report-list');
            }else{
                that.toast(data.message);
            }
        });
    });
    //设置是否已处理
    $('#set_handle_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/report/save',{
            action:'002',
            report_id:rowData.report_id,
            is_handle:rowData.is_handle == '0'?'1':'0'
        },function(data){
            if(data.success){
                that.toast((rowData.is_handle == '0'?'已处理':'未处理'));
                Events.notify('onRefresh:report-list');
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
ReportList.prototype.loadWidgets = function(temp){
    var widget = null,that = this;
    if(temp && $.isArray(temp)){
        temp.forEach(function(i){
           if(i.module.indexOf('report-list')!=-1){
               widget = i;
               return false;
           }
        });
    }
    if(widget == null)
        return;
    var $dom = $(widget.container);
    this.query('/report/search',{detail:true},function(ret){
        if(!ret.success){
            that.toast(ret.message);
            return;
        }
        ret.data.rows.forEach(function(item){
            if(item.photos == '')
                item.photos = [];
            else
                item.photos = item.photos.split(';');
        });
        var html = juicer(widgetTpl, ret.data);
        $dom.html(html);

    });
    Events.subscribe('websocket:report-new',function(data){
        console.log(JSON.stringify(data));
        data.photos = data.photos?data.photos.split(';'):[];
        data.new = true;
        var obj = {
            it:data
        };

        var html = juicer(widgetLiTpl, obj);
        $dom.find('ul').prepend(html);
    });
    $dom.on('click','.overview',function(){
        var $this = $(this);
        $.lightbox(function(){
            var array = [];
            $this.parent().parent().find('.overview').each(function(){
                array.push($(this).attr('src'));
            });
            return array;
        }(),$this.parent().index(),{
            left:function(){
                return $this.offset().left-$(window).scrollLeft();
            }(),
            top:function(){
                return $this.offset().top-$(window).scrollTop();
            }(),
            width:$this.width(),
            height:$this.height()
        });
    });
};

/**
 * 销毁插件
 */
ReportList.prototype.destoryWidgets = function(){
    Events.unsubscribe('websocket:report-new');
};
/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
ReportList.prototype.finish = function () {
    Events.unsubscribe('onRefresh:report-list');
    frameworkBase.finish.call(this);
};

var messagePublishList = new ReportList();
Events.subscribe('onWindowResize',function(){
    if(!messagePublishList.dom)
        return;
    $('.tablecontainer',messagePublishList.dom).height(messagePublishList.dom.height()-55);
});

module.exports = messagePublishList;