<template>
    <div class="dashboard-container">
    </div>
</template>

<script>
    /**
     * 记录访问，只有页面刷新或者第一次加载才会记录
     */
// count().then(res => {})

    export default {
        name: 'Dashboard',
        components: {},
        computed: {},
        created: function () {},
        watch: {},
        data() {
            return {
            }
        },
    }
</script>


<style lang="scss">
    .el-image-viewer__close {
        color: #FFF;
    }

    body::-webkit-scrollbar {
        width: 5px; /*对垂直流动条有效*/
        height: 5px; /*对水平流动条有效*/
    }

    body::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #2A3245;
        border-radius: 1px;
    }

    body::-webkit-scrollbar-thumb {
        border-radius: 7px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #E8E8E8;
    }

    #app .sidebar-container{
        z-index: 0;
    }
</style>