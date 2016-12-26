/**
 * Created by IBM on 2015/3/27.
 * jquery-loading 加载进度插件
 * @param content 进度框内容
 * @param second  定时多少秒后关闭，单位：秒（可选参数）
 * 封装在$.ui（UI包）下
 * @author yanglang
 */
(function($) {
    !$.ui?$.ui={}:"";
    $.ui.loading = function(content,second,callback){
    	second = second || 1;
        var pophtml = '<div class="uiloading" style="width:80%;height:100px;transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);-moz-transform:translate3d(-50%,-50%,0)">' +
            '            <div class="uiloading_content"><span>' +
            					content +
            '            </span></div>' +
            '        </div>';
        var $pop = $(pophtml).appendTo($('body'));
        var $mask = $('<div class="uiloading_mask"></div>').appendTo($('body'));
        var close = function(){
            $pop.fadeOut(200,function() {
                $(this).remove();
            });
            $mask.fadeOut(200,function() {
                $(this).remove();
            });
        };
        $('.uiloading_close',$pop).click(function(){
            close();
        });
        $pop.fadeIn(200);
        $mask.css({opacity:0.7}).fadeIn(200);
        if(second && $.isNumeric(second)){
        	window.setTimeout(function(){
        		close();
        		callback && callback();
        	},second*1000);
        }
        return {
          close:close,
          get:function(selector){
        	  return $(selector,$pop);
          }
        };
    };
    $.ui.toast = function(content,second,callback){
        var $old = null;
    	if(($old = $('.uitoast')).length > 0)
            $old.fadeOut(200,function(){
                $old.remove();
            });
    	second = second || 1;
        var pophtml = '<div class="uitoast" style="transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);-moz-transform:translate3d(-50%,-50%,0)">' +
            '            <div class="uitoast_content">' +
            					content +
            '            </div>' +
            '        </div>';
        var $pop = $(pophtml).appendTo($('body'));
        var close = function(){
        	$pop.removeClass('show');
        	window.setTimeout(function(){
        		$pop.remove();
            },1000);
        };
        $('.uiloading_close',$pop).click(function(){
            close();
        });
        window.setTimeout(function(){
        	$pop.addClass('show');
        },10);
        window.setTimeout(function(){
        	if(second && $.isNumeric(second)){
            	window.setTimeout(function(){
            		close();
            	},second*1000);
            }
        },1000);
        
        callback && callback();
        
        return {
          close:close,
          get:function(selector){
        	  return $(selector,$pop);
          }
        };
    };
    $.ui.tips = function(content,second,callback){
    	if($('.uitoasttips').length > 0)
    		return false;
    	second = second || 1;
        var pophtml = '<div class="uitoasttips">' +
            '            <div class="uitoast_content">' +
            					content +
            '            </div>' +
            '        </div>';
        var $pop = $(pophtml).appendTo($('body'));
        var close = function(){
        	$pop.removeClass('show');
        	window.setTimeout(function(){
        		$pop.remove();
            },1000);
        };
        $('.uiloading_close',$pop).click(function(){
            close();
        });
        window.setTimeout(function(){
        	$pop.addClass('show');
        },10);
        window.setTimeout(function(){
        	if(second && $.isNumeric(second)){
            	window.setTimeout(function(){
            		close();
            	},second*1000);
            }
        },1000);
        
        callback && callback();
        
        return {
          close:close,
          get:function(selector){
        	  return $(selector,$pop);
          }
        };
    };
})($);
