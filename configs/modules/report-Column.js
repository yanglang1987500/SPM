typeof window == 'undefined' && (Calendar = require('../../libs/calendar'));
module.exports = [
    {field: 'checked', title: '选择', width: 20,checkbox:true},
    {field: 'report_id', title: '信息ID', width: 350},
    {field: 'report_title', title: '信息标题', width: 150},
    {field: 'report_content', title: '信息内容', width: 150},
    {field: 'create_time', title: '发布时间', width: 150},
    {field: 'update_time', title: '更新时间', width: 150},
    {field: 'is_handle', title: '是否已处理', width: 100,formatter: function (val) {
        return val==1?'已处理':'未处理';
    }},
];