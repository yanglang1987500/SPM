<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="webim-container"  :style="'min-height:'+WINHEIGHT+'px'">
        <navigator navigator-title="家校互通" :navigatorRightBtnClass="tabIndex == 1?'fa fa-search':((tabIndex)==2?'fa fa-search':'')" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div class="content-wrap" :style="'transform:translate3d('+(-tabIndex*7.5)+'rem,0,0)'">
            <div class="chat-list-container">
                <ul class="chat-list" >
                    <template v-for="item in chatList" >

                        <router-link @click.native="routerClick" v-if="item.type == 'subscribe'" v-bind:to="'/webim-subscribe-list'">
                            <li :data-id="item.id" :data-name="item.name">
                                <div class="li-wrap">
                                    <div :class="['head-wrap',{'unread-msg':getUnreadCount(item)>0,'unread-msg-lg9':getUnreadCount(item)>9}]"  :data-unread-count="getUnreadCount(item)">
                                        <div class="head-circle-name">
                                            <h3 :style="'color:'+getColor(item.name)+''">{{item.name}}</h3>
                                        </div>
                                    </div>
                                    <p>{{item.name}}</p>
                                    <i>{{item.record[item.record.length-1].from+'：'+item.record[item.record.length-1].status}}</i>
                                    <span>{{item.record[item.record.length-1].timestamp}}</span>
                                </div>
                            </li>
                        </router-link>
                        <router-link @click.native="routerClick" v-else v-bind:to="'/webim-chat?type='+(item.type==='chat'?1:2)+'&chat_name='+item.name+'&roomId='+item.roomId">
                            <li :data-id="item.id" :data-name="item.name">
                                <div class="li-wrap">
                                    <div :class="['head-wrap',{'unread-msg':getUnreadCount(item)>0,'unread-msg-lg9':getUnreadCount(item)>9}]"  :data-unread-count="getUnreadCount(item)">
                                        <div class="head-circle-name">
                                            <h3 :style="'color:'+getColor(item.name)+''">{{item.name}}</h3>
                                        </div>
                                    </div>
                                    <p>{{item.name}}</p>
                                    <i>{{item.record[item.record.length-1].data}}</i>
                                    <span>{{item.record[item.record.length-1].timestamp}}</span>
                                </div>
                            </li>
                        </router-link>
                    </template>
                </ul>
            </div>
            <div class="roster-list-container">
                <ul class="roster-list">
                    <template v-for="item in rosterList" >
                        <router-link @click.native="routerClick" v-bind:to="'/webim-chat?type=1&chat_name='+item.name">
                            <li :data-id="getIdFromJid(item.jid)">
                                <div class="li-wrap">
                                    <div class="head-circle-name"><h3 :style="'color:'+getColor(item.name)+''">{{item.name}}</h3></div>
                                    {{item.name}}
                                </div>
                            </li>
                        </router-link>
                    </template>
                </ul>
            </div>
            <div class="group-list-container">
                <ul class="group-list">
                    <template v-for="item in groupList" >
                        <router-link @click.native="routerClick" v-bind:to="'/webim-chat?type=2&chat_name='+item.name+'&roomId='+item.roomId">
                            <li :data-id="item.roomId">
                                <div class="li-wrap">
                                {{item.name}}
                                </div>
                            </li>
                        </router-link>
                    </template>
                </ul>
            </div>
            <div class="black-list-container">
                <ul class="black-list">
                    <li v-for="item in blackList">
                        <div class="li-wrap">
                            <div class="head-circle-name"><h3 :style="'color:'+getColor(item.name)+''">{{item.name}}</h3></div>
                            {{item.name}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <ul id="tabbar">
           <li :class="[{actived:(tabIndex==0)}]"><i class="fa fa-commenting"></i><p>聊天</p></li>
           <li :class="[{actived:(tabIndex==1)}]"><i class="fa fa-user"></i><p>所有</p></li>
           <li :class="[{actived:(tabIndex==2)}]"><i class="fa fa-users"></i><p>群组</p></li>
           <li :class="[{actived:(tabIndex==3)}]"><i class="fa fa-user-times"></i><p>黑名单</p></li>
        </ul>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    var store = require('../utils/store');


    var THEME_KEY = '_H5_THEME_KEY_';
    var methods = {
        getColor:function(name){
            var num = utils.djb2Code(name);
            num = /^.*(\d)$/.test(num) && RegExp.$1;;
            return utils.colors[parseInt(num)];
        },
        getIdFromJid:function(jid){
            var id = /^(\d*)#.*$/.test(jid) && RegExp.$1;
            return id;
        },
        getUnreadCount:function(item){
            var count = 0;
            item.record.forEach(function(record,index){
                if(!record.read){
                    count++;
                }
            });
            return count;
        },
        onNavigatorRightBtnClick:function(){
            var $li = $('#tabbar li.actived'),index = $li.index();
            if(index == 0 || index == 3)
                return;

            Events.notify('route:isReturn',false);
            this.$router.push('/webim-search?type='+index);
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/webim',
        data:function(){
            return {
                WINHEIGHT:window.HEIGHT
            };
        },
        methods:methods,
        components:{navigator:navigator},
        computed:{
            rosterList:function(){
                return this.$store.state.rosterList;
            },
            chatList:function(){
                return this.$store.state.curChatList;
            },
            groupList:function(){
                return this.$store.state.groupList;
            },
            blackList:function(){
                return this.$store.state.blackList;
            },
            tabIndex:function(){
                return this.$store.state.webIMTabIndex;
            }
        },
        destroyed:function(){
        },
        mounted:function() {
            var that = this ;
            this.WINHEIGHT = window.HEIGHT;
            $('#tabbar').on('click','li',function(){
                var $this = $(this),index = $this.index();
                selectTab(that,index);
            });
        }
    };

    function selectTab(context,index){
        context.$store.commit('setWebIMTabIndex',index);
    }

</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/webim.scss";
</style>