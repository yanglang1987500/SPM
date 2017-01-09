<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="webim-container"  :style="'min-height:'+WINHEIGHT+'px'">
        <navigator navigator-title="家校互通" :navigatorRightBtnClass="rightBtnClass" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div class="content-wrap" :style="'transform:translate3d('+(-tabIndex*7.5)+'rem,0,0)'">
            <div class="chat-list-container">
                <ul class="chat-list" >
                    <template v-for="item in chatList" >

                        <router-link @click.native="routerClick" v-if="item.type == 'subscribe'" v-bind:to="'/webim-subscribe-list'">
                            <li :data-id="item.id" :data-name="item.name">
                                <div class="li-wrap">
                                    <div class="head-wrap" :class="[{'unread-msg':getUnreadCount(item)>0,'unread-msg-lg9':getUnreadCount(item)>9}]"  :data-unread-count="getUnreadCount(item)">
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
                                            <h3 :style="'color:'+getColor(item.nickname?item.nickname:item.name)+''">{{item.nickname?item.nickname:item.name}}</h3>
                                        </div>
                                    </div>
                                    <p>{{item.nickname?item.nickname:item.name}}</p>
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
                                    {{item.nickname?item.nickname:item.name}}
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
                                <div class="li-wrap"><i class="group-icon fa fa-users"></i>
                                {{item.name}}
                                </div>
                            </li>
                        </router-link>
                    </template>
                </ul>
            </div>
            <div class="black-list-container">
                <ul class="second-menu-list">
                    <sec-authorize url="element:/h5/webim:createGroup" display="inline">
                        <li class="menu-list-item" @click="show=true"><i class="fa fa-plus-circle"></i><span>创建群组</span></li>
                    </sec-authorize>
                </ul>
            </div>
        </div>
        <ul id="tabbar">
           <li :class="[{actived:(tabIndex==0)}]"><i class="fa fa-commenting"></i><p>聊天</p></li>
           <li :class="[{actived:(tabIndex==1)}]"><i class="fa fa-user"></i><p>好友</p></li>
           <li :class="[{actived:(tabIndex==2)}]"><i class="fa fa-users"></i><p>群组</p></li>
           <li :class="[{actived:(tabIndex==3)}]"><i class="fa fa-cog"></i><p>设置</p></li>
        </ul>
        <popup :show="show" v-on:show="setShow">
            <div class="condition-wrap">
                <div class="condition-form-group">
                    <label>群组名称：</label>
                    <input class="form-control" type="text" id='groupName'  />
                </div>
                <div class="condition-form-group">
                    <label>群组描述：</label>
                    <input class="form-control" type="text" id='groupDesc' />
                </div>
                <div class="condition-form-group" style="height:3rem;">
                    <label>群组成员：</label>
                    <div class="form-control" style="height:3rem;overflow: auto">
                        <ul class="groupRosterList">
                            <template v-for="item in rosterList" >
                                <li><input type="checkbox" :id="'cb_'+item.name" :value="item.name" v-model="checkedNames"><label :for="'cb_'+item.name">{{item.name}}</label></li>
                            </template>
                        </ul>
                    </div>

                </div>
                <div class="condition-form-btn-group">
                    <span class="condition-button" v-on:click="doCreate">确定</span>
                    <span class="condition-button" v-on:click="doCancel">取消</span>
                </div>
            </div>
        </popup>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    var store = require('../utils/store');
    var secAuthorize = require('./sec-authorize.vue');
    require('../../../stylesheets/vue-styles/condition.scss');
    var popup = require('./vue-popup.vue');
    var webIM = require('../utils/webIM');
    require('../../libs/toast/jquery-loading.css');
    require('../../libs/toast/jquery-loading.js');

    //WebIM初始化
    webIM.init();
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
        },
        setShow:function(flag){
            this.show = flag;
        },
        doCreate:function(){
            var groupName = $('#groupName').val(),
                groupDesc = $('#groupDesc').val();

            utils.ajax.save('/webim/groups',{
                name:groupName,
                desc:groupDesc,
                members:this.checkedNames
            },function(data){
                if(!data.success){
                    $.ui.toast(data.message);
                    return;
                }
                $.ui.toast('创建群组成功！');
                webIM.chatManage.getGroups();//更新群组数据
            });

            this.show = false;
        },
        doCancel:function(){
            this.show = false;
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/webim',
        data:function(){
            return {
                show:false,
                WINHEIGHT:window.HEIGHT,
                checkedNames:[]
            };
        },
        methods:methods,
        components:{navigator:navigator,'sec-authorize':secAuthorize,popup:popup},
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
            },
            rightBtnClass:function(){
                return (this.tabIndex == 1 || this.tabIndex == 2)?'fa fa-search':'';
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