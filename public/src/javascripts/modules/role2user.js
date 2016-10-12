/**
 * 给用户赋角色模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/role2user.scss');
var Role2User = function(){ };

//继承自框架基类
Role2User.prototype = $.extend({},frameworkBase);
Role2User.prototype.id = 'role2user';

/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
Role2User.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('给用户赋角色').setHeight(500).setWidth(600);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
    this.bindEvents();
    this.restoreData();
};

Role2User.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/role2user.html');
    this.render(html);
};

Role2User.prototype.bindEvents = function(){
    this.dom.on('selectstart',function(){
        return false;
    });
    var that = this;
    $('.list-panel',this.dom).on('click','li.list-item',function(){
        var $this = $(this);
        $this.parent().find('.list-item').removeClass('selected').end().end().addClass('selected');
    });
    $('#mapList',this.dom).on('dblclick','li.list-item',function(){
        removeItem($(this));
    });
    $('#roleList',this.dom).on('dblclick','li.list-item',function(){
        roleItemClick($(this));
    });
    $('#addRole',this.dom).click(function(){
        var $item = $('#roleList .list-item.selected');
        roleItemClick($item);
    });
    function roleItemClick($item){
        var role_id = $item.attr('data-role-id');
        if($('#mapList .list-item[data-role-id="'+role_id+'"]').length == 0){
            var role_name = $item.html();
            $('<li class="list-item" data-role-id="'+role_id+'">'+role_name+'</li>').appendTo($('#mapList'));
        }
    }
    function removeItem($item){
        $item.remove();
    }
    $('#removeRole',this.dom).click(function(){
        var $item = $('#mapList .list-item.selected');
        removeItem($item);
    });
    $('#addAllRole',this.dom).click(function(){
        $('#roleList .list-item').each(function(){
            roleItemClick($(this));
        });
    });
    $('#removeAllRole',this.dom).click(function(){
        $('#mapList .list-item').remove();
    });


    $('#confirmBtn',this.dom).click(function(){
        that.save('/role/userrole/',{
            user_id:that.options.user_id,
            role_ids:function(){
                var ids = [];
                $('#mapList .list-item').each(function(){
                    ids.push($(this).attr('data-role-id'));
                }) ;
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
    $('#cancelBtn',this.dom).click(function(){
        that.finish(false);
    });
};

Role2User.prototype.restoreData = function() {
    var that = this;
    this.query('/role/list',function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var html = '';
        for(var i = 0,len = data.data.length;i<len;i++){
            html += '<li class="list-item" data-role-id="'+data.data[i].role_id+'">'+data.data[i].role_name+'</li>'
        }
        $('#roleList',that.dom).html(html);
    });
    this.query('/role/userrole',{user_id:this.options.user_id},function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var html = '';
        for(var i = 0,len = data.data.length;i<len;i++){
            html += '<li class="list-item" data-role-id="'+data.data[i].role_id+'">'+data.data[i].role_name+'</li>'
        }
        $('#mapList',that.dom).html(html);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
Role2User.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new Role2User();