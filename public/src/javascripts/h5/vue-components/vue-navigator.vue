<template>
    <nav class="navigator">
        <span class="navigator-btn" id="navigatorLeftBtn" v-on:click="doReturn">返回</span>
        <h1>{{navigatorTitle}}</h1>
        <span class="navigator-btn" id="navigatorRightBtn" v-on:click="rBtnClk">{{navigatorRightBtn}}</span>
    </nav>
</template>

<script>
    module.exports = {
        props: {
            navigatorTitle:{type:String,default:'标题'},
            navigatorRightBtn:{type:String,default:''},
            onNavigatorRightBtnClick:{type:Function,default:function(){}}
        },
        data:function(){
            return {};
        },
        methods:{
            doReturn:function(){
                Events.notify('route:isReturn',true);
                this.$router.back();
                setTimeout(function(){
                    Events.notify('route:isReturn',false);
                },100);
            },
            rBtnClk:function(){
                this.onNavigatorRightBtnClick.apply(this,[]);
            }
        }
    };
</script>

<style lang="sass" scoped>
    nav.navigator{
        position: fixed;
        z-index: 999;
        font-size: .35rem;
        line-height: 1rem;
        width:100%;
        padding:0 1rem;
        top:0;
        height:1rem;
        background-color: rgba(255, 255, 255, 0.89);
        box-shadow:0 .03rem .05rem rgba(0,0,0,.2);
        h1{
            text-align: center;
            font-weight: normal;
            font-size:.5rem;
        }
        .navigator-btn{
            position: absolute;
            left:0;
            top:0;
            width:1rem;
            height:1rem;
            text-align:center;
            &#navigatorRightBtn{
                left:auto;
                right:0;
             }
        }
    }
</style>