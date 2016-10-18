<template lang="html">
  <div class="page-bar">
    <ul>
    <li><a v-bind:class="{'disable':(isFirst)}" v-on:click="prevPage">上一页</a></li>
    <li><a v-bind:class="{'disable':(isLast)}" v-on:click="nextPage">下一页</a></li>
    <li>第{{cur}}页</li>
    <li>共{{all}}页</li>
    </ul>
  </div>
</template>

<script>
module.exports = {
    props: {
        cur:{type:Number,default:'1'},
        all:{type:Number,default:'1'},
        onPaginationCallback:{type:Function,default:function(){}}
    },
    data:function(){
      return {
      }
    },
    computed:{
        isFirst:function(){
            return this.cur == 1;
         },
        isLast:function(){
            return this.cur == this.all;
        }
    },
    methods: {
        prevPage:function(){
            if(this.cur == 1)
                return;
            this.onPaginationCallback(this.cur-1);
        },
        nextPage:function(){
            if(this.cur == this.all)
                return;
            this.onPaginationCallback(this.cur+1);
        }
    }
}
</script>

<style lang="css">
ul,li{
    margin: 0px;
    padding: 0px;
}
.page-bar{
    text-align: center;
}
.page-bar li{
    vertical-align: middle;
    list-style: none;
    display: inline-block;
    font-size: .2rem;
}
.page-bar li:first-child>a {
   margin-left: 0px
}
.page-bar a{
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: .1rem .15rem;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer;
    font-size: .3rem;
}
.page-bar a:hover{
    background-color: #43a1f1;
    color:#fff;
}
.page-bar a.disable{
    background-color: #d6d6d6;
}
.page-bar .active a{
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
}
.page-bar i{
    font-style:normal;
    color: #d44950;
    margin: 0px .06rem;
}
</style>
