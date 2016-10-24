/**
 * Created by 杨浪 on 2016/10/14.
 * 目前路由动画只支持浏览器原生后退三级 更多级目前不支持
 */

var Velocity = require('../../libs/velocity.min');
var isReturn = false;
Events.subscribe('route:isReturn',function(flag){
    isReturn = flag;
});
var count = 1, prePath = '',currentPath = '';
var fns = {
    beforeEnter:function(el){
        if(prePath == this.$route.matched[0].path){
            isReturn = true;
            setTimeout(function(){
                isReturn = false;
            },2);
        }else{
            prePath = currentPath;
        }
        currentPath = this.$route.matched[0].path;
        !isReturn && $(el).css('z-index',count++);
        $(el).css({
            'position':'absolute',
            'min-height':window.HEIGHT+'px'
        });
        Velocity(el, { translateX: isReturn?'0%':'100%' }, { duration: 0 });
    },
    afterEnter:function(el){
        $(el).css({
            position:'static',
            transform:null
        });
        $("body").scrollTop(0);
    },
    enter:function(el,done){
        Velocity(el, { translateX: '0%' ,duration: isReturn?0:600},{complete:done});
    },
    leave:function(el,done){
        Velocity(el, { translateX: isReturn?'100%':'0%' ,duration: isReturn?600:0},{complete:done});
    }
};
var fns_homepage = {
    beforeEnter:function(el){
        Events.notify('route:isReturn',true);
        setTimeout(function(){
            Events.notify('route:isReturn',false);
        },2);
        prePath = '';
        currentPath = '';
        $(el).css({
            'z-index':'0',
            'position':'absolute',
            'min-height':window.HEIGHT+'px'
        });
        $("body").scrollTop(0);
        Velocity(el, { translateX: '0%' }, { duration: 0 });
    },
    afterEnter:function(el){
        $(el).css({
            position:'static'
        });
    },
    enter:function(el,done){
        Velocity(el, { translateX: '0%' ,duration: 0},{complete:done});
    },
    leave:function(el,done){
        Velocity(el, { translateX: '0%' ,duration: 0},{complete:done});
    }
};


module.exports = {
    process:function(methods){
        $.extend(methods,fns);
    },
    processHomepage:function(methods){
        $.extend(methods,fns_homepage);
    }
};