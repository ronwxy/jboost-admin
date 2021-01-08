<template>
    <div class="clock">
        <ol>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ol>
        <div id="div-hour" class="hour" ref="hour" :style="{transform : hourTrans}"></div>
        <div id="div-minute" class="minute" ref="minute" :style="{transform : minuteTrans}"></div>
        <div id="div-second" class="second" ref="second" :style="{transform : secondTrans}"></div>
    </div>
</template>

<script>
    export default {
        name: "clock",
        data() {
            return {
                hourTrans: "",
                minuteTrans: "",
                secondTrans: '',
            }
        },
        created() {
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
            let start = () => {
                // 当前时间
                let now = new Date(),
                    // 午夜12点整
                    midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
                    // 当前时间与午夜12的之间的毫秒差
                    ms = now.getTime() - midnight.getTime(),
                    // 计算时、分、秒
                    hh = ms / (1000 * 60 * 60),
                    mm = hh * 60,
                    ss = mm * 60;
                // 实现时钟旋转
                this.hourTrans = "rotate(" + (hh * 30 + (hh / 2)) + "deg)";
                this.minuteTrans = "rotate(" + (mm * 6) + "deg)";
                this.secondTrans = "rotate(" + (ss * 6) + "deg)";
                this.$emit('date', {
                    time1: (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()),
                    time2: now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '-' + now.getDate()
                })
                window.requestAnimationFrame(start);
            };
            window.requestAnimationFrame(start);
        }
    }
</script>

<style scoped>
    .clock {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #f1f1f1;
        /*background:linear-gradient(180deg,#3b6cdd,#101b68);*/
        background: linear-gradient(0deg, rgba(11, 19, 93, 1), rgba(61, 115, 231, 1));
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border: 1px solid rgba(15, 122, 238, 1);
    }

    .clock ol {
        list-style-type: none;
        width: 100%;
        height: 100%;
        position: relative;
        margin: 0;
        padding: 0
    }

    .clock ol li {
        counter-increment: labelCounter;
        position: absolute;
        font-size: 12px;
        color: #FFF;
    }

    .clock ol li:before {
        font-family: Helvetica;
        content: counter(labelCounter) ""
    }

    .clock ol li:nth-child(1) {
        right: 27px;
        top: 8px;
    }

    .clock ol li:nth-child(2) {
        right: 10px;
        top: 24px;
    }

    .clock ol li:nth-child(3) {
        right: 3px;
        top: 45px;
    }

    .clock ol li:nth-child(4) {
        right: 11px;
        top: 63px;
    }

    .clock ol li:nth-child(5) {
        right: 27px;
        top: 77px;
    }

    .clock ol li:nth-child(6) {
        right: 46px;
        top: 81px;
    }

    .clock ol li:nth-child(7) {
        right: 62px;
        top: 77px;
    }

    .clock ol li:nth-child(8) {
        right: 78px;
        top: 64px;
    }

    .clock ol li:nth-child(9) {
        right: 87px;
        top: 45px;
    }

    .clock ol li:nth-child(10) {
        right: 74px;
        top: 24px;
    }

    .clock ol li:nth-child(11) {
        right: 62px;
        top: 8px;
    }

    .clock ol li:nth-child(12) {
        right: 44px;
        top: 3px;
    }

    .hour {
        height: 7px;
        width: 7px;
        border-radius: 50%;
        background: #303030;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -3.5px;
        margin-left: -3.5px;

    }

    .hour:after, .hour:before {
        content: "";
        display: block;
        position: absolute
    }

    .hour:before {
        width: 3px;
        height: 20px;
        border-radius: 4px;
        background: #01EBE4;
        position: absolute;
        bottom: 2px;
        left: 46%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-34%, 0);
    }

    .minute {
        width: 0;
        height: 0;
        border-radius: 50%;
        background: #303030;
        position: absolute;
        top: 50%;
        left: 50%;
    }

    .minute:after, .minute:before {
        content: "";
        display: block;
        position: absolute
    }

    .minute:before {
        width: 3px;
        height: 34px;
        border-radius: 4px;
        background: #01EBE4;
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translate(-50%, 0)
    }

    .second {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #ff8000;
        border: 2px solid #ff8000;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.5px;
        margin-left: -1.5px;
    }

    .second:after, .second:before {
        content: "";
        display: block;
        position: absolute
    }

    .second:before {
        width: 2px;
        height: 46px;
        border-radius: 4px;
        background: #ff8000;
        position: absolute;
        bottom: -12px;
        left: 50%;
        transform: translate(-50%, 0)
    }
</style>