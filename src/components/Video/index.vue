<template>
    <div id="video-main">
        <!--<video id="myVideo" ref="myVideo" controls width="100%"-->
        <!--preload="auto"  height="100%" class="video-js vjs-default-skin vjs-big-play-centered"-->
               <!--poster="../../assets/login/bg.png">-->
            <!--<source src="rtmp://192.168.40.112/live/000" type='rtmp/flv'/>-->
            <!--&lt;!&ndash;<source&ndash;&gt;-->
                <!--&lt;!&ndash;src="http://xxxx.oss-cn-hangzhou.aliyuncs.com/media/3542ffef5b864e1cae82d6a8e3de6049.mp4"&ndash;&gt;-->
                <!--&lt;!&ndash;type="video/mp4">&ndash;&gt;-->
        <!--</video>-->
        <videoPlayer ref="videoPlayer"
                      :options="videoOptions"
                      class="vjs-custom-skin videoPlayer"
                      :playsinline="true">

        </videoPlayer>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'

    export default {
        name:'index-video',
        created: async function () { },
        watch: {},
        components: {
        },
        data() {
            return {
                videoOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    techOrder: ['flash', 'html5'],      // 兼容顺序
                    flash: {
                        hls: { withCredentials: false },
                        swf: '../../assets/video-js.swf' // 引入静态文件swf
                    },
                    html5: { hls: { withCredentials: false } },
                    sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
                        type: 'rtmp/hls',
                        // src: 'rtmp://192.168.245.37:1935/mylive/test2',
                        // src: 'rtmp://192.168.40.112/live/000'
                        src:'rtmp://58.200.131.2:1935/livetv/hunantv',
                        // src:'rtmp://live.hkstv.hk.lxdns.com/live/hks1'
                    }],
                    poster: "../../assets/login/bg.png", //你的封面地址
                    // width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            }
        },
        mounted() {
            // rtmp://58.200.131.2:1935/livetv/hunantv
        },
        // 销毁定时器
        beforeDestroy: function () {
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .video-main{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .video-js{
        width: 100%;
        height: 100%;
    }
</style>
