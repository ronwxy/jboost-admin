<template>
    <el-dialog :append-to-body="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="dialog"
               :title="$t(isAdd ? 'entering' : 'edit')" width="700px">
        <div class="config">
            <el-form ref="form" :model="form" :rules="rules" label-width="200px">
                <el-form-item label="code" prop="code">
                    <el-input v-model="form.code" placeholder="请输入国际化Code" :clearable="true"
                              style="width: 240px"/>
                </el-form-item>
                <el-form-item label="内容" prop="name">
                    <el-input v-model="form.name" placeholder="请输入国际化语音内容" :clearable="true" style="width: 240px"/>
                </el-form-item>
                <el-form-item label="类型" prop="locale">
                    <el-select v-model="form.locale" filterable placeholder="选择国际化语音类型"
                               :clearable="true"
                               style="width: 240px">
                        <el-option v-for="item in LOCAL_TYPES" :key="item.id" :label="item.value"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">{{$t('cancel')}}</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">{{$t('confirm')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import initDict from '@/mixins/initDict'
    import formRoles from '@/mixins/form.roles.mixins'
    import {add, edit} from '@/api/locale'
    import LOCAL_TYPES from '@/enum/local.types'


    export default {
        mixins: [initDict, formRoles],
        props: {
            isAdd: {
                type: Boolean,
                required: true
            }
        },
        created: async function () { },
        watch: {},
        data() {
            return {
                loading: false,
                dialog: false,
                form: {
                    code:'',
                    name:'',
                    id:'',
                    locale:''
                },
                rules: {
                    code: [this.getRequiredRole('请输入国际化Code')],
                    name: [this.getRequiredRole('请输入国际化语音内容')],
                    locale: [this.getRequiredRole('选择国际化语音类型')],
                },
                LOCAL_TYPES:LOCAL_TYPES
            }
        },
        methods: {
            cancel() {
                this.resetForm()
            },
            doSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        if (this.isAdd) {
                            this.doAdd()
                        } else this.doEdit()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            doAdd() {
                add(this.form).then(res => {
                    this.resetForm();
                    this.$notify({
                        title: '添加成功',
                        type: 'success',
                        duration: 2500
                    });
                    this.loading = false;
                    this.$parent.init()
                }).catch(err => {
                    this.loading = false;
                    console.log(err.response.data.message)
                })
            },
            doEdit() {
                edit(this.form).then(res => {
                    this.resetForm();
                    this.$notify({
                        title: '修改成功',
                        type: 'success',
                        duration: 2500
                    });
                    this.loading = false;
                    this.$parent.init()
                }).catch(err => {
                    this.loading = false;
                    console.log(err.response.data.message);
                })
            },
            resetForm() {
                this.dialog = false;
                try {
                    this.$refs.form.resetFields();
                } catch (e) {}
                this.form = {
                    code:'',
                    name:'',
                    id:'',
                    locale:''
                };
            },
        }
    }
</script>

<style lang="scss">
    .config-edit {
        /*width: 200px;*/
        /*background: red;*/
        .config-name {
            display: flex;
            flex-direction: row;
            div {
                width: 84px;
                text-align: center;
                line-height: 50px;
                .el-input {
                    width: 100%;
                    input {
                        text-align: center;
                    }
                }
            }
            .el-radio__label {
                font-size: 0;
            }
        }
    }

    .config {
        .el-input-number {
            .el-input-number__decrease {
                display: none;

            }
            .el-input-number__increase {
                display: none;
            }
            .el-input__inner {
                text-align: center;
                padding: 0;
            }
        }
    }
</style>