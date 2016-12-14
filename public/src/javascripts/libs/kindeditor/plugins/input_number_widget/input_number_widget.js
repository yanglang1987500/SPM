
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
				'<label for="tip" style="width:60px;text-align: right;">提示文字：</label>',
				'<input class="ke-input-text" type="text" id="tip" name="tip" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="width" style="width:60px;text-align: right;">宽度：</label>',
				'<input class="ke-input-text" type="text" id="width" name="width" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="height" style="width:60px;text-align: right;">高度：</label>',
				'<input class="ke-input-text" type="text" id="height" name="height" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="max" style="width:60px;text-align: right;">最大值：</label>',
				'<input class="ke-input-text" type="text" id="max" name="max" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="min" style="width:60px;text-align: right;">最小值：</label>',
				'<input class="ke-input-text" type="text" id="min" name="min" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="value" style="width:60px;text-align: right;">默认值：</label>',
				'<input class="ke-input-text" type="text" id="value" name="value" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="precision" style="width:60px;text-align: right;">小数位：</label>',
				'<input class="ke-input-text" type="text" id="precision" name="precision" value="" style="width:150px;" />',
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
							$number.find('input.ke_input_number_widget').attr('placeholder',$('#tip',div).val())
								.attr('max',$('#max',div).val())
								.attr('min',$('#min',div).val())
								.attr('precision',$('#precision',div).val())
								.attr('defaultvalue',$('#value',div).val())
								.css({
									width:$("#width",div).val(),
									height:$("#height",div).val()
								});
							self.hideDialog().focus();
							$number = null;
							return;
						}
						self.insertHtml('{{<div contenteditable="false" class="ke_input_widget_container"><input class="ke_input_number_widget" type="number"' +
							'' +function(){
								return ['max="'+$('#max',div).val()+'"',
										'min="'+$('#min',div).val()+'"',
										'precision="'+$('#precision',div).val()+'"',
										'defaultvalue="'+$('#value',div).val()+'"'].join(' ');
							}()+
							' style="width:'+$("#width",div).val()+'px;height:'+$("#height",div).val()+'px;" readonly placeholder="' + $('#tip',div).val() + '"/>' +
							'<div class="ke_input_number_widget_mask widget_mask"></div>' +
							'</div>}}').hideDialog().focus();
					}
				}
			});
			var div = dialog.div;
			if ($number) {
				var $input = $number.find('input.ke_input_number_widget');
				$('#tip',div).val($input.attr('placeholder'));
				$('#width',div).val(parseInt($input.css('width')));
				$('#height',div).val(parseInt($input.css('height')));
				$('#max',div).val($input.attr('max'));
				$('#min',div).val($input.attr('min'));
				$('#precision',div).val($input.attr('precision'));
				$('#value',div).val($input.attr('defaultvalue'));
			}
			$('#tip',div)[0].focus();
		},
		'delete' : function() {
			var node = $number[0];
			node.previousSibling && node.previousSibling.nodeType === 3 && (node.previousSibling.nodeValue = node.previousSibling.nodeValue.replace('{{',''));
			node.nextSibling && node.nextSibling.nodeType === 3 && (node.nextSibling.nodeValue = node.nextSibling.nodeValue.replace('}}',''));
			$number && $number.remove();
			$number = null;
		}
	};
	var $number = null;
	self.plugin.getSelectedInputNumberWidget = function() {
		var $target = $(self.cmd.win.event.target);
		if($target.hasClass('ke_input_number_widget_mask')){
			self.cmd.selection(true);
			self.cmd.range.selectNode($target.parent()[0]);
			self.cmd.select();
			$number = $target.parent();
			return $number;
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

