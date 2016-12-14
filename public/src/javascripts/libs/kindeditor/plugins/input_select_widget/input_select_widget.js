
/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('input_select_widget', function(K) {
	var self = this, name = 'input_select_widget',uName = 'InputSelectWidget', lang = self.lang(name + '.');
	Events.subscribe('kindeditor_clear_widget_var',function(){
		$select = null;
	});
	function queryDimGroup(groupId,callback){
		frameBase.query('/dim/group',function(data){
			if(!data.success){
				frameBase.toast(data.message);
				callback && callback({});
				return;
			}
			var options = '';
			for(var i = 0;i<data.data.length;i++){
				if(data.data[i].group_id == groupId){
					callback && callback(data.data[i]);
					return;
				}
			}

		});
	}
	self.plugin.input_select_widget = {
		edit : function() {
			var html = ['<div style="padding:20px;">',
				'<div class="ke-dialog-row">',
				'<label style="width:80px;text-align: right;">字典分组值：</label>',
				'<input class="ke-input-text" type="text" id="group_id" name="group_id" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label style="width:80px;text-align: right;">宽度：</label>',
				'<input class="ke-input-text" type="text" id="width" name="width" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label style="width:80px;text-align: right;">高度：</label>',
				'<input class="ke-input-text" type="text" id="height" name="height" value="" style="width:150px;" />',
				'</div>',
				'<div class="ke-dialog-row">',
				'<label style="width:80px;text-align: right;" for="multi">可否多选：</label>',
				'<input type="checkbox" id="multi" name="multi" style="vertical-align: middle"/>',
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
						var groupId = $('#group_id',div).val(),isMulti = $('#multi',div).attr('checked')=='checked'?1:0;
						if($select){
							var $input = $select.find('input.ke_input_select_widget');
							$input.attr('group_id',groupId).attr('multi',isMulti).css({
								width:$("#width",div).val(),
								height:$("#height",div).val()
							});
							queryDimGroup(groupId,function(groupInfo){
								$input.attr('placeholder',groupInfo.group_name);
								$select = null;
							});
							self.hideDialog().focus();
							return;
						}
						queryDimGroup(groupId,function(groupInfo){
							self.insertHtml('{{<div contenteditable="false" class="ke_input_widget_container">' +
								'<input placeholder="'+groupInfo.group_name+'" multi="'+isMulti+'" class="ke_input_select_widget" readonly group_id="'+groupId+'" style="width:'+$("#width",div).val()+'px;height:'+$("#height",div).val()+'px;" />' +
								'<div class="ke_input_select_widget_mask widget_mask"></div>' +
								'</div>}}').hideDialog().focus();
						});
					}
				}
			});
			var div = dialog.div;
			if ($select) {
				var $input = $select.find('input.ke_input_select_widget');
				$('#group_id',div).val($input.attr('group_id'));
				$('#width',div).val(parseInt($input.css('width')));
				$('#height',div).val(parseInt($input.css('height')));
				$input.attr('multi') == '1' && $('#multi',div).attr('checked',true);
			}
			$('#group_id',div)[0].focus();
		},
		'delete' : function() {
			var node = $select[0];
			node.previousSibling.nodeType === 3 && (node.previousSibling.nodeValue = node.previousSibling.nodeValue.replace('{{',''));
			node.nextSibling.nodeType === 3 && (node.nextSibling.nodeValue = node.nextSibling.nodeValue.replace('}}',''));
			$select && $select.remove();
			$select = null;
		}
	};
	var $select = null;
	self.plugin.getSelectedInputSelectWidget = function() {
		var $target = $(self.cmd.win.event.target);
		if($target.hasClass('ke_input_select_widget_mask')){
			self.cmd.selection(true);
			self.cmd.range.selectNode($target.parent()[0]);
			self.cmd.select();
			$select = $target.parent();
			return $select;
		}

		return null;
	};
	$.each(['edit','delete'],function(i,val){
		self.addContextmenu({
			title : self.lang(val+'input_select_widget'),
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
	

	self.clickToolbar(name, self.plugin.input_select_widget.edit);
});

