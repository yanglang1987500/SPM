/**
 * 顶层入口页面index.jsp 初始化脚本 
 */


$(function(){
	resize();
	$(window).resize(resize);
	bindEvents();
});

function bindEvents(){
	$('#tabs>li').bind('click',function(){
		if($(this).hasClass('selected'))
			return;
		$('#tabs>li').removeClass('selected');
		$(this).addClass('selected');
		var $iframe = $('#pages>div.page').removeClass('show').eq($(this).index()).addClass('show').find('iframe');
		//优化加载 点相应的页签加载相应内容
		if($iframe.attr('src') == ''){
			$iframe.attr('src',$iframe.attr('s'));
		}
	});
}


function resize(){
	$('.container').height($(window).height()-10);
	$('#pages').height($(window).height()-40);
}