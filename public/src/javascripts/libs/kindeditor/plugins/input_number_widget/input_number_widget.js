
/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('input_number_widget', function(K) {
	var self = this, name = 'input_number_widget',uName = 'InputNumberWidget', lang = self.lang(name + '.');
	Events.subscribe('kindeditor_clear_widget_var',function(){
		$number = null;
	});
	self.plugin.input_number_widget = {
		edit : function() {
			var html = ['<div style="padding:20px;">',
				'<div class="ke-dialog-row">',
				'<label for="keName" style="width:60px;text-align: right;">提示文字：</label>',
				'<input class="ke-input-text" type="text" id="tip" name="tip" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="keName" style="width:60px;text-align: right;">宽度：</label>',
				'<input class="ke-input-text" type="text" id="width" name="width" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="keName" style="width:60px;text-align: right;">高度：</label>',
				'<input class="ke-input-text" type="text" id="height" name="height" value="" style="width:150px;" />',
				'</div>',
				'</div>'].join('');
			var dialog = self.createDialog({
				name : name,
				width : 300,
				title : self.lang(name),
				body : html,
				yesBtn : {
					name : self.lang('yes'),
					click : function(e) {
						if($number){
							$number.attr('placeholder',$('#tip',div).val()).css({
								width:$("#width",div).val(),
								height:$("#height",div).val()
							});
							self.hideDialog().focus();
							$number = null;
							return;
						}
						self.insertHtml('<input class="ke_input_number_widget"  type="number" style="width:'+$("#width",div).val()+'px;height:'+$("#height",div).val()+'px;" placeholder="' + $('#tip',div).val() + '"/>').hideDialog().focus();
					}
				}
			});
			var div = dialog.div;
			if ($number) {
				$('#tip',div).val($number.attr('placeholder'));
				$('#width',div).val(parseInt($number.css('width')));
				$('#height',div).val(parseInt($number.css('height')));
			}
			$('#tip',div)[0].focus();
		},
		'delete' : function() {
			$number && $number.remove();
			$number = null;
		}
	};
	var $number = null;
	self.plugin.getSelectedInputNumberWidget = function() {
		var res = $('input.ke_input_number_widget:focus',self.cmd.range.doc);
		if(res.length>0){
			$number = res;
			return res[0];
		}

		return null;
	};
	$.each(['edit','delete'],function(i,val){
		self.addContextmenu({
			title : self.lang(val+'input_number_widget'),
			click : function() {
				self.loadPlugin(name, function() {
					self.plugin[name][val]();
					self.hideMenu();
				});
			},
			cond : self.plugin['getSelected' + uName],
			width : 150,
			iconClass :  'ke-icon-' + val
		});
	});
	

	self.clickToolbar(name, self.plugin.input_number_widget.edit);
});

