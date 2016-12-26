/**
 * Created by yanglang on 2015/7/25.
 * jquery-alert 对话框插件
 * @param object 参数包
 * 封装在$.ui（UI包）下
 * @author yanglang
 */
(function($) {
    !$.ui?$.ui={}:"";
    $.ui.alert = function(options){
        if($('.uialert').length>0)
            return;
        var defaults = {
        	title: '提示',
            content:'这是一个对话框',
            closeBtn:'',
            buttons:[{
                name:'确定',
                id:'confirmBtn',
                color:'#fff',
                bgColor:'#ff9600',
                callback:function(){

                },
                closable:true
            }],
            closable:false,
            autoClose: false,
            animationClose: false
        };

        if($.isPlainObject(options))
            var options = $.extend(defaults, options);
        else{
            defaults.content = '<h3 class="h3">'+options+'</h3>';
            if(arguments.length=2)
                defaults.buttons[0].callback = arguments[1];
            var options = defaults;
        }
        var alerthtml = '<div class="uialert">' +
        	'           <div class="'+options.closeBtn+'"></div>' +
            '           <div class="uialert_inner"> ' +
            '				<h2 class="h2">'+options.title+'</h2>'+
            '               <div class="uialert_content">' +
                                options.content +
            '               </div>' +
            '               <div class="uialert_button_container">' +
                                (function(){
                                    var buttons = options.buttons,btnStr = '';
                                    for(var i = 0,len = buttons.length;i<len;i++){
                                        var bgColor = buttons[i].bgColor?buttons[i].bgColor:'#ff9600',
                                            color   = buttons[i].color?buttons[i].color:"#fff",
                                            bdColor = buttons[i].bdColor?buttons[i].bdColor:'';
                                            shadow  = bdColor?'box-shadow: 0 0 0 1px '+bdColor+' inset':'',
                                            id      = buttons[i].id?buttons[i].id:'uialertBtn'+ i,
                                            name    = buttons[i].name?buttons[i].name:'确定';
                                        options.buttons[i].id = id;
                                        btnStr += '<button class="action" style="'+shadow+'" id="'+id+'" >'+name+'</button>';
                                    }
                                    return btnStr;
                                })()+
            '               </div>' +
            '            </div>' +
            '        </div>';
        var $alert = $(alerthtml).appendTo($('body'));
        $alert.css({
            'margin-left':(-$alert.width()/2)+'px',
            'margin-top':(-$alert.height()/2)+'px'
        });
        if($('.action').length == 1){
        	$('.action').css({
        		'width':'100%',
        		'border-radius':'0 0 10px 10px'
        	});
        }
        var $mask = $('<div class="uialert_mask"></div>').appendTo($('body'));
        var close = function(){
            $alert.removeClass('dialog-open').addClass('dialog-close');
            $mask.removeClass('show');
            window.setTimeout(function () {
                $alert.remove();
                $mask.remove();
            },400);
        };
        
        $alert.on('click','.closeAlert', function(){
    		close();
    	});
        
        if(options.closable){
            $mask.on('click', function () {
                close();
            });
        }
        if(options.autoClose){
        	$('.uialert_button_container').remove();
        	$('.uialert_content').css('margin-bottom', '20px');
        	window.setTimeout(function(){
        		close();
        		options.end && options.end();
        	},1000);
        }
        var controlObj = {
            close:close,
            get:function(selector){
                return $(selector,$alert);
            }
        };
        $alert.on('click', function(e){
            if(e.target.id && e.target.tagName == 'BUTTON'){
                var targetBtn = findButton(e.target.id);
                if(targetBtn.callback)
                    targetBtn.callback.apply(controlObj);
                if(targetBtn.closable)
                    close();
            }
            e.stopPropagation();
            e.cancelBubble = true;
            return false;
        });

        function findButton(id){
            for(var i = 0,len = options.buttons.length;i<len;i++){
                if(options.buttons[i].id == id)
                    return options.buttons[i];
            }
        }

        window.setTimeout(function(){
        	if(options.animationClose){
        		$alert.addClass('show');
        	}else{
        		$alert.addClass('show').addClass('dialog-open');
        	}
            $mask.addClass('show');
        },10);

        return controlObj;
    };



})($);
