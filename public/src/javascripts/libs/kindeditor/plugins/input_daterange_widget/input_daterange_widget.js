
/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('input_daterange_widget', function(K) {
	var self = this, name = 'input_daterange_widget',uName = 'InputDaterangeWidget', lang = self.lang(name + '.');
	Events.subscribe('kindeditor_clear_widget_var',function(){
		$dateRange = null;
	});
	self.plugin.input_daterange_widget = {
		edit : function() {
			var html = ['<div style="padding:20px;">',
				'<div class="ke-dialog-row">',
				'<label for="width" style="width:80px;text-align: right;">宽度：</label>',
				'<input class="ke-input-text" type="text" id="width" name="width" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label for="height" style="width:80px;text-align: right;">高度：</label>',
				'<input class="ke-input-text" type="text" id="height" name="height" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label style="width:80px;text-align: right;" for="dateformat">日期格式：</label>',
				'<select id="dateformat" style="vertical-align: middle"><option value="1">'+Calendar.getInstance().format('yyyy-MM-dd HH:mm:ss')+'</option><option value="2">'+Calendar.getInstance().format('yyyy-MM-dd')+'</option></select>',
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
						var dateformat = $('#dateformat',div).val();
						if($dateRange){
							$dateRange.attr('dateformat',dateformat).find('.ke_input_daterange_date_widget').css({
								width:$("#width",div).val(),
								height:$("#height",div).val()
							});
							self.hideDialog().focus();
							return;
						}
						self.insertHtml('{{<div contenteditable="false" class="ke_input_widget_container">' +
							'<div class="ke_input_daterange_widget">' +
								'<input placeholder="请选择开始时间" class="ke_input_daterange_date_widget date_start" dateformat="'+dateformat+'" readonly style="width:'+$("#width",div).val()+'px;height:'+$("#height",div).val()+'px;" />' +
								'&nbsp;到&nbsp;<input placeholder="请选择结束时间" class="ke_input_daterange_date_widget date_end" dateformat="'+dateformat+'" readonly style="width:'+$("#width",div).val()+'px;height:'+$("#height",div).val()+'px;" />' +
							'</div>' +
							'<div class="ke_input_daterange_widget_mask widget_mask"></div>' +
							'</div>}}').hideDialog().focus();
					}
				}
			});
			var div = dialog.div;
			if ($dateRange) {
				$('#width',div).val(parseInt($dateRange.find('.ke_input_daterange_date_widget').css('width')));
				$('#height',div).val(parseInt($dateRange.find('.ke_input_daterange_date_widget').css('height')));
				$('#dateformat',div).val($dateRange.attr('dateformat'));
			}
			$('#width',div)[0].focus();
		},
		'delete' : function() {
			var node = $dateRange[0];
			node.previousSibling.nodeType === 3 && (node.previousSibling.nodeValue = node.previousSibling.nodeValue.replace('{{',''));
			node.nextSibling.nodeType === 3 && (node.nextSibling.nodeValue = node.nextSibling.nodeValue.replace('}}',''));
			$dateRange && $dateRange.remove();
			$dateRange = null;
		}
	};
	var $dateRange = null;
	self.plugin.getSelectedInputDaterangeWidget = function() {
		var $target = $(self.cmd.win.event.target);
		if($target.hasClass('ke_input_daterange_widget_mask')){
			self.cmd.selection(true);
			self.cmd.range.selectNode($target.parent()[0]);
			self.cmd.select();
			$dateRange = $target.parent();
			return $dateRange;
		}
		return null;
	};
	$.each(['edit','delete'],function(i,val){
		self.addContextmenu({
			title : self.lang(val+'input_daterange_widget'),
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
	

	self.clickToolbar(name, self.plugin.input_daterange_widget.edit);
});

