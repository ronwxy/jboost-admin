<template>
    <div class="opinion">
        <div class="shadow"></div>
        <div class="data-ack">
            <div class="data-Title">
                设定目标点
            </div>
            <div class="content">
                <el-form :inline="true" label-width="100px" class="demo-form-inline">
                    <el-form-item label="迎宾点名称">
                        <el-input v-model="pointName" placeholder="请输入迎宾点名称" style="width: 240px"/>
                    </el-form-item>
                    <el-form-item v-if="placeFlag" label="是否设置为常用迎宾点" label-width="200px">
                        <el-radio v-model="mapPlaceFlag" :label="1">是</el-radio>
                        <el-radio v-model="mapPlaceFlag" :label="0">否</el-radio>
                    </el-form-item>
                </el-form>
            </div>
            <div class="debtn">
                <el-button class="filter-item" size="mini" type="warning"
                           @click="onAck(false)">
                    {{$t('cancel')}}
                </el-button>
                <el-button class="filter-item" size="mini" type="success"
                           @click="onAck(true)">
                    {{$t('confirm')}}
                </el-button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "opinion",
        props: {
            title: {
                type: String,
            },
            type: {
                type: String
            },
            placeFlag:{
                type:Boolean,
                default:true
            }
        },
        data: function () {
            return {
                pointName: "",
                rules: {
                    // name: [this.getRequiredRole('请输入类别名称')],
                },
                radio:0,
                mapPlaceFlag:0
            }
        },
        created(){
            this.name = '';
        },
        methods: {
            onAck: function (ack) {
                if (ack) {
                    this.$emit("ack", {type: this.type, isAck: true, pointName: this.pointName,mapPlaceFlag:this.mapPlaceFlag});
                } else {
                    this.$emit("ack", {type: this.type, isAck: false});
                }
            },

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
            width: 366px;
            /*height: 238px;*/
            color: #9B9B9B;
            background: #FFF;
            border-radius: 0.25rem;
            box-shadow: 0 0 0.1875rem 0.3125rem rgba(153, 153, 153, 0.06);
            font-size: 0;
            .data-Title {
                width: 100%;
                height: 36px;
                line-height: 36px;
                font-weight: bold;
                text-align: left;
                padding-left: 27px;
                color: #333;
                border-bottom: 1px solid #ddd;
                font-size: 0.9375rem;
            }
            .content {
                /*height: 105px;*/
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #ddd;
                padding: 26px 0px 0px;
            }
            .debtn {
                display: flex;
                color: #333;
                cursor: pointer;
                width: 100%;
                height: 48px;
                justify-content: flex-end;
                align-items: center;
                padding-right: 20px;
            }
        }
    }
</style>