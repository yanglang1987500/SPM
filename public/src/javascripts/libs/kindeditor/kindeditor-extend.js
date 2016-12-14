/**
 * Created by 杨浪 on 2016/12/7.
 */
(function(){
    var callee = arguments.callee;
    if(typeof $ == 'undefined'){
        setTimeout(function(){
            callee();
        },100);
        return;
    }

    var KExtend = {
        init:function(){

            $('body').on('mousedown','.widget_mask',dragUtil.mouseDown);
        }
    };

    var dragUtil = {
        dragging:true,
        giveup:true,
        curDom:null,
        docSelect:function(){
            return false;
        },
        mouseDown:function(e){
            if(e.which != 1)
                return;
            var $this = $(this),$target = dragUtil.curDom = $(e.target).parent();

            dragUtil.dragging = true;
            dragUtil.giveup = true;
            dragUtil.offset = dragUtil.origin = {
                clientX:e.clientX,
                clientY:e.clientY
            };

            //获取表格要拖拽的数据
            var doc = $(document);
            doc.bind("mousemove", dragUtil.mouseMove);
            doc.bind("mouseup", dragUtil.mouseUp);
            doc.bind("selectstart", dragUtil.docSelect);


            if(e.preventDefault) {
                e.preventDefault();
            }
        },
        mouseMove:function(e){

            var target = e.target;
            if(!$(target).hasClass('ke_input_widget_container')&&!$(target).hasClass('widget_mask'))
                window.parent.Events.notify('kindeditor_extend_location_point',target);
            if(!dragUtil.curDom && !(dragUtil.offset.clientX == e.clientX && dragUtil.offset.clientY == e.clientY)){

            }
            dragUtil.curDom && dragUtil.curDom.css({
                position:'fixed',
                "top": (e.clientY  + 3) + "px",
                "left": (e.clientX  + 3) + "px",
                'z-index':9999,
                'box-shadow':'0 0 7px rgba(0,0,0,.4)',
                'background':'#fff'
            });

        },
        mouseUp:function(e){
            var doc = $(document);
            doc.unbind("mousemove", dragUtil.mouseMove);
            doc.unbind("mouseup", dragUtil.mouseUp);
            doc.unbind("selectstart", dragUtil.docSelect);
            if(!dragUtil.curDom ||
                (dragUtil.offset.clientX == e.clientX && dragUtil.offset.clientY == e.clientY) ||
                $(e.target).hasClass('ke_input_widget_container') ||
                $(e.target).hasClass('widget_mask')){
                dragUtil.curDom.css({
                    left:'auto',
                    top:'auto',
                    position:'relative',
                    'z-index':'auto',
                    'box-shadow':'none',
                    'background':'transparent'
                });
                dragUtil.curDom = null;
                return;
            }

            dragUtil.dragging = false;
            setTimeout(function(){
                if(dragUtil.curDom){
                    dragUtil.curDom.css({
                        left:'auto',
                        top:'auto',
                        position:'relative',
                        'z-index':'auto',
                        'box-shadow':'none',
                        'background':'transparent'
                    });
                    if(e.target != dragUtil.curDom.parent()[0])
                        window.parent.Events.notify('kindeditor_extend_insert_node',dragUtil.curDom[0]);
                    dragUtil.curDom = null;
                }
            },10);

        }
    };

    KExtend.init();

})();