module.exports = [
    {field: 'checked', title: '选择', width: 20,checkbox:true},
    {field: 'account_name', title: '账目名称', width: 200},
    {field: 'payed', title: '已结款项', width: 150},
    {field: 'owed', title: '未结款项', width: 150},
    {field: 'account_startdate', title: '账目开始日期', width: 150},
    {field: 'account_enddate', title: '账目结束日期', width: 150},
    {field: 'is_encased', title: '是否封存', width: 150,formatter:function(val){
        return val==1?'已封存':'未封存';
    }},
    {field: 'create_time', title: '创建时间', width: 150},
    {field: 'update_time', title: '修改时间', width: 150}
];