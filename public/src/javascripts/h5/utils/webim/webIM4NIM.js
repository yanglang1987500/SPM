/**
 * Created by 杨浪 on 2016/12/8.
 */
/**
 * Created by 杨浪 on 2016/12/8.
 */
var Events = require('../../../libs/framework-events');


var store = require('../store');

var ChatManage = {
    onConnectionOpened:function(){
        console.log('onConnectionOpened')
    },
    onMessageReceive:function(message){
        message.chat_name = message.from;
        store.commit('addMessage', message);
    },
    getRosters:function(){
        var conn = store.state.webIMConn;
        //获取好友列表
        conn.getRoster({
            success: function ( roster ) {
                var rosterList = [],names = [];
                for ( var i = 0, l = roster.length; i < l; i++ ) {
                    var ros = roster[i];
                    //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
                    if ( ros.subscription === 'both' || ros.subscription === 'to' ) {
                        rosterList.push(ros);
                        names.push(ros.name);
                    }
                }
                store.commit('setRoster',rosterList);
                store.dispatch('refreshRosterName');

            }
        });
    },
    getGroups:function(){
        var conn = store.state.webIMConn;
        //获取群组列表
        conn.listRooms({
            success: function (rooms) {
                store.commit('setGroup',rooms);
            },
            error: function () {
                console.log('List groups error');
            }
        });
    },
    //获取黑名单列表
    getBlackList : function () {
        var conn = store.state.webIMConn;
        conn.getBlacklist();
    },
    /**
     * 更新黑名单列表
     * @param list
     */
    updateBlackList:function(list){
        var arr = [];
        for(var key in list){
            arr.push(list[key]);
        };
        store.commit('setBlack',arr);
    },
    /**
     * 收到好友请求
     */
    onPresence:function(e){
        console.log(e);
        //（发送者希望订阅接收者的出席信息），即别人申请加你为好友
        if ( e.type === 'applyFriend' ) {
            store.commit('addMessage', e);
        }


        //(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
        if ( e.type === 'passFriendApply' ) {

        }

        //(发送者允许接收者拒绝他们的出席信息)，即别人拒绝你加他为好友
        if ( e.type === 'rejectFriendApply' ) {

        }

        //（发送者取消订阅另一个实体的出席信息）,即删除现有好友
        if ( e.type === 'unsubscribe' ) {

        }

        //（订阅者的请求被拒绝或以前的订阅被取消），即对方单向的删除了好友
        if ( e.type === 'unsubscribed' ) {

        }

        //创建群组成功
        if(e.type === 'joinPublicGroupSuccess'){
            ChatManage.getGroups();
        }
    }
};



module.exports = {
    chatManage:ChatManage,
    init:function(){
        require.ensure([],function(){
            var config = require('../../../libs/webim/webim.config');
            var NIM = window.NIM = require('../../../libs/webim/NIM_Web_NIM_v3.3.0');
            var nim = NIM.getInstance({
                debug: true,
                db:true,
                appKey: '45c6af3c98409b18a84451215d0bdd6e',
                account: 'yanglang1987500',//UserInfo.username,
                token: 'de77211aeedd1319a760ae44d7e21e61',//UserInfo.password,

                onconnect: function ( message ) {          //连接成功回调
                    // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                    // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
                    // 则无需调用conn.setPresence();
                    Events.notify('webim_event_opened',message);
                    nim.getFriends({
                        done: getFriendsDone
                    });
                    function getFriendsDone(error, friends) {
                        console.log('获取好友列表' + (!error?'成功':'失败'), error, friends);
                    }
                },

                onfriends:function (  ) {
                    console.log('onfriends',arguments);
                   /* var rosterList = [],names = [];
                    for ( var i = 0, l = roster.length; i < l; i++ ) {
                        var ros = roster[i];
                        //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
                        if ( ros.subscription === 'both' || ros.subscription === 'to' ) {
                            rosterList.push(ros);
                            names.push(ros.name);
                        }
                    }
                    store.commit('setRoster',rosterList);
                    store.dispatch('refreshRosterName');*/

                },

                onusers:function ( rosterList ) {
                     store.commit('setRoster',rosterList);

                },

                onmyinfo:function(){
                    console.log('onmyinfo',arguments);
                },



                onteams:function(){
                    console.log('onteams',arguments);
                    //store.commit('setGroup',rooms);
                },

                onAddTeamMembers:function(){
                    console.log('onAddTeamMembers',arguments);
                },

                onsessions:function(sessions){
                    console.log('onsessions',arguments);
                    store.commit('mergeSession',sessions);
                },

                onupdatesession:function(session){
                    console.log('onupdatesession',arguments);
                    store.commit('mergeSession',session);
                },

                onClosed: function ( message ) {
                    console.log('webim_event_closed');
                    console.log(message);
                    Events.notify('webim_event_closed',message);
                    store.commit('moidfyMessageStatus','3');//遇到错误时将所有正在发送的消息置为发送失败状态
                    Events.notify('webim_login');
                },         //连接关闭回调
                onmsg: function (  ) {
                    console.log('onmsg',arguments);
                    /*console.log(message);
                    message.timestamp = Calendar.getInstance().format('yyyy-MM-dd HH:mm:ss');
                    Events.notify('webim_event_message_text',message);*/
                },    //收到文本消息

                onsysmsg:function ( e ) {
                    console.log('onsysmsg',arguments);
                    Events.notify('webim_sys_msg',e);
                },

                onEmojiMessage: function ( message ) {
                    Events.notify('webim_event_message_emoji',message);
                },   //收到表情消息
                onPictureMessage: function ( message ) {
                    Events.notify('webim_event_message_picture',message);
                }, //收到图片消息
                onCmdMessage: function ( message ) {
                    Events.notify('webim_event_message_cmd',message);
                },     //收到命令消息
                onAudioMessage: function ( message ) {
                    Events.notify('webim_event_message_audio',message);
                },   //收到音频消息
                onLocationMessage: function ( message ) {
                    Events.notify('webim_event_message_location',message);
                },//收到位置消息
                onFileMessage: function ( message ) {
                    Events.notify('webim_event_message_file',message);
                },    //收到文件消息
                onVideoMessage: function ( message ) {
                    Events.notify('webim_event_message_video',message);
                },   //收到视频消息
                onPresence: function ( message ) {
                    Events.notify('webim_event_presence',message);
                },       //收到联系人订阅请求、处理群组、聊天室被踢解散等消息
                onRoster: function ( message ) {
                    Events.notify('webim_event_roster',message);
                },         //处理好友申请
                onInviteMessage: function ( message ) {
                    Events.notify('webim_event_invitemessage',message);
                },  //处理群组邀请
                onOnline: function () {
                    Events.notify('webim_event_online');
                },                  //本机网络连接成功
                ondisconnect: function () {
                    console.log('webim_event_offline');
                    Events.notify('webim_event_offline');
                },                 //本机网络掉线
                onerror: function ( message ) {
                    console.log('webim_event_error');
                    console.log(message);
                    Events.notify('webim_event_error',message);
                    store.commit('moidfyMessageStatus','3');//遇到错误时将所有正在发送的消息置为发送失败状态
                    Events.notify('webim_login');
                },          //失败回调
                onBlacklistUpdate: function (list) {       //黑名单变动
                    Events.notify('webim_event_blacklistupdate',list);
                }
            });

            store.commit('setConn',nim);//注册conn到vuex store


            Events.subscribe('webim_event_opened',ChatManage.onConnectionOpened);
            Events.subscribe('webim_event_message_text',ChatManage.onMessageReceive);
            Events.subscribe('webim_event_blacklistupdate',ChatManage.updateBlackList);
            Events.subscribe('webim_sys_msg',ChatManage.onPresence);
        });
        store.commit('setUsername',UserInfo.username);//设置用户名到store



    },
    /**
     * 单发消息
     * @param text
     * @param to
     * @param callback
     * @param localId optional 可选参数 重发时使用
     * @return id messageId
     */
    sendPrivateText : function (text,to,ext,callback,localId) {
        var conn = store.state.webIMConn;
        /*  var id = localId || conn.getUniqueId();                 // 生成本地消息id
        var msg = new WebIM.message('txt', id);      // 创建文本消息
        msg.set({
            msg: text,                  // 消息内容
            to: to,                          // 接收消息对象（用户id）
            ext:ext,
            roomType: false,
            success: function (id, serverMsgId) {
                callback && callback(id, serverMsgId);
            },
            fail:function(err){
                alert(JSON.stringify(err));
                callback && callback();
            }
        });
        msg.body.chatType = 'singleChat';
        conn.send(msg.body);*/

        var msg = conn.sendText({
            scene: 'p2p',
            to: to,
            text: text,
            fromNick:UserInfo.nickname,
            from:UserInfo.username,
            done:  function (error, msg) {
                callback && callback(msg.idClient, msg.id);
            }
        });

        return msg.idClient;
    },
    /**
     * 群组发送文本消息
     */
    sendGroupText : function (text,to,ext,callback) {
        var conn = store.state.webIMConn;
        var id = conn.getUniqueId();            // 生成本地消息id
        var msg = new WebIM.message('txt', id); // 创建文本消息
        var option = {
            msg: text,             // 消息内容
            to: to,                     // 接收消息对象(群组id)
            ext:ext,
            roomType: false,
            chatType: 'chatRoom',
            success: function (id, serverMsgId) {
                callback && callback(id, serverMsgId);
            },
            fail: function () {
                alert(JSON.stringify(err));
                callback && callback();
            }
        };
        msg.set(option);
        msg.setGroup('groupchat');
        conn.send(msg.body);
        return id;
    },
    /**
     * 创建群组
     */
    createGroup : function (groupName,description,members) {
        var conn = store.state.webIMConn;
        var option = {
            subject: groupName,                       // 群名称
            description: description,         // 群简介
            members: members,               // 以数组的形式存储需要加群的好友ID
            optionsPublic: true,                        // 允许任何人加入
            optionsModerate: false,                     // 加入需审批
            optionsMembersOnly: false,                  // 不允许任何人主动加入
            optionsAllowInvites: false                  // 允许群人员邀请
        };
        conn.createGroup(option);
    }
};