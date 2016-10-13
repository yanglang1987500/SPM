<template>
    <transition name="fadeInLeft">
    <div class="router-view"  >
        <navigator ></navigator>
        <div>
            <router-link to="/foo"><li class="menu-list-item fa fa-paw" ><span>学生考勤查询</span></li></router-link>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./navigator.vue');

    module.exports = {
        data:function(){
            return {
                greeting:'ni hao'
            }
        },
        components:{navigator:navigator},
        activate:function(){
            console.log('aaa');
        }
    };
</script>

<style lang="sass" scoped>
    .router-view{
    }
</style>