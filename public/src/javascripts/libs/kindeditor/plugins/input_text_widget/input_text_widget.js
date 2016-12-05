
/*******************************************************************************
 * KindEditor - WYSIWYG HTML Editor for Internet
 * Copyright (C) 2006-2011 kindsoft.net
 *
 * @author Roddy <luolonghao@gmail.com>
 * @site http://www.kindsoft.net/
 * @licence http://www.kindsoft.net/license.php
 *******************************************************************************/

KindEditor.plugin('input_text_widget', function(K) {
	var self = this, name = 'input_text_widget',uName = 'InputTextWidget', lang = self.lang(name + '.');
	self.plugin.input_text_widget = {
		edit : function() {
			var html = ['<div style="padding:20px;">',
				'<div class="ke-dialog-row">',
				'<label for="keName">' + lang.name + '</label>',
				'<input class="ke-input-text" type="text" id="keName" name="name" value="" style="width:100px;" />',
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
						self.insertHtml('<input class="ke_input_text_widget" name="' + nameBox.val() + '"/>').hideDialog().focus();
					}
				}
			});
			var div = dialog.div,
				nameBox = K('input[name="name"]', div);
			var img = self.plugin.getSelectedAnchor();
			if (img) {
				nameBox.val(unescape(img.attr('data-ke-name')));
			}
			nameBox[0].focus();
			nameBox[0].select();
		},
		'delete' : function() {
			$input && $input.remove();
		}
	};
	var $input = null;
	self.plugin.getSelectedInputTextWidget = function() {
		console.log($('input.ke_input_text_widget:focus',self.cmd.range.doc))
		var res = $('input.ke_input_text_widget:focus',self.cmd.range.doc);
		if(res.length>0){
			$input = res;
			return res[0];
		}

		return null;
	};
	$.each(['edit','delete'],function(i,val){
		self.addContextmenu({
			title : self.lang(val+'input_text_widget'),
			click : function() {
				self.loadPlugin(name, function() {
					self.plugin[name][val]();
					self.hideMenu();
				});
			},
			cond : self.plugin['getSelected' + uName],
			width : 150
		});
	});
	

	self.clickToolbar(name, self.plugin.input_text_widget.edit);
});

