/**
 * Created by yanglang on 2016/4/13.
 */
require('./libs/jquery.min.js');
require('./libs/calendar.js');
require('./libs/sweetalert.min');
require('../stylesheets/sweetalert.css');
require('../stylesheets/index.scss');
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
var urlParam = $.getUrlParamObject();
!urlParam.init && (urlParam.init = 'homepage')
var initModule = Events.notify('onSelectMenu',urlParam.init).require(urlParam.init);
initModule.init({from:'init'});

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
        Events.require(module).init();
    });
});

