module.exports = [
    {field: 'menu_id', title: '菜单ID', width: 200},
    {field: 'menu_title', title: '菜单标题', width: 150},
    {field: 'menu_url', title: '菜单url', width: 150},
    {field: 'show_type', title: '展示形式', width: 80,formatter: function (val) {
        return val==1?'普通':'弹窗';
    }},
    {field: 'menu_type', title: '菜单位置', width: 80,formatter: function (val) {
        return val==1?'左侧菜单':val==2?'设置下拉菜单':'首页';
    }},
    {field: 'menu_icon', title: '菜单图标样式名称', width: 150},
    {field: 'menu_parent_title', title: '父菜单', width: 200}
];