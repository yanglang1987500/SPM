/**
 * 元素新增修改模块
 */
var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/element-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var ElementAddModify = function(){ };

//继承自框架基类
ElementAddModify.prototype = $.extend({},frameworkBase);
ElementAddModify.prototype.id = 'element-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
ElementAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加元素':'编辑元素').setHeight(250).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();

};

ElementAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/element-add-modify.html');
    this.render(html);
};

ElementAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var element_code = $('#element_code',that.dom).val();
        var element_desc = $('#element_desc',that.dom).val();
        if($.trim(element_code) === '' ){
            swal("提示", "请输入元素编码!", "warning");
            return;
        }
        that.save('/element/save',{
            action:that.options.action,
            element_id:that.options.element_id,
            element_code:element_code,
            element_desc:element_desc,
            menu_id:$('#menu_id',that.dom).attr('data-pid')
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
    var $menu_parent_id = $('#menu_id',this.dom);

    $menu_parent_id.click(function(){
        var offset = $menu_parent_id.offset();
        that.$treepanel.css({
            left:offset.left,
            top:offset.top+30,
            width:$menu_parent_id.outerWidth()
        });
        that.$treepanel.is(':visible')?(that.$treepanel.hide()):(that.$treepanel.show());
        return false;
    });
    this.$treepanel.click(function(){
        return false;
    });
    this.initMenuTree();

};

ElementAddModify.prototype.initMenuTree = function(){
    var that = this;
    this.query('/menu/list',function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
        var setting = {
            data:{
                keep:{
                    parent:true,
                    leaf:true
                },
                simpleData:{
                    enable:true,
                    idKey:'menu_id',
                    pIdKey:'menu_parent_id',
                    rootPId:null
                },
                key:{
                    name:'menu_title',
                    title:'menu_title'
                }
            },
            callback:{
                onClick:function(event, treeId, treeNode){
                    //根元素不让选
                    if(treeNode.menu_id != '0'){
                        $('#menu_id',that.dom).val(treeNode.menu_title);
                        $('#menu_id',that.dom).attr('data-pid',treeNode.menu_id);
                        hidePanel();
                    }
                }
            }
        };

        that.ztreeObj = $.fn.zTree.init($("#menuPanelTree",that.$treepanel), setting,data.data);
        that.ztreeObj.expandNode(that.ztreeObj.getNodes()[0], true, false, true);

        if(that.options.action == '002'){
            that.restoreData();
        }else{
            var node = that.ztreeObj.getNodesByParam('menu_id',that.options.menu_id,null)[0];
            that.ztreeObj.selectNode(node);
            $('#menu_id',that.dom).val(node.menu_title);
            $('#menu_id',that.dom).attr('data-pid',that.options.menu_id);
        }
    });
};

function hidePanel(){
    $('.dropdown_panel').hide();
}
$('body').on('click',function(){
    hidePanel();
});
ElementAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/element/search/'+this.options.element_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#element_code',that.dom).val(data.element_code);
        $('#element_desc',that.dom).val(data.element_desc);
        $('#menu_id',that.dom).attr('data-pid',data.menu_id);
        var node = that.ztreeObj.getNodesByParam('menu_id',data.menu_id,null)[0];
        $('#menu_id',that.dom).val(node.menu_title);
        that.ztreeObj.selectNode(node);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
ElementAddModify.prototype.finish = function () {
    this.$treepanel.remove();
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new ElementAddModify();