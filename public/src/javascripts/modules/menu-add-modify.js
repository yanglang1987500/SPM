/**
 * 菜单新增修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/menu-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var MenuAddModify = function(){ };

//继承自框架基类
MenuAddModify.prototype = $.extend({},frameworkBase);
MenuAddModify.prototype.id = 'menu-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
MenuAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加菜单':'编辑菜单').setHeight(380).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(this.options.action == '002'){
        this.restoreData();
    }
};

MenuAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/menu-add-modify.html');
    this.render(html);



};  

MenuAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var menu_title = $('#menu_title',that.dom).val();
        var menu_url = $('#menu_url',that.dom).val();
        if($.trim(menu_title) === '' ){
            swal("提示", "请输入菜单标题!", "warning");
            return;
        }
        that.save('/menu/save',{
            action:that.options.action,
            menu_id:that.options.menu_id,
            menu_title:menu_title,
            menu_url:menu_url,
            show_type:$('#show_type',that.dom).val(),
            menu_type:$('#menu_type',that.dom).val(),
            menu_icon:$('#menu_icon',that.dom).val(),
            menu_parent_id:$('#menu_parent_id',that.dom).attr('data-pid')
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

    this.$treepanel = $('<div id="menu_tree_panel" class="dropdown_panel"><ul id="menuTree" class="ztree"></ul></div>').appendTo($('body'));
    var $menu_parent_id = $('#menu_parent_id',this.dom);

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

MenuAddModify.prototype.initMenuTree = function(){
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
                    //包括自己在内，如果层级大于2则不让选
                    if(treeNode.getPath().length <3){
                        $('#menu_parent_id',that.dom).val(treeNode.menu_title);
                        $('#menu_parent_id',that.dom).attr('data-pid',treeNode.menu_id);
                        hidePanel();
                    }
                }
            }
        };

        var ztreeObj = $.fn.zTree.init($("#menuTree",that.$treepanel), setting,data.data);
        ztreeObj.expandNode(ztreeObj.getNodes()[0], true, false, true);
    });
};

function hidePanel(){
    $('.dropdown_panel').hide();
}
$('body').on('click',function(){
    hidePanel();
});
MenuAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/menu/search/'+this.options.menu_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#menu_title',that.dom).val(data.menu_title);
        $('#menu_url',that.dom).val(data.menu_url);
        $('#menu_icon',that.dom).val(data.menu_icon);
        $('#show_type',that.dom).val(data.show_type);
        $('#menu_type',that.dom).val(data.menu_type);
        $('#menu_parent_id',that.dom).val(data.menu_parent_title);
        $('#menu_parent_id',that.dom).attr('data-pid',data.menu_parent_id);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
MenuAddModify.prototype.finish = function () {
    this.$treepanel.remove();
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new MenuAddModify();