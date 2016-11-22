/**
 * Created by yanglang on 2016/4/13.
 * 客户管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/jquery.ztree.exhide.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
require('../../stylesheets/modules/customer-manage.scss');
require('../../stylesheets/easyui.css');
var table2TreeDragUtil = require('../libs/table2TreeDragUtil');
var CustomerManage = function () {};

//继承自框架基类
CustomerManage.prototype = $.extend({}, frameworkBase);
CustomerManage.prototype.id = 'customer-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
CustomerManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('客户管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

CustomerManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/customer-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.initCompanyTree();
        that.bindEvents();
    });
};

CustomerManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/customer-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '',
        method: 'get',
        columns: [columns],
        cache:false,
        pagination: false,
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

            return {rows: data.data, total: data.data.length};
        },
        onDblClickRow: function (rowIndex, rowData) {
            Events.require('customer-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:customer-manage');
            }).init({showType:'Pop',action:'002',customer_id:rowData.customer_id});
        },
        toolbar: '#customer-manage-toolbar'
    });

    var searchBox = that.searchBox = $('#customer-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:customer-manage');
        },
        prompt: '请输入关键字，如客户姓名、职位或编号'
    });
    var companySearchBox = $('#customer-manage #company-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:customer-manage-company',value);
        },
        prompt: '请输入关键字，如公司名称或渲染用户名'
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:customer-manage',function(){
        var opts = that.$table.datagrid("options");
        if(!opts.url)
            opts.url = "/customer/list";
        else
            that.$table.datagrid('load',{
                company_id:selectCompanyId,
                key:searchBox.searchbox('getValue')
            });
    });


    //订阅公司树刷新
    Events.subscribe('onRefresh:customer-manage-company',function(value){
        var _nodes = that.ztreeObj.getNodesByFilter(function(node){
            if(node.company_name.indexOf(value)!=-1 || (node.render_username && node.render_username.indexOf(value)!=-1))
                return true;
            if(node.company_id == null)
                return true;
            that.ztreeObj.hideNode(node);
        });
        that.ztreeObj.showNodes(_nodes);
    });
};

var selectCompanyId, firstRefresh = false;
CustomerManage.prototype.initCompanyTree = function(){
    var that = this;
    firstRefresh = false;
    var setting = {
        async:{
            enable:true,
            url:'/company/list',
            type:'get',
            dataFilter: function(treeId, parentNode, responseData){
                $.each(responseData,function(index,item){
                    item.iconSkin = 'icon01';
                });
                return responseData;
            }
        },
        data:{
            key:{
                name:'company_name',
                title:'company_name'
            },
            simpleData:{
                idKey:'company_id',
                pIdKey:'pId'
            },
            keep:{
                parent:true
            }
        },
        callback:{
            onClick:function(event, treeId, treeNode){
                selectCompanyId = treeNode.company_id;
                Events.notify('onRefresh:customer-manage');
            },
            onAsyncSuccess:function(){
                if(firstRefresh)
                    return;
                firstRefresh = true;
            }
        }
    };
    that.ztreeObj = $.fn.zTree.init($("#companyTree",that.dom), setting,[{company_id:null,company_name:'所有公司',pId:null,isParent:true}]);
    var rootNode = that.ztreeObj.getNodes()[0];
    that.ztreeObj.expandNode(rootNode,true,true,true);
    selectCompanyId = that.ztreeObj.getNodes()[0].company_id;
    that.ztreeObj.selectNode(rootNode, false, false);
    Events.notify('onRefresh:customer-manage');
    table2TreeDragUtil.init({
        table:that.$table,
        tree:that.ztreeObj,
        titleField:'customer_name',
        callback:function(list,treeNode,isCopy){
            var nodes = that.ztreeObj.getSelectedNodes();
            if(treeNode == nodes[0]){
                return;
            }
            that.save('/customer/save',{action:'004',is_copy:isCopy,company_id:treeNode.company_id,customer_id:function(){
                var ids = [];
                list.forEach(function(item){
                    ids.push(item.customer_id);
                });
                return ids.join(',');
            }()},function(data){
                if(data.success){
                    that.toast("客户已"+(isCopy?'复制':'移动')+"到【"+treeNode.company_name+"】下。");
                    Events.notify('onRefresh:customer-manage');
                }else{
                    that.toast(data.message);
                }
            });
        }
    });

};

/**
 * 绑定按钮点击事件
 */
CustomerManage.prototype.bindEvents = function () {
    var that = this;

    //添加公司
    $('#addCompanyBtn',this.dom).click(function(){
        Events.require('company-add-modify').addCallback(function(flag){
            if(flag){
                var nodes = that.ztreeObj.getSelectedNodes();
                that.ztreeObj.reAsyncChildNodes(nodes[0], "refresh");
                that.toast('保存成功！');
            }
        }).init({showType:'Pop'});
    });
    //编辑公司
    $('#modifyCompanyBtn',this.dom).click(function(){
        var nodes = that.ztreeObj.getSelectedNodes(),company_id;
        if(nodes.length>0){
            company_id = nodes[0].company_id;
        }else{
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        Events.require('company-add-modify').addCallback(function(flag){
            if(flag){
                that.ztreeObj.reAsyncChildNodes(null, "refresh");
                that.toast('保存成功！');
            }
        }).init({showType:'Pop',action:'002',company_id:company_id});
    });
    //删除公司
    $('#removeCompanyBtn', this.dom).click(function () {
        var nodes = that.ztreeObj.getSelectedNodes();
        if (nodes.length == 0) {
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        swal({
            title: "确认",
            text: "删除该公司将会清空下面所有客户数据，确认删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/company/save', {action:'003',company_id: nodes[0].company_id}, function (data) {
                if (!data.success) {
                    that.toast(data.message);
                    return;
                }
                that.ztreeObj.removeNode(nodes[0]);
                selectCompanyId = that.ztreeObj.getNodes()[0].company_id;
                that.ztreeObj.selectNode(that.ztreeObj.getNodes()[0], false, false);
                Events.notify('onRefresh:customer-manage');
                that.toast('删除成功！');
            });
        });

    });

    //查询公司核时
    $('#queryKernalTime',this.dom).click(function(){
        var nodes = that.ztreeObj.getSelectedNodes(),company_id;
        if(nodes.length>0){
            company_id = nodes[0].company_id;
        }else{
            swal("提示", "请先选择公司!", "warning");
            return;
        }
        if(!nodes[0].render_username){
            swal("提示", "请先配置该公司的渲染客户端用户名!", "warning");
            return;
        }
        that.query('/company/kernal/'+company_id,function(data){
            if(!data.success){
                swal("核时查询", data.message);
                return;
            }
            data = data.data;
            swal("核时查询", '【'+nodes[0].company_name+'】的核时数为：'+data.kernal+'，单价为：'+data.price+'元/核时，总价为：'+(data.kernal*data.price).toFixed(2)+'元');
        });

    });
    
    
    //添加客户
    $('#add_customer_btn',this.dom).click(function(){
        var nodes = that.ztreeObj.getSelectedNodes();
        if(nodes.length == 0){
            swal("提示", "请先选择一个公司!", "warning");
            return;
        }
        Events.require('customer-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:customer-manage');
        }).init({showType:'Pop',company_id:nodes[0].company_id});
    });
    //修改客户
    $('#modify_customer_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('customer-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:customer-manage');
        }).init({showType:'Pop',action:'002',customer_id:rowData.customer_id});
    });
    //删除客户
    $('#delete_customer_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        swal({
            title: "确认",
            text: "确认删除选中用户吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/customer/save',{action:'003',customer_id:function(){
                var ids = [];
                rows.forEach(function(item){
                    ids.push(item.customer_id);
                });
                return ids.join(',');
            }()},function(data){
                if(data.success){
                    that.toast("删除成功!");
                    Events.notify('onRefresh:customer-manage');
                }else{
                    that.toast(data.message);
                }
            });
        });

    });
    $('#export_customer_btn',this.dom).on('click', function () {
        $('#exportFrame').attr('src', '/customer/export?company_id=' + (selectCompanyId == null?'':selectCompanyId)+'&key='+encodeURIComponent(that.searchBox.searchbox('getValue')));
    });

    function getSelectRow(){
        var rowData = that.$table.datagrid('getSelected');
        if(!rowData){
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        return rowData;
    }
    function getCheckRow(){
        var rows = that.$table.datagrid('getChecked');
        if(rows.length == 0){
            swal("提示", "请至少选择一条数据!", "warning");
            return;
        }
        return rows;
    }
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
CustomerManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:customer-manage');
    frameworkBase.finish.apply(this,arguments);
};

var customerManage = new CustomerManage();
Events.subscribe('onWindowResize',function(){
    if(!customerManage.dom)
        return;
    $('.tablecontainer',customerManage.dom).height(customerManage.dom.height()-15-$('.condition-wrap',customerManage.dom).height());
    customerManage.$table.datagrid('resize');
});

module.exports = customerManage;

