<template>
    <div id="video-main" ref="myVideoDiv">
        <video :id="'myVideo'+arrow.id"
               ref="myVideo"
               style="width: 100%;height:100%"
               class="video-js vjs-default-skin vjs-big-play-centered">
        </video>
    </div>
</template>

<script>
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    import BG from  '../../assets/login/bg.png';

    export default {
        name: 'index-video',
        created: async function () { },
        props: {
            arrow: {
                type: Object,
                default:function () {
                    return {
                        id: 0,
                        src: '',
                        type: ''
                    }
                }
            },
        },
        watch: {
            arrow:function (val) {
                console.log(val)
            },
            videoSrc:function (val) {
                if(val){
                    this.loadVideo();
                    this.setVideoConfig();
                    this.setVideoSrc(this.arrow.src,this.arrow.type);
                }
            }
        },
        components: {
            // videoPlayer
        },
        data() {
            return {
                videoPlayer: undefined,
                videoSrc: ''
            }
        },
        mounted() {
            if(this.arrow){
                this.videoSrc = this.arrow ? this.arrow.src : null;
            }
        },
        // 销毁定时器
        beforeDestroy: function () {
        },
        methods: {
            setVideoConfig() {
                if(!this.arrow){
                    return false;
                }
                this.videoPlayer = videojs('myVideo'+this.arrow.id, {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //自动播放属性,muted:静音播放
                    poster:BG,
                    // autoplay: "muted",
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    //设置视频播放器的显示高度（以像素为单位）
                    controlBar: {
                        durationDisplay: false,
                        //竖直音量控制
                        volumePanel: {
                            inline: false,
                        }
                    },
                    //  设置中文需要导入中文语言包
                    language: 'zh-CN',
                    notSupportedMessage: '此视频暂时无法播放'
                }, function onPlayerReady() {
                    // this.play();
                    this.on('error', function () {
                        console.log("视频出错")
                    });
                    this.on('play', function () {
                        console.log("播放开始");
                        let jsonString2 = {
                            type: 'video_open',
                            data: null
                        };
                        try {this.send(JSON.stringify(jsonString2));} catch {}

                    });
                    this.on('pause', function () {
                        console.log("播放暂停");
                        let jsonString1 = {
                            type: 'video_close',
                            data: null
                        };
                        try {this.send(JSON.stringify(jsonString1));} catch {}
                    });

                    this.on('ended', function () {
                        console.log("播放结束");
                    });
                });
            },
            loadVideo() {
                if(this.arrow){
                    let myVideoDiv = this.$refs.myVideoDiv;
                    let src = 'myVideo'+ this.arrow.id;
                    myVideoDiv.innerHTML = '<video id="'+src+'" style="width: 100%;height:100%" ref="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" ></video>';
                }
            },
            setVideoSrc(src,type) {
                // 关联video标签的id
                this.videoPlayer.src({
                    src: src,
                    type:type,
                });
                this.videoPlayer.play();
            },
            destroyed() {
                console.log('摧毁视频控件');
                this.videoSrc = '';
                this.videoPlayer.dispose()
            },

        }
    }
</script>
<style lang="scss" scoped>

    .video-main {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .video-js {
        width: 100%;
        height: 100%;
    }
</style>
