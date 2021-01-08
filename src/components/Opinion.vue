<template>
    <div class="opinion">
        <div class="shadow"></div>
        <div class="data-ack">
            <div class="data-Title">
                <div class="content">
                    {{title}}
                </div>
            </div>
            <div class="debtn" @click="onAck(false)" style="border-right: 0.0625rem solid #ddd;">
                {{$t('cancel')}}
            </div>
            <div class="debtn" @click="onAck(true)">
                {{$t('confirm')}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "opinion",
        props: {
            title: {
                type:String,
            },
            type:{
                type:String
            }
        },
        methods:{
            onAck:function (ack) {

                if(ack){
                    this.$emit("ack",{type:this.type,isAck:true});
                }else{
                    this.$emit("ack",{type:this.type,isAck:false});
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    .opinion {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        .shadow {
            width: 100%;
            height: 100%;
            display: inline-block;
            position: absolute;
            background: #000;
            opacity: 0.5;
            top: 0;
        }
        .data-ack {
            position: absolute;
            transform: translate(-50%, -50%);
            left: 50%;
            top: 50%;
            width: 15.625rem;
            height: 9.09rem;
            color: #9B9B9B;
            background: #FFF;
            border-radius: 0.25rem;
            box-shadow: 0rem 0rem 0.1875rem 0.3125rem rgba(153, 153, 153, 0.06);
            font-size: 0;
            .data-Title {
                width: 100%;
                height: 6rem;
                line-height: 6rem;
                font-weight: bold;
                text-align: center;
                color: #333;
                border-bottom: 0.0625rem solid #dddddd;
                font-size: 0.9375rem;
            }
            .debtn {
                display: inline-block;
                width: calc(50% - 0.125rem);
                color: #333;
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                cursor: pointer;
                font-size: 0.9375rem;
            }
        }
    }
</style>