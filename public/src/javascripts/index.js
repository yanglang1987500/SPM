/**
 * Created by yanglang on 2016/4/13.
 */
require('./libs/calendar.js');
require('./libs/sweetalert.min');
require('../stylesheets/sweetalert.css');
require('../stylesheets/index.scss');
window.toastr = require('./libs/toastr');
require('../stylesheets/toastr.scss');
require('./libs/utils');
var prefix = './modules/';
var Events = require('./libs/framework-events');
var Router = require('./modules/framework/framework-route');
Router.init();
require('./modules/webpack-base');
var frameBase = window.frameBase = require('./modules/framework/framework-base');
var theme,_THEME_KEY_ = '_THEME_KEY';
setTimeout(function(){
    if(theme = localStorage.getItem(_THEME_KEY_)){
        $('#colorMenu>li.'+theme+'').addClass('actived');
        $('body').addClass(theme);
    }else{
        $('body').addClass('bg-img-default');
    }   
},50);

Events.subscribe('onSelectMenu',function(moduleId){
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
    var showTypes = {
        1:'Normal',
        2:'Pop',
        3:'NoUI'
    };
    $('body').on('click','a[data-module]',function(){
        var module = $(this).attr('data-module');
        var showType = $(this).attr('data-showtype');
        $('#menu>li').removeClass('actived');
        module = module.replace('#','');
        if(Router.isPermission(module)){
            if(showType == '2' || showType == '3'){
                module = '.' + module;
                Events.notify('onSelectMenu',module).require(module).init({showType:showTypes[showType]});
            }else{
                //只有Normal类型的模块需要进行hash定位，弹窗以及无界面模块不需要
                location.href = '#'+module;
                return;
            }
        }else{
            frameBase.toast('您没有权限访问此资源');
        }

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

