/**
 * Created by 杨浪 on 2016/10/9.
 * 权限标签解析器
 */

module.exports = {
    resolve:function($,sessionUserInfo){
        $('sec-authorize').each(function () {
            var url = $(this).attr('url');
            //鉴权
            var ret = sessionUserInfo.getRoles().isPermission(url);
            ret && ($(this).children().insertAfter($(this)));
        }).remove();
    }
};