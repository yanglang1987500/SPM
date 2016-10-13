<template>
    <transition name="fadeOutLeft">
    <div class="router-view">
        <ul class="homepage-menu-list">
            <router-link to="/foo"><li class="menu-list-item fa fa-paw" ><span>学生考勤查询</span></li></router-link>
            <router-link to="/attence-analyse"><li class="menu-list-item fa fa-paw" style="background-color: rgba(153, 99, 61, 0.59)"><span>学生考勤分析</span></li></router-link>
        </ul>
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
        components:{navigator:navigator}
    };
</script>

<style lang="sass" scoped>
    @import "../../stylesheets/vue-styles/homepage.scss";
</style>