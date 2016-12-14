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
                        <div class="chat-item-wrap" :class="{'chat-left':(item.from==chat_name)}">
                            <div class="head-wrap" >
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
    require('../../libs/scrollTo');

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
            return {
                WINHEIGHT:window.HEIGHT,
                chat_name:chat_name
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
            }
        },
        destroyed:function(){
        },
        mounted:function() {
            var that = this;
            $('#editorBox').bind('focus',function(){
                setTimeout(function(){
                    $("body").scrollTo($('#webim-chat-container').height(),0);
                },30);
            }).keyup(function(e){
                if(e.keyCode == 13){
                    $('#sendBtn').click();
                }
            });

            $('#sendBtn').click(function(){
                var msg = $('#editorBox').val();
                $('#editorBox').val('');
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
                    $("body").scrollTo($('#webim-chat-container').height(),0);
                });
            });
        }
    };

</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/webim-chat.scss";
</style>