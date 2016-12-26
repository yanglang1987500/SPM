<template>
    <div  class="popup-wrap">
        <div class="popup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    module.exports = {
        props: {
            show: {
                type: Boolean,
                twoWay: true,
                default:false
            }
        },
        watch: {
            show (val) {
                var that = this;
                if(val){
                    $(this.$el).fadeIn(100);
                    setTimeout(function(){
                        $('.popup',this.$el).addClass('show');
                    },150);
                }else{
                    $('.popup',this.$el).removeClass('show');
                    setTimeout(function(){
                        $(that.$el).fadeOut(100);
                    },150);
                }
            }
        },
        data:function(){
            return {};
        },
        computed:{
            isShow:{
                get:function(){
                    return this.show;
                },
                set:function(val){
                    this.show = val;
                }
            }
        },
        mounted:function(){
            var that = this;
            $(this.$el).on('click',function(){
                that.$emit('show',false);
            });
            $('.popup',this.$el).on('click',function(e){
                return false;
            });
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    .popup-wrap{
        display:none;
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: rgba(1, 25, 35, 0.5);
        z-index:9999;
    }
    .popup{
        position: fixed;
        bottom:0;
        transform:translate3d(0,100%,0);
        transition:.3s all ease;
        width:100%;
        background: #fff;
        box-shadow:0 -0.1rem 0.5rem rgba(0, 0, 0, 0.2);
    }
    .popup.show{
        transform:translate3d(0,0%,0);
    }
</style>