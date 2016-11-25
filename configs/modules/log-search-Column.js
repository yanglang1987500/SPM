typeof window == 'undefined' && (Calendar = require('../../libs/calendar'));
module.exports = [
    {field: 'user_id', title: '用户id', width: 200},
    {field: 'user_name', title: '用户名', width: 100},
    {field: 'device_type', title: '登录设备', width: 100,formatter: function (val) {
        return val==1?'电脑':'手机';
    }},
    {field: 'login_time', title: '登录时间', width: 200},
    {field: 'logout_time', title: '注销时间', width: 200},
    {field: 'create_time', title: '创建时间', width: 200}
];