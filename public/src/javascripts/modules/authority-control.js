/**
 * 权限赋值模块
 * @author yanglang
 * @type {Framework}
 */
var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/authority-control.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var AuthorityControl = function(){ };

//继承自框架基类
AuthorityControl.prototype = $.extend({},frameworkBase);
AuthorityControl.prototype.id = 'authority-control';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AuthorityControl.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('权限赋值').setHeight(500).setWidth(500);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    this.initMenuAuthority();
    this.initElementAuthority();
    this.restoreData();
};

AuthorityControl.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/authority-control.html');
    this.render(html);
};

/**
 * 修改状态返显数据
 */
AuthorityControl.prototype.restoreData = function () {
    var that = this;

};

/**
 * 初始化菜单权限
 */
AuthorityControl.prototype.initMenuAuthority = function () {
    var that = this;
    this.query('/auth/menu',{role_id:this.options.role_id},function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var setting = {
            check:{
                enable:true,
                chkboxType:{ "Y" : "ps", "N" : "s" }
            },
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

            }
        };
        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
        that.menuAuthorityTree = $.fn.zTree.init($("#menuAuthorityTree",this.dom), setting,data.data);
        that.menuAuthorityTree.expandNode(that.menuAuthorityTree.getNodes()[0], true, false, true);
    });
};

/**
 * 初始化元素权限
 */
AuthorityControl.prototype.initElementAuthority = function () {
    var that = this;
    this.query('/auth/element',{role_id:this.options.role_id},function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var setting = {
            check:{
                enable:true,
                chkboxType:{ "Y" : "ps", "N" : "s" }
            },
            data:{
                keep:{
                    parent:true,
                    leaf:true
                },
                simpleData:{
                    enable:true,
                    idKey:'node_id',
                    pIdKey:'parent_id',
                    rootPId:null
                },
                key:{
                    name:'node_title',
                    title:'node_title'
                }
            },
            callback:{

            }
        };
        data.data.push({'node_id':'0','parent_id':null,'node_title':'根节点','node_value':'','node_type':'menu'});
        that.elementAuthorityTree = $.fn.zTree.init($("#elementAuthorityTree",this.dom), setting,data.data);
        that.elementAuthorityTree.expandNode(that.elementAuthorityTree.getNodes()[0], true, false, true);
    });
};

/**
 * 绑定元素事件
 */
AuthorityControl.prototype.bindEvents = function () {
    var that = this;
    $('.ui-tabs',this.dom).on('click','li',function(){
        var $this = $(this);
        if(!$this.hasClass('actived')){
            $('.ui-tabs>li.actived').removeClass('actived');
            $this.addClass('actived');
            $('.ui-tabs-content>div').hide().eq($this.index()).show();
        }
    });
    $('#saveBtn',this.dom).click(function(){
        //获取被勾选的节点数组
        var checkedMenuNodes = that.menuAuthorityTree.getCheckedNodes(true);
        var checkedElementNodes = that.elementAuthorityTree.getCheckedNodes(true);
        that.save('/auth/save',{
            role_id:that.options.role_id,
            auth_menu_ids:function(){
                var ids = [];
                for(var i = 0;i<checkedMenuNodes.length;i++){
                    if(checkedMenuNodes[i].menu_id == '0')
                        continue;
                    ids.push(checkedMenuNodes[i].auth_id);
                }
                return ids.join(';');
            }(),
            auth_element_ids:function(){
                var ids = [];
                for(var i = 0;i<checkedElementNodes.length;i++){
                    if(checkedElementNodes[i].node_type == 'menu')
                        continue;
                    ids.push(checkedElementNodes[i].auth_id);
                }
                return ids.join(';');
            }()
        },function(data){
            if(!data.success){
                that.toast(data.message);
                return;
            }
            that.finish(true);
        });
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
AuthorityControl.prototype.finish = function () {
    try{
        frameworkBase.finish.apply(this,arguments);
    }catch(e){
        console.log(e);
    }
};

var authorityControl = new AuthorityControl();

module.exports = authorityControl;