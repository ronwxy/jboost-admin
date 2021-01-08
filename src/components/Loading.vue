<template>
    <div class="loading">
        <div class="shadow"></div>
        <div class='sk-circle-bounce'>
            <div class='sk-child sk-circle-1'></div>
            <div class='sk-child sk-circle-2'></div>
            <div class='sk-child sk-circle-3'></div>
            <div class='sk-child sk-circle-4'></div>
            <div class='sk-child sk-circle-5'></div>
            <div class='sk-child sk-circle-6'></div>
            <div class='sk-child sk-circle-7'></div>
            <div class='sk-child sk-circle-8'></div>
            <div class='sk-child sk-circle-9'></div>
            <div class='sk-child sk-circle-10'></div>
            <div class='sk-child sk-circle-11'></div>
            <div class='sk-child sk-circle-12'></div>
        </div>
        <div class="loading-text">
            点验证进行中
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        name: 'Loading',
        props: {
            show: false
        },
        data: function () { return {}; },
        methods: {}
    }
</script>

<style lang="less" scoped>
    @import "./../assets/loading.css";

    .loading{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        .shadow{
            width: 100%;
            height: 100%;
            display: inline-block;
            position: absolute;
            background: #000;
            opacity: 0.5;
            top: 0;
        }
        .loading-text{
            text-align: center;
            position: absolute;
            z-index: 12;
            color: #fff;
            top: 60%;
            width: 100%;
            font-size: 16px;
            font-weight: bold;
            font-family: 仿宋;
        }
    }
</style>