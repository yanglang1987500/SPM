<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="webim-search-container"  :style="'min-height:'+WINHEIGHT+'px'">
        <navigator :navigator-title="navigatorTitle"></navigator>
        <div id="searchBar" class="fixed">
            <input type="text" id="editorBox" />
            <button id="searchBtn" >搜索</button>
        </div>
        <div class="content-wrap">
            <ul class="roster-list">
                <template v-for="item in dataList" >
                    <router-link @click.native="routerClick" v-bind:to="'/webim-detail?type='+type+'&id='+(type=='1'?item.user_name:item.id)+'&title='+(type=='1'?item.nickname:item.name)">
                        <li>
                            <div class="li-wrap">
                                <div class="head-circle-name"><h3 :style="'color:'+getColor(type=='1'?item.nickname:item.name)+''">{{type=='1'?item.nickname:item.name}}</h3></div>
                                {{type=='1'?item.nickname:item.name}}
                            </div>
                        </li>
                    </router-link>
                </template>
            </ul>
        </div>

    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    var store = require('../utils/store');
    var webIM = require('../utils/webIM');

    var methods = {
        getColor:function(name){
            if(!name)
                return '#000';
            var num = utils.djb2Code(name);
            num = /^.*(\d)$/.test(num) && RegExp.$1;;
            return utils.colors[parseInt(num)];
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/webim-search',
        data:function(){
            var type = this.$route.query.type;
            return {
                WINHEIGHT:window.HEIGHT,
                type:type,
                dataList:[],
                navigatorTitle:type=='1'?'好友查找':'群组查找'
            };
        },
        methods:methods,
        components:{navigator:navigator},
        computed:{
            user_name:function(){
                return store.state.username;
            }
        },
        destroyed:function(){
        },
        mounted:function() {
            var that = this;
            $('#editorBox').keyup(function(e){
                if(e.keyCode == 13){
                    $('#searchBtn').click();
                }
            });

            $('#searchBtn').click(function(){
                var key = $('#editorBox').val();
                if(key.trim() == '')
                    return;
                utils.ajax.query('/webim/'+(that.type=='1'?'users':'groups')+'/'+key,function(data){
                    if(!data.success){
                        $.ui.toast(data.message);
                        return;
                    }
                    var arr = [];
                    data.data.rows.forEach(function(item,index){
                        if(that.type == '1' && item.user_name != that.user_name)
                            arr.push(item);
                        else if(that.type == '2')
                            arr.push(item);
                    });
                    if(arr.length == 0)
                        $.ui.toast('未搜索到符合条件的记录');
                    that.dataList = arr;
                });
            });
        }
    };

</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/webim-search.scss";
</style>