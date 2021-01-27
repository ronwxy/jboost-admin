<template>
    <el-dialog :visible.sync="dialog"
               :title="'重置密码'"
               append-to-body
               width="570px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" style="width:200px"/>
                </el-form-item>
                <el-form-item label="重复密码" prop="confirmPass">
                    <el-input v-model="form.confirmPass" type="password" placeholder="请重复输入密码" style="width:200px"/>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">{{$t('cancel')}}</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">{{$t('confirm')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {resetPass} from '@/api/user'

    export default {
        data() {
            const validPhone = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入电话号码'))
                } else if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value))) {
                    callback(new Error('请输入正确的11位手机号码'))
                } else {
                    callback()
                }
            };
            const confirmPass = (rule, value, callback) => {
                if (value) {
                    if (this.form.password !== value) {
                        callback(new Error('两次输入的密码不一致'))
                    } else {
                        callback()
                    }
                } else {
                    callback(new Error('请再次输入密码'))
                }
            }
            return {
                dialog: false,
                loading: false,
                form: {
                    password: '',
                    confirmPass: '',
                    id:''
                },
                rules: {
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    confirmPass: [
                        {required: true, validator: confirmPass, trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
        },
        methods: {
            cancel() {
                this.resetForm()
            },
            doSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.doEdit()
                    }
                    return false
                })
            },
            doEdit() {
                resetPass(this.form).then(res => {
                    this.resetForm();
                    this.$notify({
                        title: this.$t('op.success'), //'密码重置成功',
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
            resetForm() {
                this.dialog = false;
                this.$refs['form'].resetFields();
                this.form = {
                    password: '',
                    confirmPass: '',
                    id:''
                }
            },
        }
    }
</script>

<style scoped>

</style>
