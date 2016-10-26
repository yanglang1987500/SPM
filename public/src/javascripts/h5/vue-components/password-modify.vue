<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="password-modify-container"  :style="'height:'+WINHEIGHT+'px'">
        <navigator navigator-title="修改密码" navigator-right-btn="保存" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div class="panel-body">
            <div class="form-group">
                <input class="form-control" placeholder="请输入旧密码" name="oldpassword" id="oldpassword" type="password" >
            </div>
            <div class="form-group">
                <input class="form-control" placeholder="请输入新密码" name="newpassword" id="newpassword" type="password" value="">
            </div>
            <div class="form-group">
                <input class="form-control" placeholder="请确认密码" name="repassword" id="repassword" type="password" value="">
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
    import navigator from './vue-navigator.vue';
    var utils = require('../utils/utils');


    var methods = {
        onNavigatorRightBtnClick:function(){
            var that = this;
            var dom = $('#password-modify-container');
            var oldPassword = $('#oldpassword',dom).val();
            var newPassword = $('#newpassword',dom).val();
            var rePassword = $('#repassword',dom).val();
            if($.trim(oldPassword) === '' ){
                alert( "请输入原始密码!");
                return;
            }
            if($.trim(newPassword) === '' ){
                alert("请输入新密码!");
                return;
            }
            if($.trim(rePassword) !== $.trim(newPassword) ){
                alert("确认密码与新密码不一致!");
                return;
            }
            utils.ajax.save('/user/passwordmodify',{
                oldPassword:oldPassword,
                newPassword:newPassword
            },function(data){
                if(data.success){
                    alert('修改成功');
                    that.$router.back();
                }else{
                    alert(data.message);
                }
            });
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/password-modify',
        data:function(){
            return {WINHEIGHT:window.HEIGHT};
        },
        methods:methods,
        components:{navigator:navigator},
        mounted:function() {
            this.WINHEIGHT = window.HEIGHT;
        }
    };
</script>

<style lang="sass" scoped>
    #password-modify-container{
        .panel-body{
            padding:.2rem .2rem;
            border:0;
        }
        fieldset{
            border:0;
        }
        .form-group {
            margin-bottom: 15px;
            line-height: 1rem;
            height:1.2rem;
            overflow: hidden;
        }
        .form-control{
            vertical-align: middle;
            line-height: 1rem;
            height:1rem;
            width: 100%;
            padding: 3px 10px;
            font-size: .3rem;
            font-family: MicroSoft Yahei;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #eee;
            border-radius: 4px;
            -webkit-appearance: none;
            -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
            -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
            transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        }
        .form-control:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
            box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
        }
    }

</style>