/**
 * 移动端富文本编辑器
 * @author ganzw@gmail.com
 * @url    https://github.com/baixuexiyang/artEditor
 */
$.fn.extend({
	_opt: {
		placeholader: '<p>请输入文章正文内容</p>',
		validHtml: [],
		limitSize: 3,
		showServer: false
	},
	artEditor: function(options) {
		var _this = this,
			styles = {
				"-webkit-user-select": "text",
				"user-select": "text",
				"overflow-y": "auto",
				"text-break": "brak-all",
				"outline": "none",
				"cursor": "text"
			};
		$(this).css(styles).attr("contenteditable", true);
		_this._opt = $.extend(_this._opt, options);
		try{
			$(_this._opt.imgTar).on('change', function(e) {

				if(_this._opt.showServer) {
					_this.upload();
				}else {
					var file  = e.target.files[0];
					e.target.value = '';
					if(Math.ceil(file.size/1024/1024) > _this._opt.limitSize) {
						console.error('文件太大');
						return;
					}
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function (f) {
						var img = '<img src="'+ f.target.result +'" style="width:90%;" />';
						_this.insertImage(img);
					};
				}
			});
			_this.placeholderHandler();
			_this.pasteHandler();
		} catch(e) {
			console.log(e);
		}
		if(_this._opt.formInputId && $('#'+_this._opt.formInputId)[0]) {
			$(_this).on('input', function() {
				$('#'+_this._opt.formInputId).val(_this.getValue());
			});
		}
	},
	upload: function(data) {
		var _this = this;
		$('<iframe name="up"  style="display: none"></iframe>').insertBefore($(_this._opt.imgTar)).on('load', function(){
			var r = this.contentWindow.document.body.innerHTML;
			if(r == '')return;
			var res = JSON.parse(r);
			var src = _this._opt.uploadSuccess(res);
			if(src) {
				var img = '<img src="'+ src +'"/>';
				_this.insertImage(img);
			} else {
				_this._opt.uploadError(res);
			}
			$(_this._opt.imgTar).val('');
		});
		$('#edui-form')[0].submit();
	},
	insertImage: function(src) {
		var $li = $('<li><i class="fa fa-times-circle-o close"></i></li>').append(src);
	    $('#imageList').append($li);
	},
	pasteHandler: function() {
		var _this = this;
		$(this).on("paste", function(e) {
			console.log(e.clipboardData.items);
			var content = $(this).html();
			console.log(content);
			valiHTML = _this._opt.validHtml;
			content = content.replace(/_moz_dirty=""/gi, "").replace(/\[/g, "[[-").replace(/\]/g, "-]]").replace(/<\/ ?tr[^>]*>/gi, "[br]").replace(/<\/ ?td[^>]*>/gi, "&nbsp;&nbsp;").replace(/<(ul|dl|ol)[^>]*>/gi, "[br]").replace(/<(li|dd)[^>]*>/gi, "[br]").replace(/<p [^>]*>/gi, "[br]").replace(new RegExp("<(/?(?:" + valiHTML.join("|") + ")[^>]*)>", "gi"), "[$1]").replace(new RegExp('<span([^>]*class="?at"?[^>]*)>', "gi"), "[span$1]").replace(/<[^>]*>/g, "").replace(/\[\[\-/g, "[").replace(/\-\]\]/g, "]").replace(new RegExp("\\[(/?(?:" + valiHTML.join("|") + "|img|span)[^\\]]*)\\]", "gi"), "<$1>");
			if (!/firefox/.test(navigator.userAgent.toLowerCase())) {
			    content = content.replace(/\r?\n/gi, "<br>");
			}
			$(this).html(content);
		});
	},
	placeholderHandler: function() {
		var _this = this;

	},
	getValue: function() {
		return $(this).html();
	},
	setValue: function(str) {
		$(this).html(str);
	}
});
