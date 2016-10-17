(function(window){
    require('./loading.css');
    var tmp = '<div class="loading-wrap"><div class="loading-preloader">' +
        '        <span></span>' +
        '        <span></span>' +
        '        <span></span>' +
        '        <span></span>' +
        '      </div></div>  ';
    var $loading = null;
    function close(){
        $loading.fadeOut(200,function(){$loading.remove()})
    }
    $.loading = function(){
        if(!$loading){
            $loading = $(tmp);
        }
        $('body').append($loading.fadeIn(100));
        return {
            close:function(){
                close();
            }
        };
    };
    $.unloading = function(){
        close();
    };
})(window);