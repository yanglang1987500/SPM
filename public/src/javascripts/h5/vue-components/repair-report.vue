<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="repair-view-container" :style="'height:'+WINHEIGHT+'px'">
        <navigator navigator-title="上报修理" navigator-right-btn="提交" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div class="publish-article-title">
            <div class="title-tips">标题</div>
            <input type="text" id="title" class="w100" placeholder="上报标题">
        </div>
        <div class="publish-article-content">
            <div class="title-tips">正文</div>
            <input type="hidden" id="target">
            <div class="article-content" >
                <textarea id="content" style="width:100%;height: 100%;border:0" placeholder="请输入正文内容"></textarea>
            </div>
            <ul id="imageList"></ul>
            <div class="footer-btn g-image-upload-box">
                <form id="edui-form" class="edui-image-form" method="post" action="/file/upload" enctype="multipart/form-data" target="up">
                    <div class="upload-button">
                        <span class="upload"><i class="upload-img"></i>插入图片</span>
                        <input class="input-file" id="imageUpload" type="file" name="upfile" capture="camera" accept="image/gif,image/jpeg,image/png,image/jpg,image/bmp" style="position:absolute;left:0;opacity:0;width:100%;">
                    </div>
                </form>
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    require('../../libs/artEditor');
    var methods = {
        onNavigatorRightBtnClick:function(){
            var that = this;
            var title = $('#title').val(),content = $('#content').val();
            if($.trim(title) == ''){
                alert('标题不能为空');
                return;
            }
            if($.trim(content) == ''){
                alert('内容不能为空');
                return;
            }
            utils.ajax.save('/report/save',{
                action:'001',
                report_title:$('#title').val(),
                report_content:$('#content').val(),
                photos:function(){
                    var arr = [];
                    $('#imageList img').each(function(){
                        arr.push($(this).attr('src'));
                    });
                    return arr.join(';');
                }()
            },function(data){
                if(!data.success) {
                    alert(data.message);
                    return;
                }else{
                    alert('提交成功');
                    that.$router.back();
                }
            });
        }
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/repair-report',
        data:function(){
            return {WINHEIGHT:window.HEIGHT};
        },
        methods:methods,
        components:{navigator:navigator},
        mounted:function(){
            this.WINHEIGHT = window.HEIGHT;
            $('#content').artEditor({
                imgTar: '#imageUpload',
                limitSize: 5,   // 兆
                showServer: true   ,
                uploadUrl: '/file/upload',
                data: {},
                uploadField: 'upfile',
                placeholader: '<p>请输入文章正文内容</p>',
                validHtml: ["<br/>"],
                formInputId: 'target',
                uploadSuccess: function(res) {
                    return 'file/'+res.url;
                },
                uploadError: function(res) {
                    console.log(res);
                }
            });
            $('#imageList').on('click','.close',function(){
                var $img = $(this).next();
                $.post('/file/remove/',{filename:$img.attr('src')},function(data){
                    $img.parent().remove();
                });
            });
        },

    };
</script>

<style lang="sass" >
    @import "../../../stylesheets/vue-styles/repair-report.scss";
</style>