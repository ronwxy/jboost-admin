<template>
    <div class="app-container">
        <!--form 组件-->
        <eForm ref="form" :is-add="isAdd"/>

        <ePwd ref="pwd"/>
        <!--工具栏-->
        <div class="head-container">
            <!-- 搜索 -->
            <el-form ref="search" :model="query" :inline="true" size="small" label-width="80px">
                <el-form-item label="用户账号">
                    <el-input v-model="query.username" placeholder="输入用户账号" :clearable="true" style="width: 170px"/>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="query.realName" placeholder="输入用户名称" :clearable="true" style="width: 170px"/>
                </el-form-item>
                <el-form-item label="选择部门">
                    <el-select v-model="query.departId" placeholder="选择部门"
                               :clearable="true"
                               style="width: 170px">
                        <el-option v-for="item in departs" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" ">
                    <!-- 新增 -->
                </el-form-item>
            </el-form>
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button class="filter-item" size="mini" type="success" icon="el-icon-search"
                           @click="toQuery">
                    {{$t("query")}}
                </el-button>
            </div>
            <div style="display: inline-block;margin: 0px 2px;">
                <el-button class="filter-item" size="mini" type="warning" icon="el-icon-refresh-right"
                           @click="clearQuery">
                    {{$t('reset')}}
                </el-button>
            </div>
            <el-button
                class="filter-item"
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="add">{{$t('entering')}}
            </el-button>
        </div>
        <!--表格渲染-->
        <el-table v-loading="loading" :data="data" style="width: 100%;">
            <el-table-column prop="username" label="用户账号"/>
            <el-table-column prop="realName" label="用户名称"/>
            <el-table-column prop="userType" label="用户类型" :formatter="formatter.userType"/>
            <el-table-column prop="deptName" label="组织机构"/>
            <el-table-column prop="createTime" label="创建日期"/>
            <el-table-column prop="status" label="状态" :formatter="formatter.status"/>
            <el-table-column class-name="table-options"
                             label="操作"
                             width="250px" align="center">
                <template slot-scope="scope">
                    <el-button
                        class="filter-item"
                        size="mini"
                        type="primary"
                        icon="el-icon-edit"
                        @click="edit(scope.row)">{{$t("edit")}}
                    </el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        icon="el-icon-check"
                        class="filter-item"
                        @click="pwd(scope.row)">密码重置
                    </el-button>
                    <el-popover
                        :ref="scope.row.id"
                        placement="top"
                        width="180">
                        <p>{{$t("isDelData")}}</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">{{$t('cancel')}}</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini"
                                       @click="subDelete(scope.row.id)">确定
                            </el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">{{$t("delete")}}</el-button>
                    </el-popover>
                </template>
            </el-table-column>


        </el-table>
        <!--分页组件-->
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
    import {del, getUserList} from '@/api/user'
    import eForm from './form'
    import ePwd from './pwd'
    import {getDepts} from '@/api/dept'
    import USER_STATUS_TYPES from '@/enum/user.status.types'
    import USER_TYPES from '@/enum/user.types'

    export default {
        components: {eForm,ePwd},
        mixins: [initData],
        data() {
            return {
                delLoading: false, deptName: '', depts: [], deptId: null,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                downloadLoading: false,
                departs: [],
                USER_STATUS_TYPES,
                formatter: {
                    status: function (row, column, cellValue, index) {
                        if (!cellValue) return false;
                        let value = '';
                        USER_STATUS_TYPES.forEach(item => {
                            if (cellValue === item.value) {
                                value = item.label;
                            }
                        });
                        return value;
                    },
                    userType: function (row, column, cellValue, index) {
                        if (!cellValue) return false;
                        let value = '';
                        USER_TYPES.forEach(item => {
                            if (cellValue === item.value) {
                                value = item.label;
                            }
                        });
                        return value;
                    },
                },
            }
        },
        created() {
            console.log(1);
            getDepts().then(res => {
                this.departs = res.data.records;
            });
            this.$nextTick(() => {
                this.init();
            })
        },
        methods: {
            beforeInit() {
                this.url = 'user';
                this.params = {
                    current: this.current,
                    size: this.size,
                    userType:'ADMIN'
                };
                const query = this.query;
                Object.keys(query).forEach((key) => {
                    if (key && query[key]) {
                        this.params[key] = query[key];
                    }
                });
                // if (type && keyword) { this.params[type] = keyword }
                // if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
                return true
            },
            subDelete(id) {
                this.delLoading = true;
                del(id).then(res => {
                    this.delLoading = false;
                    this.$refs[id].doClose();
                    this.dleChangecurrent();
                    this.init();
                    this.$notify({
                        title: '删除成功',
                        type: 'success',
                        duration: 2500
                    })
                }).catch(err => {
                    this.delLoading = false;
                    this.$refs[id].doClose();
                    console.log(err.response.data.message)
                })
            },
            handleNodeClick(data) {
                if (data.pid === 0) {
                    this.deptId = null
                } else {
                    this.deptId = data.id
                }
                this.init()
            },
            add() {
                this.isAdd = true;
                // this.$refs.form.form.enabled = "true";
                this.$refs.form.getDepts();
                this.$refs.form.getRoles();
                // this.$refs.form.getRoleLevel();
                this.$refs.form.dialog = true
            },
            edit(data) {
                this.isAdd = false;
                let form = this.$refs.form;
                this.$refs.form.getDepts();
                this.$refs.form.getRoles();
                form.dialog = true;
                getUserList(data.id).then((item) => {
                    form.form = item.data;
                    form.roleIds = item.data.roles.map((item) => {
                        return item.id;
                    })
                });
            },
            pwd(data) {
                let pwd = this.$refs.pwd;
                console.log(data);
                pwd.dialog = true;
                pwd.form.id = data.id;
                // getUserList(data.id).then((item) => {
                //     pwd.form = item.data;
                // });
            }
        }
    }
</script>

<style scoped>
</style>
