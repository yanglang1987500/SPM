<template>
    <nav class="navigator">
        <span class="navigator-btn" id="navigatorLeftBtn" v-on:click="doReturn">返回</span>
        <h1>{{title}}</h1>
        <span id="navigatorRightBtn"></span>
    </nav>
</template>

<script>
    module.exports = {
        data:function(){
            return {
                title:'ni hao'
            }
        },
        methods:{
            doReturn:function(){
                history.go(-1);
            }
        }
    };
</script>

<style lang="sass" scoped>
    nav.navigator{
        position: fixed;
        font-size: .35rem;
        line-height: 1rem;
        width:100%;
        padding:0 1rem;
        top:0;
        height:1rem;
        background-color: rgba(255,255,255,.6);
        box-shadow:0 .05rem .1rem rgba(0,0,0,.2);
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