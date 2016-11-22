/**
 * Created by yanglang on 2016/4/13.
 * 账目管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/jquery.ztree.exhide.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
require('../../stylesheets/modules/account-manage.scss');
require('../../stylesheets/easyui.css');
var AccountManage = function () {};

//继承自框架基类
AccountManage.prototype = $.extend({}, frameworkBase);
AccountManage.prototype.id = 'account-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AccountManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('账目管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

AccountManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/account-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.initCompanyTree();
        that.bindEvents();
    });
};

AccountManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/account-manage-Column.js');
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
            Events.require('account-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:account-manage');
            }).init({showType:'Pop',action:'002',account_id:rowData.account_id});
        },
        toolbar: '#account-manage-toolbar'
    });

    var searchBox = $('#account-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:account-manage');
        },
        prompt: '请输入关键字，如账目名称'
    });
    var companySearchBox = $('#account-manage #company-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:account-manage-company',value);
        },
        prompt: '请输入关键字，如公司名称或渲染用户名'
    });

    

    var startDate = $("#startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date) {
            Events.notify('onRefresh:account-manage', {
                company_id:selectCompanyId,
                key:searchBox.searchbox('getValue'),
                startdate: startDate.combo('getValue').replace(/-/gi, ''),
                enddate: endDate.combo('getValue').replace(/-/gi, '')
            });
        }
    });
    var endDate = $("#enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date) {
            Events.notify('onRefresh:account-manage', {
                company_id:selectCompanyId,
                key:searchBox.searchbox('getValue'),
                startdate: startDate.combo('getValue').replace(/-/gi, ''),
                enddate: endDate.combo('getValue').replace(/-/gi, '')
            });
        }
    });
    
    //订阅刷新消息
    Events.subscribe('onRefresh:account-manage',function(){
        var opts = that.$table.datagrid("options");
        opts.url = "/account/list";
        that.$table.datagrid('load',{
            company_id:selectCompanyId,
            key:searchBox.searchbox('getValue'),
            startdate:startDate.combo('getValue').replace(/-/gi,''),
            enddate:endDate.combo('getValue').replace(/-/gi,'')
        });
    });
    
    //订阅公司树刷新
    Events.subscribe('onRefresh:account-manage-company',function(value){
        var nodes = that.ztreeObj.getNodes();
        //先将全部节点隐藏
        that.ztreeObj.hideNodes(nodes);
        var _nodes = [];
        $.each(nodes,function(index,node){
            if(node.company_name.indexOf(value)!=-1 || (node.render_username && node.render_username.indexOf(value)!=-1))
                _nodes.push(node);
        });
        that.ztreeObj.showNodes(_nodes);
    });
};

var selectCompanyId, firstRefresh = false;
AccountManage.prototype.initCompanyTree = function(){
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
                Events.notify('onRefresh:account-manage');
            },
            onAsyncSuccess:function(){
                if(firstRefresh)
                    return;


                selectCompanyId = that.ztreeObj.getNodes()[0].company_id;
                that.ztreeObj.selectNode(that.ztreeObj.getNodes()[0], false, false);
                Events.notify('onRefresh:account-manage');
                firstRefresh = true;
            }
        }
    };
    that.ztreeObj = $.fn.zTree.init($("#companyTree",that.dom), setting);
};

/**
 * 绑定按钮点击事件
 */
AccountManage.prototype.bindEvents = function () {
    var that = this;

    //添加公司
    $('#addCompanyBtn',this.dom).click(function(){
        Events.require('company-add-modify').addCallback(function(flag){
            if(flag){
                that.ztreeObj.reAsyncChildNodes(null, "refresh");
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
            text: "删除该公司将会清空下面所有账目数据，确认删除吗？",
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
                Events.notify('onRefresh:account-manage');
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
            swal("提示", "请先配置该公司的渲染账目端用户名!", "warning");
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
    
    
    //添加账目
    $('#add_account_btn',this.dom).click(function(){
        var nodes = that.ztreeObj.getSelectedNodes();
        if(nodes.length == 0){
            swal("提示", "请先选择一个公司!", "warning");
            return;
        }
        Events.require('account-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:account-manage');
        }).init({showType:'Pop',company_id:nodes[0].company_id});
    });
    //修改账目
    $('#modify_account_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        if(rowData.is_encased){
            var msg = $('#encase_account_btn',this.dom).length>0?'账目已封存，请先解除封存再执行编辑操作!':'账目已封存，您没有权限修改，请联系管理员!';
            swal("提示", msg, "warning");
            return;
        }
        Events.require('account-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:account-manage');
        }).init({showType:'Pop',action:'002',account_id:rowData.account_id});
    });
    //删除账目
    $('#delete_account_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        for(var i = 0;i<rows.length;i++){
            if(rows[i].is_encased){

                var msg = $('#encase_account_btn',this.dom).length>0?'账目已封存，请先解除封存再执行删除操作!':'存在已封存账目，您没有权限删除，请联系管理员!';
                swal("提示", msg, "warning");
                return;
            }
        }
        swal({
            title: "确认",
            text: "确认删除选中账目吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/account/save',{action:'003',account_id:function(){
                var ids = [];
                rows.forEach(function(item){
                    ids.push(item.account_id);
                });
                return ids.join(',');
            }()},function(data){
                if(data.success){
                    that.toast("删除成功!");
                    Events.notify('onRefresh:account-manage');
                }else{
                    that.toast(data.message);
                }
            });
        });

    });
    //封存账目
    $('#encase_account_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        that.save('/account/save',{action:'004',account_id:function(){
            var ids = [];
            rows.forEach(function(item){
                ids.push(item.account_id);
            });
            return ids.join(',');
        }()},function(data){
            if(data.success){
                that.toast("封存账目成功!");
                Events.notify('onRefresh:account-manage');
            }else{
                that.toast(data.message);
            }
        });
    });
    //解除封存账目
    $('#unencase_account_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        that.save('/account/save',{action:'005',account_id:function(){
            var ids = [];
            rows.forEach(function(item){
                ids.push(item.account_id);
            });
            return ids.join(',');
        }()},function(data){
            if(data.success){
                that.toast("解除封存账目成功!");
                Events.notify('onRefresh:account-manage');
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
AccountManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:account-manage');
    frameworkBase.finish.apply(this,arguments);
};

var accountManage = new AccountManage();
Events.subscribe('onWindowResize',function(){
    if(!accountManage.dom)
        return;
    $('.tablecontainer',accountManage.dom).height(accountManage.dom.height()-15-$('.condition-wrap',accountManage.dom).height());
    accountManage.$table.datagrid('resize');
});

module.exports = accountManage;

