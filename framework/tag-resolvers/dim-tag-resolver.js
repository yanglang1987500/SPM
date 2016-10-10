/**
 * Created by 杨浪 on 2016/10/9.
 * 字典标签解析器
 */
var dimDao = require('../../daos/dimDao');
var dims = [];

module.exports = {
    loadData:function(){
        dimDao.dimSearch({key:null,group_id:null},function(err,data){
            if(err){
               console.log(err);
               return;
            }
            dims = data;
        });
    },
    resolve:function($,sessionUserInfo){
        $('dim-group-select').each(function (i, item) {
            var groupMap = {};
            dims.forEach(function(dim){
                groupMap[dim.group_id] = dim.group_name;
            });
            var selectHtml = '',tmp = ['<option value="0">全部</option>'];
            for(var key in groupMap){
                tmp.push('<option value="'+key+'">'+groupMap[key]+'</option>');
            }
            selectHtml = '<select name="'+$(this).attr("name")+'" id="'+$(this).attr('id')+'" class="'+$(this).attr("class")+'">'+tmp.join('')+'</select>';
            $(selectHtml).insertAfter($(this));
        }).remove();
        $('dim-select').each(function (i, item) {
            var group_id = $(this).attr('dim-group-id');
            var dimMap = {};
            dims.forEach(function(dim){
                if(group_id == dim.group_id)
                    dimMap[dim.dim_value] = dim.dim_name;
            });
            var selectHtml = '',tmp = ['<option value="0">全部</option>'];
            for(var key in dimMap){
                tmp.push('<option value="'+key+'">'+dimMap[key]+'</option>');
            }
            selectHtml = '<select name="'+$(this).attr("name")+'" id="'+$(this).attr('id')+'" class="'+$(this).attr("class")+'">'+tmp.join('')+'</select>';
            $(selectHtml).insertAfter($(this));
        }).remove();
    }
};