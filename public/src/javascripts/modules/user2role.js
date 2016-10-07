
var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/user2role.scss');
var User2Role = function(){ };

//继承自框架基类
User2Role.prototype = $.extend({},frameworkBase);
User2Role.prototype.id = 'user2role';

/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
User2Role.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('编辑角色下的用户').setHeight(500).setWidth(600);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
    this.bindEvents();
    this.restoreData();
};

User2Role.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/user2role.html');
    this.render(html);
};

User2Role.prototype.bindEvents = function(){
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
    $('#userList',this.dom).on('dblclick','li.list-item',function(){
        roleItemClick($(this));
    });
    $('#addUser',this.dom).click(function(){
        var $item = $('#userList .list-item.selected');
        roleItemClick($item);
    });
    function roleItemClick($item){
        if($item.length == 0)
            return;
        var user_id = $item.attr('data-user-id');
        if($('#mapList .list-item[data-user-id="'+user_id+'"]').length == 0){
            var role_name = $item.html();
            $('<li class="list-item" data-user-id="'+user_id+'">'+role_name+'</li>').appendTo($('#mapList'));
        }
    }
    function removeItem($item){
        $item.remove();
    }
    $('#removeUser',this.dom).click(function(){
        var $item = $('#mapList .list-item.selected');
        removeItem($item);
    });
    $('#addAllUser',this.dom).click(function(){
        $('#userList .list-item').each(function(){
            roleItemClick($(this));
        });
    });
    $('#removeAllUser',this.dom).click(function(){
        $('#mapList .list-item').remove();
    });


    $('#confirmBtn',this.dom).click(function(){
        that.save('/role/roleuser/',{
            role_id:that.options.role_id,
            user_ids:function(){
                var ids = [];
                $('#mapList .list-item').each(function(){
                    ids.push($(this).attr('data-user-id'));
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

User2Role.prototype.restoreData = function() {
    var that = this;
    this.query('/user/list',{page:1,rows:999999},function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var html = '';
        for(var i = 0,len = data.data.total;i<len;i++){
            html += '<li class="list-item" data-user-id="'+data.data.rows[i].user_id+'">'+data.data.rows[i].user_name+'</li>'
        }
        $('#userList',that.dom).html(html);
    });
    this.query('/role/roleuser',{role_id:this.options.role_id,page:1,rows:99999},function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        var html = '';
        for(var i = 0,len = data.data.length;i<len;i++){
            html += '<li class="list-item" data-user-id="'+data.data[i].user_id+'">'+data.data[i].user_name+'</li>'
        }
        $('#mapList',that.dom).html(html);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
User2Role.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new User2Role();