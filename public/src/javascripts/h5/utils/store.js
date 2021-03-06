/**
 * Created by 杨浪 on 2016/12/12.
 */
var Vue = require('vue');
var Vuex = require('vuex');
Vue.use(Vuex);

var __list = localStorage.getItem('WebIMCurChatList_'+UserInfo.username),Arr = [];
__list = __list?JSON.parse(__list):[];
__list.forEach(function(item,i){
    item.record.forEach(function(_item,_i){
        _item.msgStatus == 1 && (_item.msgStatus = 3); //将正在发送的消息状态修改为3 发送失败 用户会重新发送
    });
});
const store = window.store = new Vuex.Store({
    state:{
        webIMConn:null,//连接
        rosterList:[],//好友列表,
        curChatList:__list,//当前聊天列表
        groupList:[],
        blackList:[],
        webIMTabIndex:0,
        roleAuthorityMap:{},
        userRoles:[]
    },
    actions:{
        refreshRosterName:function(context) {
            var names = [];
            for(var i = 0;i<context.state.rosterList.length;i++){
                names.push(context.state.rosterList[i].name);
            }
            if(names.length == 0)
                return;
            utils.ajax.querySync('/webim/userbynames',{
                names:names.join(',')
            },function(data){
                if(!data.success){
                    $.ui.toast(data.message);
                    return;
                }
                context.commit('updateRosterName',data.data);
            });
        }
    },
    mutations:{
        setUsername:function (state,username) {
            console.log('setUserName'+username);
            state.username = username;
        },
        setConn:function(state,conn){
            state.webIMConn = conn;
        },
        setRoster:function(state,rosterList){
            state.rosterList = rosterList;
        },
        updateRosterName:function(state,names){
            if(!names){
                return;
            }
            for(var i = 0;i<names.length;i++){
                for(var j = 0;j<state.rosterList.length;j++){
                    if(state.rosterList[j].name == names[i].user_name){
                        state.rosterList[j].nickname = names[i].nickname;
                        break;
                    }
                }
            }
            for(var i = 0;i<names.length;i++){
                for(var j = 0;j<state.curChatList.length;j++){
                    if(state.curChatList[j].nickname)
                        continue;
                    if(state.curChatList[j].type == 'chat' && state.curChatList[j].name == names[i].user_name){
                        state.curChatList[j].nickname = names[i].nickname;
                        break;
                    }
                }
            }
        },
        setGroup:function(state,groupList){
            state.groupList = groupList;
        },
        setBlack:function(state,blackList){
            state.blackList = blackList;
        },
        addChat:function(state,chat){
            state.curChatList.push(chat);
        },
        /**
         * 新增消息
         * 首先判断是否已有会话，如果已有，直接在当前会话中加入消息，否则创建新会话
         * @param message
         */
        addMessage:function(state,message){
            console.log('addMessage');
            if(message.type === 'chat'){
                StoreUtil.addChatMessage(state,message);
            }else if(message.type === 'groupchat'){
                StoreUtil.addGroupMessage(state,message);
            }else if(message.type === 'subscribe'){
                StoreUtil.addSubcribeMessage(state,message);
            }

            Events.notify('WebIMSaveChatList');
        },
        /**
         * 修改消息状态
         * 参数为2个时只有state,status，代表将所有正在发送的消息置为发送失败
         * @param state
         * @param status
         * @param chatName
         * @param localId
         * @param serverId
         */
        moidfyMessageStatus:function(state,obj){
            if(Object.prototype.toString.call(obj) == '[object String]'){
                var list = state.curChatList;
                list.forEach(function(item,i){
                    if(item){
                        var record = item.record;
                        for(var i = 0;i<record.length;i++){
                            record[i].msgStatus == '1' && (record[i].msgStatus = obj);
                        }
                    }

                });
            }else{
                var list = state.curChatList, curChat = null, index = null;
                list.forEach(function(item,i){
                    if(item){
                        if(item.name == obj.chatName || item.roomId == obj.chatName){
                            curChat = item;
                            index = i;
                        }
                    }

                });
                if(!curChat)
                    return;
                var list = curChat.record;
                for(var i = 0;i<list.length;i++){
                    if(list[i].localId == obj.localId){
                        list[i].msgStatus = obj.status;
                        obj.serverId && (list[i].msgStatus = obj.serverId);
                        break;
                    }
                }
            }
            Events.notify('WebIMSaveChatList');
        },
        setWebIMTabIndex:function(state,index){
            state.webIMTabIndex = index;
        },
        setRoleAuthorityMap:function(state,roleAuthorityMap){
            state.roleAuthorityMap = roleAuthorityMap;
        },
        setUserRoles:function(state,userRoles){
            state.userRoles = userRoles;
        }
    },
});
Events.subscribe('WebIMSaveChatList',function(){
    localStorage.setItem('WebIMCurChatList_'+UserInfo.username,JSON.stringify(store.state.curChatList));
});
var StoreUtil = {
    addChatMessage:function(state,message){
        var list = state.curChatList, curChat = null, index = null;
        list.forEach(function(item,i){
            if(item.name == message.chat_name){
                curChat = item;
                index = i;
            }
        });
        if(curChat){
            curChat.record.push(message);
            list.splice(index,1);
            list.splice(0,0,curChat);
        }else{
            store.commit('addChat',{
                name: message.chat_name,
                id: message.id,
                nickname:message.ext.nickname,
                type:'chat',
                record: [
                    message
                ]
            });
        }
        !message.read && Events.notify('message-notice-info',message.from+'：'+message.data.trim(),function(){
            Events.notify('router-push','/webim-chat?type=1&chat_name='+message.chat_name);
        });
    },
    addGroupMessage:function(state,message,recall){
        var list = state.curChatList, curChat = null ,index = null;
        list.forEach(function(item,i){
            if(item.roomId == message.to){
                curChat = item;
                index = i;
            }
        });
        if(curChat){
            curChat.record.push(message);
            list.splice(index,1);
            list.splice(0,0,curChat);
        }else{
            //获取群组信息
            var groupInfo;
            state.groupList.forEach(function(item,index){
                if(item.roomId == message.to){
                    groupInfo = item;
                }
            });
            if(!groupInfo)//暂时：群组不存在，延时处理，并且只延时一次，第二次直接放弃。
            {
                var callee = arguments.callee, args = arguments, that = this;
                !recall && setTimeout(function(){
                    callee.apply(that,Arr.slice.call(args,0).concat([true]));
                },500);
                return;
            }
            curChat = groupInfo;
            store.commit('addChat',{
                roomId: curChat.roomId,//群组id
                name:curChat.name,
                id: message.id,
                type:'groupchat',
                record: [
                    message
                ]
            });
        }
        !message.read && Events.notify('message-notice-info',message.from+'：'+message.data.trim(),function(){
            Events.notify('router-push','/webim-chat?type=2&chat_name='+curChat.name+'&roomId='+curChat.roomId);
        });
    },
    addSubcribeMessage:function(state,message){
        var list = state.curChatList, subcribeChat = null ,index = null;
        list.forEach(function(item,i){
            if(item.type == 'subscribe'){
                subcribeChat = item;
                index = i;
            }
        });
        !message.accept_type && (message.accept_type = 1);//1 尚未决定 2 已添加 3 已拒绝
        if(subcribeChat){
            for(var i = 0;i<subcribeChat.record.length;i++){
                if(subcribeChat.record[i].fromJid == message.fromJid && subcribeChat.record[i].accept_type !=3)
                    return;
            }
            subcribeChat.record.push(message);
            list.splice(index,1);
            list.splice(0,0,subcribeChat);
        }else{
            store.commit('addChat',{
                name:'好友请求',
                type:'subscribe',
                record: [
                    message
                ]
            });
        }
        !message.read && Events.notify('message-notice-info',message.from+'：'+message.status.trim(),function(){
            Events.notify('router-push','/webim-subscribe-list');
        });
    }
};

module.exports = store;