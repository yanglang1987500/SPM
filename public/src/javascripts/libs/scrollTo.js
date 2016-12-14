;(function($){
    $.extend($.fn, {
        scrollTo: function(m,duration){
            var n = 0, timer = null, that = this;
            var smoothScroll = function(m){
                var per = Math.round(m / 50);
                n = n + per;
                if(n > m){
                    window.clearInterval(timer);
                    return false;
                }
                that.scrollTop(n);
            };

            timer = window.setInterval(function(){
                smoothScroll(m);
            }, duration!=null?duration:20);
        }
    })
})(Zepto)