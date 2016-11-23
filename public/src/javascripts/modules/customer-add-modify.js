/**
 * 客户新增修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/customer-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var CustomerAddModify = function(){ };

//继承自框架基类
CustomerAddModify.prototype = $.extend({},frameworkBase);
CustomerAddModify.prototype.id = 'customer-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
CustomerAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加客户':'编辑客户').setHeight(540).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
};

CustomerAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/customer-add-modify.html');
    this.render(html);
};

CustomerAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var customer_code = $('#customer_code',that.dom).val();
        var customer_name = $('#customer_name',that.dom).val();
        var customer_job = $('#customer_job',that.dom).val();
        var tel = $('#tel',that.dom).val();
        var qq = $('#qq',that.dom).val();
        var mail = $('#mail',that.dom).val();
        var customer_mark = $('#customer_mark',that.dom).val();
        var company_id = $('#company_id',that.dom).attr('data-company-id');
        if($.trim(customer_name) === '' ){
            swal("提示", "请输入客户姓名!", "warning");
            return;
        }
        if(!company_id){
            swal("提示", "请选择所属公司!", "warning");
            return;
        }
        that.save('/customer/save',{
            action:that.options.action,
            customer_id:that.options.customer_id,
            customer_code:customer_code,
            customer_name:customer_name,
            customer_job:customer_job,
            tel:tel,
            qq:qq,
            mail:mail,
            company_id:company_id,
            customer_mark:customer_mark
        },function(data){
            if(!data.success){
                that.toast(data.message);
                return;
            }
            that.finish(true);
        });

    });
    $('#cancelBtn',this.dom).click(function(){
        that.finish(false);
    });

    this.$treepanel = $('<div id="menu_tree_panel" class="dropdown_panel"><ul id="menuPanelTree" class="ztree"></ul></div>').appendTo($('body'));
    var $company_parent_id = $('#company_id',this.dom);

    $company_parent_id.click(function(){
        var offset = $company_parent_id.offset();
        that.$treepanel.css({
            left:offset.left,
            top:offset.top+30,
            width:$company_parent_id.outerWidth()
        });
        that.$treepanel.is(':visible')?(that.$treepanel.hide()):(that.$treepanel.show());
        return false;
    });
    this.$treepanel.click(function(){
        return false;
    });
    this.initCompanyTree();
};

CustomerAddModify.prototype.onMove = function(left,top){
    if(!this.$treepanel)
        return;
    var $company_parent_id = $('#company_id',this.dom);
    var offset = $company_parent_id.offset();
    this.$treepanel.css({
        left:offset.left,
        top:offset.top+30
    });
};


CustomerAddModify.prototype.initCompanyTree = function(){
    var that = this;
    this.query('/company/list',function(data){
        if(!data){
            that.toast('查询公司出错');
            return;
        }
        data.push({'company_id':0,'pId':null,'company_name':'根节点'});
        $.each(data,function(index,item){
            item.iconSkin = 'icon01';
        });
        var setting = {
            data:{
                keep:{
                    parent:true,
                    leaf:true
                },
                simpleData:{
                    enable:true,
                    idKey:'company_id',
                    pIdKey:'pId',
                    rootPId:null
                },
                key:{
                    name:'company_name'
                }
            },
            callback:{
                onClick:function(event, treeId, treeNode){
                    //根元素不让选
                    if(treeNode.company_id != '0'){
                        $('#company_id',that.dom).val(treeNode.company_name);
                        $('#company_id',that.dom).attr('data-company-id',treeNode.company_id);
                        hidePanel();
                    }
                }
            }
        };
        that.ztreeObj = $.fn.zTree.init($("#menuPanelTree",that.$treepanel), setting, data);
        that.ztreeObj.expandNode(that.ztreeObj.getNodes()[0], true, false, true);

        if(that.options.action == '002'){
            that.restoreData();
        }else{
            var node = that.ztreeObj.getNodesByParam('company_id',that.options.company_id,null)[0];
            that.ztreeObj.selectNode(node);
            $('#company_id',that.dom).val(node ? node.company_name : '');
            $('#company_id',that.dom).attr('data-company-id',that.options.company_id);
        }
    });
};

function hidePanel(){
    $('.dropdown_panel').hide();
}
$('body').on('click',function(){
    hidePanel();
});
CustomerAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/customer/search/'+this.options.customer_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#customer_code',that.dom).val(data.customer_code);
        $('#customer_name',that.dom).val(data.customer_name);
        $('#customer_job',that.dom).val(data.customer_job);
        $('#tel',that.dom).val(data.tel);
        $('#qq',that.dom).val(data.qq);
        $('#mail',that.dom).val(data.mail);
        var node = that.ztreeObj.getNodesByParam('company_id',data.company_id,null)[0];
        that.ztreeObj.selectNode(node);
        $('#company_id',that.dom).val(node ? node.company_name:'');
        $('#customer_mark',that.dom).val(data.customer_mark);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
CustomerAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new CustomerAddModify();