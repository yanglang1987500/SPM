typeof window == 'undefined' && (Calendar = require('../../libs/calendar'));
module.exports = [
    {field: 'publish_id', title: '信息ID', width: 350},
    {field: 'publish_title', title: '信息标题', width: 150},
    {field: 'publish_content_pure', title: '信息内容', width: 150},
    {field: 'create_time', title: '发布时间', width: 150},
    {field: 'update_time', title: '更新时间', width: 150},
    {field: 'is_show', title: '是否显示', width: 100,formatter: function (val) {
        return val==1?'显示':'隐藏';
    }},
    {field: 'is_publish', title: '是否发布', width: 100,formatter: function (val) {
        return val==1?'已发布':'未发布';
    }}
];