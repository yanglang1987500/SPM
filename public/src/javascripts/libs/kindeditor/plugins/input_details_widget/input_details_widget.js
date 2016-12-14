
/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('input_details_widget', function(K) {
	var self = this, name = 'input_details_widget',uName = 'InputDetailsWidget', lang = self.lang(name + '.');
	Events.subscribe('kindeditor_clear_widget_var',function(){
		$details = null;
	});
	self.plugin.input_details_widget = {
		edit : function() {
			self.insertHtml('<div class="ke_input_widget_container ke_input_details_widget">' +
				'<div class="ke_input_details_widget_wrapper">' +
				'<div class="ke_input_details_widget_wrapper_item"></div>' +
				'</div>' +
				'<div><span class="addDetailBtn">增加明细</span></div>' +
				'</div>');
		},
		'delete' : function() {
			var node = $details[0];
			$details && $details.remove();
			$details = null;
		}
	};
	var $details = null;
	self.plugin.getSelectedInputDetailsWidget = function() {
		var $target = $(self.cmd.win.event.target);
		var flag = $target.hasClass('ke_input_details_widget');
		if(flag||$target.parents('.ke_input_details_widget').length!=0){
			self.cmd.selection(true);
			self.cmd.range.selectNode($target.parent()[0]);
			self.cmd.select();
			$details = flag?$target.parent():$target.parents('.ke_input_details_widget');
			return $details;
		}
		return null;
	};
	$.each(['edit','delete'],function(i,val){
		self.addContextmenu({
			title : self.lang(val+'input_details_widget'),
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
	

	self.clickToolbar(name, self.plugin.input_details_widget.edit);
});

