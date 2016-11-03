/**
 * Created by 杨浪 on 2016/11/2.
 * table2TreeDragUtil 表格拖拽到树工具
 * init{
 *  table easyui datagrid表格对象
 *  tree ztree树对象
 *  titleField 表格上显示标题的列名
 *  callback 在树上松开鼠标时的回调方法 list 表格拖拽记录列表 treeNode ztree目标节点 isCopy 是否为复制
 * }
 */
var options = {table:null,tree:null,titleField:'',callback:$.noop};
var dragUtil = {
    dragging:true,
    giveup:true,
    list:[],
    curDom:null,
    docSelect:function(){
        return false;
    },
    mouseDown:function(e){
        var $this = $(this),multi = false;

        if($this.hasClass('datagrid-row-checked'))
            multi = true;
        dragUtil.dragging = true;
        dragUtil.giveup = true;
        dragUtil.offset = dragUtil.origin = {
            clientX:e.clientX,
            clientY:e.clientY
        };

        //获取表格要拖拽的数据
        dragUtil.list = multi ? options.table.datagrid('getChecked'):[options.table.datagrid('getRows')[parseInt($this.attr('datagrid-row-index'))]];
        var doc = $(document);
        doc.bind("mousemove", dragUtil.mouseMove);
        doc.bind("mouseup", dragUtil.mouseUp);
        doc.bind("selectstart", dragUtil.docSelect);


        if(e.preventDefault) {
            e.preventDefault();
        }
    },
    mouseMove:function(e){

        if(!dragUtil.curDom && !(dragUtil.offset.clientX == e.clientX && dragUtil.offset.clientY == e.clientY)){
            //生成
            dragUtil.curDom = $("<div class='dom_tmp domBtn' style='border:1px solid #afbfd9;background:#deedff;padding:5px 10px;font-size:12px;box-shadow:1px 1px 5px rgba(0,0,0,.3);position: absolute;'>"+function(){
                    var html = '',count = 0;
                    dragUtil.list.every(function(item){
                        if(count == 5){
                            html += '<p>……</p><p>等'+dragUtil.list.length+'条记录</p>';
                            return false;
                        }
                        html += '<p>'+item[options.titleField]+'</p>';
                        count++;
                        return true;
                    });
                    return html;
                }()+"</div>");
            dragUtil.curDom.appendTo("body");
        }
        dragUtil.curDom && dragUtil.curDom.css({
            "top": (e.clientY  + 3) + "px",
            "left": (e.clientX  + 3) + "px"
        });

    },
    mouseUp:function(){
        var doc = $(document);
        doc.unbind("mousemove", dragUtil.mouseMove);
        doc.unbind("mouseup", dragUtil.mouseUp);
        doc.unbind("selectstart", dragUtil.docSelect);


        dragUtil.list = [];
        dragUtil.dragging = false;
        if(dragUtil.giveup){
            setTimeout(function(){
                if(dragUtil.curDom){
                    dragUtil.curDom.animate({left:dragUtil.origin.clientX,top:dragUtil.origin.clientY,opacity:.3},300,function(){
                        dragUtil.curDom.remove();
                        dragUtil.curDom = null;
                    });
                }
            },10);
        }else{
            dragUtil.curDom.remove();
            dragUtil.curDom = null;
        }

    }
};

module.exports = {
    init:function(_options){
        options = $.extend(options,_options);
        if(!options.table || !options.tree){
            throw new TypeError('请提供table与tree实例对象。');
            return;
        }

        options.tree.setting.callback.onMouseUp = function(e, treeId, treeNode){
            if(treeNode && dragUtil.list.length>0){
                dragUtil.giveup = false;
                options.callback(dragUtil.list,treeNode,e.ctrlKey);
            }else{
                dragUtil.giveup = true;
            }
        };
        options.tree.setting.callback.onDragMove = function(e, treeId, treeNode){
            return false;
        };
        options.table.parent().on('mousedown','tr.datagrid-row',dragUtil.mouseDown);
    }

};