/**
 * Created by yanglang on 2016/4/13.
 */
require('./libs/jquery.min.js');
require('./libs/calendar.js');
require('./libs/sweetalert.min');
require('../stylesheets/sweetalert.css');
require('../stylesheets/index.scss');
require('./libs/jquery.easyui.min.js');
window.toastr = require('./libs/toastr');
require('../stylesheets/toastr.scss');
require('./libs/utils');
var prefix = './modules/';
var Events = require('./framework/framework-events');
var Router = require('./framework/framework-route');
Router.init();
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
    moduleId = moduleId.replace('.','#')
    $('#menu a').each(function(){
        var $this = $(this);
            if($this.attr('href') == (moduleId)){
                $('#menu li').removeClass('actived');
                var $li = $this.find('>li');
                $li.addClass('actived');
                if($li.hasClass('menu_sub_item')){
                    setTimeout(function(){
                        $li.parent().parent().slideDown(200);
                    },500);
                }
                return false;
            }
    });
});

var init = '#/modules/homepage';
try{
    init = location.href.match(/^http:\/\/[^\/]*(?:\:\d{4,5})?\/(#\/modules\/[^?]*)\??.*$/)[1];
}catch(e){}
location.href = init;

/**
 * 配置toastr通知
 */
toastr.options.timeOut = 10000;
toastr.options.positionClass = 'toast-bottom-right';

 
$(function(){
    $('#colorMenu>li').click(function(){
        var $this = $(this);
        var theme = $this.attr('data-value');
        $('body').removeClass(function(index ,oldClass){return oldClass;}).addClass(theme);
        $this.parent().find('li').removeClass('actived').end().end().addClass('actived');
        localStorage.setItem(_THEME_KEY_,theme);
    });
    $('#returnBtn').click(function(){
        window.history.go(-1);
    }); 
    $('#nextBtn').click(function(){
        window.history.go(1);
    });

    $('body').on('click','a[data-module]',function(){
        var module = $(this).attr('data-module');
        var showType = $(this).attr('data-showtype');
        $('#menu>li').removeClass('actived');
        if(showType != '2'){
            location.href = module;
            return;
        }
        module = module.replace('#','.');
        Events.notify('onSelectMenu',module).require(module).init({showType:'Pop'});
    });

    Events.subscribe('websocket:message-publish-new',function(data){
        toastr.info(data.publish_content_pure,data.publish_title);
    }).subscribe('websocket:report-new',function(data){
        toastr.info(data.report_content,data.report_title);
    });
    $('.menu_item').click(function(e){
        if($(e.target).hasClass('menu_sub_item'))
            return;
        var $this = $(this),$sub = $this.find('.menu_sub');
        $sub.is(':visible')?($sub.slideUp(200)):($sub.slideDown(200));
    });
});

