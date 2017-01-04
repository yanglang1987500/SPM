<template>
    <div data-type="sec-authorize"  v-if="isPermission" >
        <slot></slot>
    </div>
</template>

<script>
    var utils = require('../utils/utils');

    module.exports = {
        props: {
            url: {
                type: String,
                default:''
            },
            display: {
                type: String,
                default:'block'
            }
        },
        data:function(){
            return {};
        },
        computed:{
            isPermission:function(){
                return utils.isPermission(this.url);
            }
        },
        mounted:function(){

        }
    };
</script>
