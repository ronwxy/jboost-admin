<template>
    <div class="app-container">
        <!--工具栏-->
        <div class="head-container">
            <el-button
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="add">新增
            </el-button>
        </div>
        <!--表单组件-->
        <eForm ref="form" :is-add="isAdd"/>
        <!--表格渲染-->
        <el-table v-loading="loading" row-key="id" :data="data" :default-expand-all="isExpand"
                  :columns="columns"
                  size="small"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="name" label="部门名称" align="left"/>
            <el-table-column prop="createTime" label="创建时间" align="left"/>
            <el-table-column label="操作"
                             width="250px" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">{{$t("edit")}}</el-button>
                    <el-popover :ref="scope.row.id" placement="top" width="200">
                        <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">{{$t('cancel')}}</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini"
                                       @click="subDelete(scope.row.id)">确定
                            </el-button>
                        </div>
                        <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">{{$t('delete')}}</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import checkPermission from '@/utils/permission' // 权限判断函数
    import treeTable from '@/components/TreeTable'
    import initData from '@/mixins/initData'
    import {parseTime} from '@/utils/index'
    import eForm from './form'

    export default {
        components: {treeTable, eForm},
        mixins: [initData],
        data() {
            return {
                columns: [
                    {
                        text: '名称',
                        value: 'name'
                    }
                ],
                delLoading: false, isExpand: false
            }
        },
        created() {
            this.$nextTick(() => {
                this.init()
            })
        },
        methods: {
            parseTime,
            checkPermission,
            beforeInit() {
                this.url = '/dept';
                const query = this.query;
                const value = query.value;
                this.params = {current: 1, size: 999};
                if (value) { this.params['name'] = value }
                return true
            },
            sort(){
                this.$emit('sort')
            },
            subDelete(id) {
                this.delLoading = true
                del(id).then(res => {
                    this.delLoading = false
                    this.$refs[id].doClose()
                    this.dleChangecurrent();
                    this.init()
                    this.$notify({
                        title: '删除成功',
                        type: 'success',
                        duration: 2500
                    })
                }).catch(err => {
                    this.delLoading = false
                    this.$refs[id].doClose()
                    console.log(err.response.data.message)
                })
            },
            add() {
                this.isAdd = true;
                this.$refs.form.getMenus();
                this.$refs.form.resetForm();
                this.$refs.form.dialog = true
            },
            edit(data) {
                this.isAdd = false;
                const _this = this.$refs.form;
                _this.getMenus();
                _this.form = {
                    id: data.id,
                    component: data.component,
                    name: data.name,
                    rank: data.rank,
                    parentId: data.parentId,
                    path: data.path,
                    icon: data.icon,
                    elementId: data.elementId,
                    type: data.type
                }
                _this.dialog = true
            },
            changExpand() {
                this.init();
                this.isExpand = !this.isExpand;
            },
        }
    }
</script>

<style scoped>
    .head-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
