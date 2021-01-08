<template>
    <el-dialog :visible.sync="dialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :title="isAdd ? '新增菜单' : '编辑菜单'"
               append-to-body
               width="600px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="200px">
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="form.name" placeholder="名称" style="width: 240px;"/>
            </el-form-item>
            <el-form-item label="菜单排序" prop="rank">
                <el-input-number v-model.number="form.rank" :min="0" :max="999" controls-position="right"
                                 style="width: 240px;"/>
            </el-form-item>
            <el-form-item label="上级类目">
                <treeselect v-model="form.parentId" :options="menus" style="width: 240px;" placeholder="选择上级类目"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">{{$t('cancel')}}</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">{{$t('confirm')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {add, edit, getDepts} from '@/api/dept'
    import Treeselect from '@riophae/vue-treeselect'
    import IconSelect from '@/components/IconSelect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        components: {Treeselect, IconSelect},
        props: {
            isAdd: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                loading: false, dialog: false, menus: [],
                form: {
                    name: '',
                    rank: 999,
                    parentId: 0,
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            cancel() {
                this.resetForm()
            },
            doSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.isAdd) {
                            this.doAdd()
                        } else this.doEdit()
                    } else {
                        return false
                    }
                })
            },
            doAdd() {
                add(this.form).then(res => {
                    this.resetForm()
                    this.$notify({
                        title: '添加成功',
                        type: 'success',
                        duration: 2500
                    })
                    this.loading = false
                    this.$parent.init()
                }).catch(err => {
                    this.loading = false
                    console.log(err.response.data.message)
                })
            },
            doEdit() {
                edit(this.form).then(res => {
                    this.resetForm()
                    this.$notify({
                        title: '修改成功',
                        type: 'success',
                        duration: 2500
                    })
                    this.loading = false
                    this.$parent.init()
                }).catch(err => {
                    this.loading = false
                    console.log(err.response.data.message)
                })
            },
            resetForm() {
                this.dialog = false;
                try {
                    this.$refs.form.resetFields();
                } catch (e) {}
                this.form = {
                    name: '',
                    rank: '',
                    parentId: 0,
                };
            },
            selected(name) {
                this.form.icon = name
            },
            getMenus() {
                getDepts( {current: 1, size: 999}).then(res => {
                    this.menus = [];
                    const menu = {id: 0, label: '顶级类目', children: []};
                    menu.children = res.data.records.map(item => {
                        return {id: item.id, label: item.name};
                    });
                    this.menus.push(menu)
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    /deep/ .el-input-number .el-input__inner {
        text-align: left;
    }
</style>
