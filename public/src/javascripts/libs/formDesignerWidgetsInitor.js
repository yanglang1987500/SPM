/**
 * Created by 杨浪 on 2016/12/6.
 */
var formDesignerWidgetsInitor = {
    initFlag:false,
    init:function($container){
        //TODO 表单初次化时需要给定GUID 以匹配值的还原

        !this.initFlag && this.initInputDetailsWidget($container);//一定要先初始化明细控件区域，因为要保留一份模板(只初始化第一次)
        this.initInputTextWidget($container);
        this.initInputMultiWidget($container);
        this.initInputNumberWidget($container);
        this.initInputSelectWidget($container);
        this.initInputDateWidget($container);
        this.initInputDateRangeWidget($container);
        this.initInputAttachmentWidget($container);
        this.initFlag = true;
    },
    initInputTextWidget:function($container){
        $('.ke_input_text_widget',$container).each(function(){
            var $this = $(this);
            $this.parent().find('.widget_mask').remove();
            $this.attr('readonly',false).textbox({
                prompt:$this.attr('placeholder')
            });
        });
    },
    initInputMultiWidget:function($container){
        $('.ke_input_multi_widget',$container).each(function(){
            var $this = $(this);
            $this.parent().find('.widget_mask').remove();
            $this.attr('readonly',false).textbox({
                prompt:$this.attr('placeholder'),
                multiline:true
            });
        });
    },
    initInputNumberWidget:function($container){
        $('.ke_input_number_widget',$container).each(function(){
            var $this = $(this);
            $this.parent().find('.widget_mask').remove();
            $this.attr('readonly',false).numberbox({
                //value:parseInt($this.attr('defaultvalue')),//默认值暂时注释掉，看需求
                prompt:$this.attr('placeholder'),
                max:parseInt($this.attr('max')),
                min:parseInt($this.attr('min')),
                precision:parseInt($this.attr('precision'))
            });
        });
    },
    initInputSelectWidget:function($container){
        $('.ke_input_select_widget',$container).each(function(){
            var $this = $(this);
            $this.parent().find('.widget_mask').remove();
            $this.attr('readonly',false).combobox({
                url:'/dim/group/'+$this.attr('group_id'),
                method:'get',
                editable:false,
                multiple:$this.attr('multi')=='1',
                valueField:'dim_value',
                textField:'dim_name',
                loadFilter:function(data){
                    var res = [];
                    for(var i = 0;i<data.data.length;i++){
                        res.push(data.data[i]);
                    }
                    return res;
                }
            });
        });
    },
    initInputDateWidget:function($container){
        $('.ke_input_date_widget',$container).each(function(){
            var $this = $(this),isTime = $this.attr('dateformat');
            $this.parent().find('.widget_mask').remove();
            if(isTime == '1'){
                $this.attr('readonly',false).datetimebox({
                    editable:false ,
                    formatter: function (date) {
                        return Calendar.getInstance(date).format('yyyy-MM-dd HH:mm:ss');
                    }
                });
            }else{
                $this.attr('readonly',false).datebox({
                    editable:false ,
                    formatter: function (date) {
                        return Calendar.getInstance(date).format('yyyy-MM-dd');
                    }
                });
            }

        });
    },
    initInputDateRangeWidget:function($container){
        $('.ke_input_daterange_widget',$container).each(function(){
            var $this = $(this),isTime = $this.attr('dateformat'),$dateItem = $this.find('.ke_input_daterange_date_widget');
            $this.parent().find('.widget_mask').remove();
            if(isTime == '1'){
                $dateItem.attr('readonly',false).datetimebox({
                    editable:false ,
                    formatter: function (date) {
                        return Calendar.getInstance(date).format('yyyy-MM-dd HH:mm:ss');
                    }
                });
            }else{
                $dateItem.attr('readonly',false).datebox({
                    editable:false ,
                    formatter: function (date) {
                        return Calendar.getInstance(date).format('yyyy-MM-dd');
                    }
                });
            }

        });
    },
    initInputAttachmentWidget:function($container){
        $('.ke_input_attachment_widget',$container).each(function(){
            var $this = $(this);
            $this.parent().find('.widget_mask').remove();

            $this.attr('readonly',false).filebox({
                buttonText: '上传',
                buttonAlign: 'right',
                multiple:true
            });
        });
    },
    initInputDetailsWidget:function($container){
        var that = this;
        $('.ke_input_details_widget',$container).each(function(){
            var $this = $(this);
            $this.data('template',$this.find('.ke_input_details_widget_wrapper').html());
            $this.find('.ke_input_details_widget_wrapper_item').attr('contenteditable',false);
        }).on('click','.addDetailBtn',function(){
            var $this = $(this),$details = $this.parents('.ke_input_details_widget');
            var tpl = $details.data('template');
            $(tpl).appendTo($('.ke_input_details_widget_wrapper',$details));
            $details.find('.ke_input_details_widget_wrapper_item').attr('contenteditable',false);
            that.init($details);
        });
    }
};