/**
 * 组织机构新增修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/org-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var OrgAddModify = function(){ };

//继承自框架基类
OrgAddModify.prototype = $.extend({},frameworkBase);
OrgAddModify.prototype.id = 'org-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
OrgAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加组织机构':'编辑组织机构').setHeight(this.options.action == '001'?200:150).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(this.options.action == '002'){
        $('#org_parent_id',that.dom).parent().hide();
        this.restoreData();
    }
};

OrgAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/org-add-modify.html');
    this.render(html);
};

OrgAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var org_title = $('#org_title',that.dom).val();
        if($.trim(org_title) === '' ){
            swal("提示", "请输入组织机构标题!", "warning");
            return;
        }
        that.save('/org/save',{
            action:that.options.action,
            org_id:that.options.org_id,
            org_title:org_title,
            org_parent_id:$('#org_parent_id',that.dom).attr('data-pid')
        },function(data){
            if(!data.success){
                that.toast(data.message);
                return;
            }
            that.finish(true,$('#org_parent_id',that.dom).attr('data-pid'));
        });

    });
    $('#cancelBtn',this.dom).click(function(){
        that.finish(false);
    });

    this.$treepanel = $('<div id="org_tree_panel" class="dropdown_panel"><ul id="_panelOrgTree" class="ztree"></ul></div>').appendTo($('body'));
    var $org_parent_id = $('#org_parent_id',this.dom);

    $org_parent_id.click(function(){
        var offset = $org_parent_id.offset();
        that.$treepanel.css({
            left:offset.left,
            top:offset.top+30,
            width:$org_parent_id.outerWidth()
        });
        that.$treepanel.is(':visible')?(that.$treepanel.hide()):(that.$treepanel.show());
        return false;
    });
    this.$treepanel.click(function(){
        return false;
    });
    this.initOrgTree();

};


OrgAddModify.prototype.onMove = function(left,top){
    if(!this.$treepanel)
        return;
    var $org_parent_id = $('#org_parent_id',this.dom);
    var offset = $org_parent_id.offset();
    this.$treepanel.css({
        left:offset.left,
        top:offset.top+30
    });
};

OrgAddModify.prototype.initOrgTree = function(){
    var that = this;
    this.query('/org/list',function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var setting = {
            data:{
                keep:{
                    parent:true,
                    leaf:true
                },
                simpleData:{
                    enable:true,
                    idKey:'org_id',
                    pIdKey:'org_parent_id',
                    rootPId:null
                },
                key:{
                    name:'org_title',
                    title:'org_title'
                }
            },
            callback:{
                onClick:function(event, treeId, treeNode){
                    $('#org_parent_id',that.dom).val(treeNode.org_title);
                    $('#org_parent_id',that.dom).attr('data-pid',treeNode.org_id);
                    hidePanel();
                }
            }
        };
        for(var i = 0,len = data.data.length;i<len;i++){
            data.data[i].isParent = true;
            if(data.data[i].org_id == that.options.org_parent_id){
                $('#org_parent_id',that.dom).val(data.data[i].org_title);
                $('#org_parent_id',that.dom).attr('data-pid',data.data[i].org_id);
            }
        }
        data.data.push({'org_id':'0','org_parent_id':null,'org_title':'根节点'});
        var ztreeObj = $.fn.zTree.init($("#_panelOrgTree",that.$treepanel), setting,data.data);
        var nodes = ztreeObj.getNodesByParam("org_id",that.options.org_parent_id , null);
        ztreeObj.selectNode(nodes[0], false, false);
    });
};

function hidePanel(){
    $('.dropdown_panel').hide();
}
$('body').on('click',function(){
    hidePanel();
});
OrgAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/org/search/'+this.options.org_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#org_title',that.dom).val(data.org_title);
        $('#org_parent_id',that.dom).attr('data-pid',data.org_parent_id);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
OrgAddModify.prototype.finish = function () {
    this.$treepanel.remove();
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new OrgAddModify();