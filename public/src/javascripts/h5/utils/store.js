/**
 * Created by 杨浪 on 2016/12/12.
 */
var Vue = require('vue');
var Vuex = require('vuex');
Vue.use(Vuex);

const store = window.store = new Vuex.Store({
    state:{
        webIMConn:null,//连接
        rosterList:[],//好友列表,
        curChatList:[],//当前聊天列表
        groupList:[],
        blackList:[]
    },
    mutations:{
        setUsername:function (state,username) {
            state.username = username;
        },
        setConn:function(state,conn){
            state.webIMConn = conn;
        },
        setRoster:function(state,rosterList){
            state.rosterList = rosterList;
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
            var list = state.curChatList, curChat = null;
            list.forEach(function(item,index){
                if(item.name == message.chat_name){
                    curChat = item;
                }
            });
            if(curChat){
                curChat.record.push(message);
            }else{
                store.commit('addChat',{
                    name: message.chat_name,
                    id: message.id,
                    type:message.type,
                    record: [
                        message
                    ]
                });
            }
        }
    },
});

module.exports = store;