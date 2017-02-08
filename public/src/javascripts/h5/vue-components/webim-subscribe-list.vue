<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="webim-subscribe-list-container"  :style="'min-height:'+WINHEIGHT+'px'">
        <navigator navigator-title="请求列表" ></navigator>
        <div class="content-wrap">
            <div class="subscribe-list">
                <template v-for="item in subscribeList">
                    <div class="chat-item clearfix " :data-chat-id="item.id" >
                        <div class="chat-item-wrap chat-left is-group">
                            <p class="user-name">{{item.from}}</p>
                            <div class="head-wrap" >
                                <div class="head-circle-name">
                                    <h3 :style="'color:'+getColor(item.from)+''">{{item.from}}</h3>
                                </div>
                            </div>
                            <div class="chat-content-wrap">
                                <p>{{item.status}}</p>
                                <div v-if="item.accept_type == 1" class="btn-wrap">
                                    <span v-on:click="doAccept(item)" class="button accept" id="acceptBtn">同意</span>
                                    <span v-on:click="doReject(item)" class="button reject" id="rejectBtn">拒绝</span>
                                </div>
                                <div v-if="item.accept_type == 2" class="btn-wrap">
                                    <span class="status">已同意</span>
                                </div>
                                <div v-if="item.accept_type == 3" class="btn-wrap">
                                    <span class="status">已拒绝</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    var store = require('../utils/store');

    var webIM = require('../utils/webIM/webIM');
    var methods = {
        doAccept:function(item){
            var conn = store.state.webIMConn;
            /*同意添加好友操作的实现方法*/
            conn.subscribed({
                to: item.from,
                message : '[resp:true]'
            });
            conn.subscribe({//需要反向添加对方好友
                to: item.from,
                message : '[resp:true]'
            });
            item.accept_type = 2;
            Events.notify('WebIMSaveChatList');
        },
        doReject:function(item){
            var conn = store.state.webIMConn;
            /*拒绝添加好友的方法处理*/
            conn.unsubscribed({
                to: item.from,
                message : 'rejectAddFriend'
            });
            item.accept_type = 3;
            Events.notify('WebIMSaveChatList');
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/webim-subscribe-list',
        data:function(){
            return {
                WINHEIGHT:window.HEIGHT
            };
        },
        methods:methods,
        components:{navigator:navigator},
        computed:{
            subscribeList:function(){
                var that = this;
                var chat = this.$store.state.curChatList.filter(function(element, index, array){
                    return element.type == 'subscribe';
                });
                var record = chat.length>0?chat[0].record:[];
                record.forEach(function(item,index){
                    item.read = true;
                });
                return record;
            },
            user_name:function(){
                return store.state.username;
            }
        },
        destroyed:function(){
        },
        mounted:function() {
            var that = this;

            Events.notify('WebIMSaveChatList');
            setTimeout(function(){
                $("body").scrollTop(5000);
            },500);
        }
    };

</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/webim-subscribe-list.scss";
</style>