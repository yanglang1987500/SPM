<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="webim-detail-container">
        <navigator :navigator-title="NavigatorTitle"></navigator>
        <div class="content-wrap">
           <div class="head" id="head-content">
               <div class="head-icon">
                   <div class="head-circle-name"><h3 :style="'color:'+getColor(title)+''">{{title}}</h3></div>
               </div>
               <p class="user-name" >{{title}}</p>
           </div>
            <div id="main-content" style="height:2rem;background: rgba(250, 250, 250, 0.94);">
                <button id="searchBtn" >{{btnTitle}}</button>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    var store = require('../utils/store');
    var webIM = require('../utils/webIM');
    require('../../libs/alert/jquery-alert.css');
    require('../../libs/alert/jquery-alert.js');
    require('../../libs/toast/jquery-loading.css');
    require('../../libs/toast/jquery-loading.js');

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
        module:'/webim-detail',
        data:function(){
            var type = this.$route.query.type,id = this.$route.query.id, title = this.$route.query.title;
            return {
                NavigatorTitle:type == 1?'用户信息':'群组信息',
                title:title,
                type:type,
                id:id,
            };
        },
        methods:methods,
        components:{navigator:navigator},
        computed:{
            user_name:function(){
                return store.state.username;
            },
            btnTitle:function(){
                if(this.type == '1'){
                    var rosterList = store.state.rosterList;
                    for(var i = 0;i<rosterList.length;i++){
                        if(rosterList[i].name == this.id){
                            return '发送消息';
                        }
                    }
                }else{
                    var groupList = store.state.groupList;
                    for(var i = 0;i<groupList.length;i++){
                        if(groupList[i].roomId == this.id){
                            return '发送消息';
                        }
                    }
                }
                return this.type == '1'?'添加好友':'加入群组';
            }
        },
        destroyed:function(){
        },
        mounted:function() {
            var that = this;
            $('#webim-detail-container').css('min-height',window.HEIGHT);
            $('#searchBtn').click(function(){
                var text = $(this).html();
                switch (text){
                    case '发送消息':
                        Events.notify('route:isReturn',false);
                        if(that.type == '1'){
                            that.$router.push('/webim-chat?type=1&chat_name='+that.title+'&time='+Calendar.getInstance().getTime());

                        }else{
                            that.$router.push('/webim-chat?type=2&chat_name='+that.title+'&roomId='+that.id+'&time='+Calendar.getInstance().getTime());
                        }
                        break;
                    case '添加好友':
                        var dialog = $.ui.alert({
                            content:'<input id="webim-detail-container-msg" placeholder="捎句话儿……" style="border:1px solid #ccc;height:.5rem;background:#fff;height: .8rem;width: 80%;padding:0 .1rem;"/>',
                            buttons:[{
                                name:'提交',
                                callback:function(){
                                    var conn = that.$store.state.webIMConn;
                                    var text = $('#webim-detail-container-msg').val();
                                    conn.subscribe({
                                        to: that.id,
                                        message: text
                                    });
                                    $.ui.toast('发送请求成功！');
                                    dialog.close();
                                }
                            },{
                                name:'取消',
                                closable:true
                            }]
                        });
                        break;
                    case '加入群组':
                        utils.ajax.save('/webim/groups/adduser',{
                            groupId:that.id,
                            userName:that.user_name
                        },function(data){
                            if(!data.success){7
                                $.ui.toast(data.message);
                                return;
                            }
                            webIM.chatManage.getGroups();
                            $.ui.toast(data.message);
                        });
                        break;
                }
            });
            setTimeout(function(){
                $('#webim-detail-container').css('background','transparent');
                $('#main-content').height(window.HEIGHT-$('#head-content').height()-$('#component-navigator').height());
            },300);
        }
    };

</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/webim-detail.scss";
</style>