<template>
    <div class="app-container">
        <el-menu :default-active="activeLocale" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                 style="margin-bottom: 30px; display: flex; flex-direction: row;align-items: center;">
            <el-menu-item :index="item.value" :key="item.id" v-for="item in LOCAL_TYPES">{{$t(item.label)}}
            </el-menu-item>
        </el-menu>


        <div class="head-container">
            <!-- 搜索 -->
            <el-form ref="search" :model="query" :inline="true" size="small" label-width="90px">
                <el-form-item label="code">
                    <el-input v-model="query.code" placeholder="" :clearable="true"
                              style="width: 170px"/>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="query.name" placeholder="" :clearable="true"
                              style="width: 170px"/>
                </el-form-item>
            </el-form>
        </div>

        <div class="head-container">
            <!--<div style="display: inline-block;margin: 0px 2px;">-->
            <!--<el-button-->
            <!--class="filter-item"-->
            <!--size="mini"-->
            <!--type="primary"-->
            <!--icon="el-icon-plus"-->
            <!--@click="add">{{$t("entering")}}-->
            <!--</el-button>-->
            <!--</div>-->
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button
                    class="filter-item"
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="add2">{{$t("entering")}}
                </el-button>
            </div>
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button
                    class="filter-item"
                    size="mini"
                    :disabled="selection.length === 0"
                    type="danger"
                    icon="el-icon-delete"
                    @click="onBatchDel">{{$t("batchDel")}}
                </el-button>
            </div>
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button class="filter-item" size="mini" type="success" icon="el-icon-search"
                           @click="toQuery">
                    {{$t("query")}}
                </el-button>
            </div>
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button class="filter-item" size="mini" type="warning" icon="el-icon-refresh-right"
                           @click="clearQuery">
                    {{$t("reset")}}
                </el-button>
            </div>
        </div>
        <!--工具栏-->
        <eForm ref="form" :is-add="isAdd"/>
        <eForm2 ref="form2" :is-add="isAdd"/>
        <!--表格渲染-->
        <!--<div class="table-border">-->
        <el-table ref="table" :data="data"
                  @selection-change="handleSelectionChange"
                  stripe
                  size="small" style="width: 100%">
            <el-table-column type="selection" width="60"/>
            <el-table-column prop="code" align="left" label="code"/>
            <el-table-column prop="name" align="left" :label="$t('content')"/>
            <el-table-column prop="locale" align="left" :label="$t('type')"/>
            <el-table-column class-name="table-options"
                             label="操作"
                             width="250px" align="center">
                <template slot-scope="scope">
                    <!--<el-button size="mini" type="success"-->
                    <!--icon="el-icon-edit"-->
                    <!--@click="edit(scope.row)">{{$t("edit")}}-->
                    <!--</el-button>-->
                    <el-button size="mini" type="success"
                               icon="el-icon-edit"
                               @click="edit2(scope.row)">{{$t("edit")}}
                    </el-button>
                    <!--<el-button size="mini" type="primary"-->
                    <!--icon="el-icon-connection"-->
                    <!--@click="sync(scope.row)">{{$t("sync_language")}}-->
                    <!--</el-button>-->
                    <el-popover
                        :ref="scope.row.id"
                        placement="top"
                        width="180">
                        <p>{{$t("isDelData")}}</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">{{$t('cancel')}}
                            </el-button>
                            <el-button :loading="delLoading" type="primary" size="mini"
                                       @click="subDelete(scope.row)">确定
                            </el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">{{$t("delete")}}
                        </el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <!--</div>-->

        <el-pagination
            :total="total"
            :current-page="current"
            style="margin-top: 8px;"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="currentChange"/>
    </div>
</template>

<script>
    import initData from '@/mixins/initData'
    import eForm from './form'
    import eForm2 from './form2'
    import LOCAL_TYPES from '@/enum/local.types'
    import {del, batchDel, get} from '@/api/locale'

    export default {
        components: {eForm, eForm2},
        mixins: [initData],
        data() {
            return {
                delLoading: false,
                selection: [],
                departs: [],
                activeLocale: 'zh-CN',
                LOCAL_TYPES: LOCAL_TYPES,
            }
        },
        async created() {
            this.$nextTick(() => {
                this.query.locale = this.activeLocale;
                this.init();
            })
        },
        methods: {
            handleSelect(key) {
                this.activeLocale = key;
                this.query.locale = key;
                this.init();
            },
            handleSelectionChange(val) {
                this.selection = val;
            },
            beforeInit() {
                this.url = '/locale';
                this.params = {current: this.current, size: this.size};
                const query = this.query;
                Object.keys(query).forEach((key) => {
                    if (key && query[key]) {
                        this.params[key] = query[key];
                    }
                });
                this.selection = [];
                return true;
            },
            subDelete(data) {
                get(data.code).then((res) => {
                    let ids = res.data.records.map(({id}) => {
                        return id;
                    });
                    this.delLoading = true;
                    batchDel(ids).then(() => {
                        this.delLoading = false;
                        this.$refs[data.id].doClose();
                        this.dleChangecurrent();
                        this.init();
                        this.$notify({
                            title: '删除成功',
                            type: 'success',
                            duration: 2500
                        })
                    }).catch(err => {
                        this.delLoading = false;
                        this.$refs[data.id].doClose();
                        console.log(err.response.data.message);
                    })

                })
            },
            add() {
                this.isAdd = true;
                this.$refs.form.resetForm();
                this.$refs.form.dialog = true;
            },
            add2() {
                this.isAdd = true;
                this.$refs.form2.resetForm();
                this.$refs.form2.dialog = true;
            },
            sync(data) {
                this.isAdd = true;
                const _this = this.$refs.form;
                _this.form = {
                    code: data.code,
                    name: data.name,
                    locale: data.locale
                };
                _this.dialog = true;
            },
            edit(data) {
                this.isAdd = false;
                const _this = this.$refs.form;
                _this.form = {
                    code: data.code,
                    name: data.name,
                    id: data.id,
                    locale: data.locale
                };
                _this.dialog = true;
            },
            edit2(data) {
                get(data.code).then((res) => {
                    console.log(res)
                    let zh = null;
                    let en = null;
                    let list = res.data.records;
                    list.forEach((item) => {
                        if (item.locale === 'zh-CN') {
                            zh = item;
                        } else {
                            en = item;
                        }
                    });

                    this.isAdd = false;
                    const _this = this.$refs.form2;
                    _this.form = {
                        code: data.code,
                        zh: zh.name,
                        zh_id: zh.id,
                        en: en.name,
                        en_id: en.id
                    };
                    _this.dialog = true;
                })
            },
            onBatchDel() {
                if (this.selection.length) {
                    this.$confirm('是否删除选中信息,?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        batchDel(this.selection.map((item) => {
                            return item.id;
                        })).then(res => {
                            this.init();
                            this.$notify({title: '删除成功', type: 'success', duration: 2500});
                        }).catch(err => {
                            this.delLoading = false;
                            console.media(err.response.data.message);
                        })
                    }).catch(() => { });
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .table-border {
        border: 1px solid #f1f1f1;
        display: inline-block;
        margin: 10px 0;
    }

    .el-image-viewer__close {
        color: #0e0e0e;
    }
</style>
