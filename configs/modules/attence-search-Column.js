typeof window == 'undefined' && (Calendar = require('../../libs/calendar'));
module.exports = [
    {field: 'stu_id', title: '学生id', width: 350},
    {field: 'stu_name', title: '学生姓名', width: 150},
    {field: 'type', title: '考勤类型', width: 100,formatter: function (val) {
        return val==1?'进校':'出校';
    }},
    {field: 'rfid', title: 'RFID', width: 350},
    {field: 'create_time', title: '考勤时间', width: 200}
];