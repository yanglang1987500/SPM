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
        ChatManage.getRosters();
        ChatManage.getGroups();
        //ChatManage.getBlackList(); 暂时去除黑名单功能
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
        if ( e.type === 'subscribe' ) {
            //若e.status中含有[resp:true],则表示为对方同意好友后反向添加自己为好友的消息，demo中发现此类消息，默认同意操作，完成双方互为好友；如果不含有[resp:true]，则表示为正常的对方请求添加自己为好友的申请消息。
            if(e && e.status === '[resp:true]'){
                var conn = store.state.webIMConn;
                conn.subscribed({
                    to: e.from,
                    message : '[resp:true]'
                });
                ChatManage.getRosters();
               /* e.status = '对方已同意好友请求';
                e.accept_type = 2;
                store.commit('addMessage', e);*/
                return;
            }
            store.commit('addMessage', e);
        }

        //(发送者允许接收者接收他们的出席信息)，即别人同意你加他为好友
        if ( e.type === 'subscribed' ) {

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
            require('../../../libs/webim/webim.config');
            require('../../../libs/webim/strophe-1.2.8.min');
            require('../../../libs/webim/websdk-1.4.8');
            var conn = window.WebIMConn = new WebIM.connection({
                https: WebIM.config.https,
                url: WebIM.config.xmppURL,
                isAutoLogin: WebIM.config.isAutoLogin,
                isMultiLoginSessions: WebIM.config.isMultiLoginSessions
            });

            //注册事件总线
            conn.listen({
                onOpened: function ( message ) {          //连接成功回调
                    // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                    // 手动上线指的是调用conn.setPresence(); 如果conn初始化时已将isAutoLogin设置为true
                    // 则无需调用conn.setPresence();
                    console.log('onOpened',message);
                    Events.notify('webim_event_opened',message);
                },
                onClosed: function ( message ) {
                    console.log('webim_event_closed');
                    console.log(message);
                    Events.notify('webim_event_closed',message);
                    store.commit('moidfyMessageStatus','3');//遇到错误时将所有正在发送的消息置为发送失败状态
                    window.setTimeout(function(){
                        Events.notify('webim_login');
                    },100);
                },         //连接关闭回调
                onTextMessage: function ( message ) {
                    console.log(message);
                    message.timestamp = Calendar.getInstance().format('yyyy-MM-dd HH:mm:ss');
                    Events.notify('webim_event_message_text',message);
                },    //收到文本消息
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
                onOffline: function () {
                    console.log('webim_event_offline');
                    Events.notify('webim_event_offline');
                },                 //本机网络掉线
                onError: function ( message ) {
                    console.log('webim_event_error');
                    console.log(message);
                    Events.notify('webim_event_error',message);
                    store.commit('moidfyMessageStatus','3');//遇到错误时将所有正在发送的消息置为发送失败状态
                    //Events.notify('webim_login');
                },          //失败回调
                onBlacklistUpdate: function (list) {       //黑名单变动
                    Events.notify('webim_event_blacklistupdate',list);
                }
            });
            var token = '';
            //便于断线重连
            Events.subscribe('webim_login',function(){
                if(token){
                    options = {
                        apiUrl: WebIM.config.apiURL,
                        appKey: WebIM.config.appkey,
                        accessToken:token,
                        user: UserInfo.username,
                        pwd: UserInfo.password,
                    };
                }else{
                    options = {
                        apiUrl: WebIM.config.apiURL,
                        user: UserInfo.username,
                        pwd: UserInfo.password,
                        appKey: WebIM.config.appkey,
                        success:function(obj){
                            token = obj.access_token;
                            console.log(token);
                        }
                    };
                }
                conn.open(options);
            }).notify('webim_login');
            store.commit('setConn',conn);//注册conn到vuex store


            Events.subscribe('webim_event_opened',ChatManage.onConnectionOpened);
            Events.subscribe('webim_event_message_text',ChatManage.onMessageReceive);
            Events.subscribe('webim_event_blacklistupdate',ChatManage.updateBlackList);
            Events.subscribe('webim_event_presence',ChatManage.onPresence);
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
        var id = localId || conn.getUniqueId();                 // 生成本地消息id
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
        conn.send(msg.body);
        return id;
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