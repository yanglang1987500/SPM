<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="webim-chat-container"  :style="'min-height:'+WINHEIGHT+'px'">
        <navigator :navigator-title="chat_name" ></navigator>
        <div class="content-wrap">
            <div class="chat-list">
                <template v-for="item in chatRecordList">
                    <div class="chat-item clearfix" :data-chat-id="item.id">
                        <div :class="{'chat-left':(chat_type=='1'?(item.from==chat_name):(item.from!=user_name)),'is-group':chat_type=='2','chat-item-wrap':true}">
                            <p class="user-name">{{item.from}}</p>
                            <div class="head-wrap" v-if="item.from!=user_name">
                                <router-link @click.native="routerClick" v-bind:to="'/webim-detail?type=1&id='+item.from+'&title='+item.from+'&time='+new Date().getTime()">
                                    <div class="head-circle-name">
                                        <h3 :style="'color:'+getColor(item.from)+''">{{item.from}}</h3>
                                    </div>
                                </router-link>
                            </div>
                            <div class="head-wrap" v-else>
                                <div class="head-circle-name">
                                    <h3 :style="'color:'+getColor(item.from)+''">{{item.from}}</h3>
                                </div>
                            </div>
                            <div class="chat-content-wrap">
                                {{item.data}}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div id="sendBar" class="fixed">
            <input type="text" id="editorBox" />
            <button id="sendBtn" >发送</button>
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
            var num = utils.djb2Code(name);
            num = /^.*(\d)$/.test(num) && RegExp.$1;;
            return utils.colors[parseInt(num)];
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/webim-chat',
        data:function(){
            var chat_name = this.$route.query.chat_name;
            var chat_type = this.$route.query.type;
            var roomId = this.$route.query.roomId;
            return {
                WINHEIGHT:window.HEIGHT,
                chat_name:chat_name,
                chat_type:chat_type,
                room_id:roomId
            };
        },
        methods:methods,
        components:{navigator:navigator},
        computed:{
            chatRecordList:function(){
                var that = this;
                var chat = this.$store.state.curChatList.filter(function(element, index, array){
                    return element.name == that.chat_name;
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
            $('#editorBox').bind('focus',function(){
                setTimeout(function(){
                    $("body").scrollTop(5000);
                },30);
            }).keyup(function(e){
                if(e.keyCode == 13){
                    $('#sendBtn').click();
                }
            });

            $('#sendBtn').click(function(){
                var msg = $('#editorBox').val();
                $('#editorBox').val('');
                if(that.chat_type == '1'){
                    webIM.sendPrivateText(msg,that.chat_name,function(id,serverId){
                        store.commit('addMessage',{
                            read:true,
                            "id":serverId,
                            timestamp:Calendar.getInstance().format('yyyy-MM-dd HH:mm:ss'),
                            "type":"chat",
                            chat_name:that.chat_name,
                            "from":store.state.username,
                            "to":that.chat_name,
                            "data":msg,
                            "ext":{},
                            "error":false,
                            "errorText":"",
                            "errorCode":""
                        });
                        $("body").scrollTop(5000);
                    });
                }else{
                    webIM.sendGroupText(msg,that.room_id,function(id,serverId){
                        store.commit('addMessage',{
                            read:true,
                            "id":serverId,
                            timestamp:Calendar.getInstance().format('yyyy-MM-dd HH:mm:ss'),
                            "type":"groupchat",
                            chat_name:that.chat_name,
                            "from":store.state.username,
                            "to":that.room_id,
                            "data":msg,
                            "ext":{},
                            "error":false,
                            "errorText":"",
                            "errorCode":""
                        });
                        $("body").scrollTop(5000);
                    });
                }

            });
            setTimeout(function(){
                $("body").scrollTop(5000);
            },500);
        }
    };

</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/webim-chat.scss";
</style>