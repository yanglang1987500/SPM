
/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('input_multi_widget', function(K) {
	var self = this, name = 'input_multi_widget',uName = 'InputMultiWidget', lang = self.lang(name + '.');
	Events.subscribe('kindeditor_clear_widget_var',function(){
		$multi = null;
	});
	self.plugin.input_multi_widget = {
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
						if($multi){
							$multi.find('textarea.ke_input_multi_widget').attr('placeholder',$('#tip',div).val()).css({
								width:$("#width",div).val(),
								height:$("#height",div).val()
							});
							self.hideDialog().focus();
							$multi = null;
							return;
						}
						self.insertHtml('{{<div contenteditable="false" class="ke_input_widget_container"><textarea class="ke_input_multi_widget" readonly style="width:'+$("#width",div).val()+'px;height:'+$("#height",div).val()+'px;" placeholder="' + $('#tip',div).val() + '"></textarea>' +
							'<div class="ke_input_multi_widget_mask widget_mask"></div>' +
							'</div>}}').hideDialog().focus();
					}
				}
			});
			var div = dialog.div;
			if ($multi) {
				var $input = $multi.find('textarea.ke_input_multi_widget');
				$('#tip',div).val($input.attr('placeholder'));
				$('#width',div).val(parseInt($input.css('width')));
				$('#height',div).val(parseInt($input.css('height')));
			}
			$('#tip',div)[0].focus();
		},
		'delete' : function() {
			var node = $multi[0];
			node.previousSibling.nodeType === 3 && (node.previousSibling.nodeValue = node.previousSibling.nodeValue.replace('{{',''));
			node.nextSibling.nodeType === 3 && (node.nextSibling.nodeValue = node.nextSibling.nodeValue.replace('}}',''));
			$multi && $multi.remove();
			$multi = null;
		}
	};
	var $multi = null;
	self.plugin.getSelectedInputMultiWidget = function() {
		var $target = $(self.cmd.win.event.target);
		if($target.hasClass('ke_input_multi_widget_mask')){
			self.cmd.selection(true);
			self.cmd.range.selectNode($target.parent()[0]);
			self.cmd.select();
			$multi = $target.parent();
			return $multi;
		}
		return null;
	};
	$.each(['edit','delete'],function(i,val){
		self.addContextmenu({
			title : self.lang(val+'input_multi_widget'),
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
	

	self.clickToolbar(name, self.plugin.input_multi_widget.edit);
});

