
var app;

module.exports = {
    getApp:function(){
        return app;
    },
    setApp:function(_app){
        app = _app;
    },
    isLocal:function (){
        return false;
    }


};