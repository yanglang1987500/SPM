/**
 * Created by yanglang on 2016/4/13.
 */
require('./libs/jquery.min.js');
require('./libs/calendar.js');
require('./libs/sweetalert.min');
require('../stylesheets/sweetalert.css');
require('../stylesheets/index.scss');
window.toastr = require('./libs/toastr');
require('../stylesheets/toastr.scss');
require('./libs/utils');
var prefix = './modules/';
var Events = require('./framework/framework-events');
var theme,_THEME_KEY_ = '_THEME_KEY';
if(theme = localStorage.getItem(_THEME_KEY_)){
    $('#colorMenu>li.'+theme+'').addClass('actived');
    $('body').addClass(theme);
}
Events.addMethod('require',function(moduleId,options){
    if(moduleId.indexOf(prefix)=='-1'){
        moduleId = prefix + moduleId;
    }
    return require(moduleId);
}).subscribe('onSelectMenu',function(moduleId){
    $('#menu>li').removeClass('actived');
    if(moduleId.indexOf(prefix)=='-1'){
        moduleId = prefix + moduleId;
    }
    $('#menu>li').each(function(){
        var $this = $(this);
        if($this.attr('data-modules') == (moduleId)){
            $('#menu>li').removeClass('actived');
            $this.addClass('actived');
            return false;
        }
    });
});
var init = location.href.match(/^http:\/\/[^\/]*(?:\:\d{4,5})?\/([^?]*)\??.*$/)[1];
!init && (init = 'homepage')
var initModule = Events.notify('onSelectMenu',init).require(init);
initModule.init({from:'init'});

/**
 * 配置toastr通知
 */
toastr.options.timeOut = 10000;
toastr.options.positionClass = 'toast-bottom-right';


$(function(){
    $('#menu>li').click(function(){
        var $this = $(this);
        var _module = $this.attr('data-modules');
        Events.notify('onSelectMenu',_module).require(_module).init({from:'click'});
    });
    $('#colorMenu>li').click(function(){
        var $this = $(this);
        var theme = $this.attr('data-value');
        $('body').removeClass(function(index ,oldClass){return oldClass;}).addClass(theme);
        $this.parent().find('li').removeClass('actived').end().end().addClass('actived');
        localStorage.setItem(_THEME_KEY_,theme);
    });
    $('#logoutBtn').click(function(){
        window.location.href = '/logout';
    });
    $('#returnBtn').click(function(){
        window.history.go(-1);
    }); 
    $('#homepageBtn').click(function(){
        Events.require('homepage').init();
        $('#menu>li').removeClass('actived');
    });
    $('#nextBtn').click(function(){
        window.history.go(1);
    });
    $('#userInfo').click(function(){ 
    });
    $('#modifyPassword').click(function(){
        Events.require('passwordModify').init({showType:'Pop'});
    });
    $('body').on('click','a[data-module]',function(){
        var module = $(this).attr('data-module');
        $('#menu>li').removeClass('actived');
        Events.notify('onSelectMenu',module).require(module).init();
    });

    Events.subscribe('websocket:message-publish-new',function(data){
        toastr.info(data.publish_content_pure,data.publish_title);
    }).subscribe('websocket:report-new',function(data){
        toastr.info(data.report_content,data.report_title);
    });
});

