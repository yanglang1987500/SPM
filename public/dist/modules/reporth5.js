webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(33);
	__webpack_require__(147);
	var frameworkBase = __webpack_require__(29);
	var FastClick = __webpack_require__(36);

	$(function() {
		FastClick.attach(document.body);
		$('#content').artEditor({
			imgTar: '#imageUpload',
			limitSize: 5,   // 兆
			showServer: true   ,
			uploadUrl: '/file/upload',
			data: {},
			uploadField: 'upfile',
			placeholader: '<p>请输入文章正文内容</p>',
			validHtml: ["<br/>"],
			formInputId: 'target',
			uploadSuccess: function(res) {
				// return img url
				return 'file/'+res.url;
			},
			uploadError: function(res) {
				// something error
				console.log(res);
			}
		});
		$('#submitBtn').click(function(){
			var title = $('#title').val(),content = $('#content').val();
			if($.trim(title) == ''){
				frameworkBase.toast('标题不能为空');
				return;
			}
			if($.trim(content) == ''){
				frameworkBase.toast('内容不能为空');
				return;
			}
			frameworkBase.save('/report-save',{
				action:'001',
				report_title:$('#title').val(),
				report_content:$('#content').val(),
				photos:function(){
					var arr = [];
					$('#imageList img').each(function(){
						arr.push($(this).attr('src'));
					});
					return arr.join(';');
				}()
			},function(data){
				if(!data.success) {
					frameworkBase.toast(data.message);
					return;
				}else{
					frameworkBase.toast('提交成功');
				}
			});
		});
		$('#imageList').on('click','.close',function(){
			var $img = $(this).next();
			frameworkBase.save('/file/remove/',{filename:$img.attr('src')},function(data){
				$img.parent().remove();
			});
		});
	});


/***/ },

/***/ 147:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});