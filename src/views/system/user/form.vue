<template>
    <el-dialog :visible.sync="dialog"
               :title="isAdd ? '新增用户' : '编辑用户'"
               append-to-body
               :before-close="cancel"
               width="570px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
            <el-form-item label="用户账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户账号" style="width:200px"/>
            </el-form-item>
            <el-form-item label="用户姓名" prop="realName">
                <el-input v-model="form.realName" placeholder="请输入用户姓名" style="width:200px"/>
            </el-form-item>
            <template v-if="isAdd">
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码" style="width:200px"/>
                </el-form-item>
                <el-form-item label="重复密码" prop="confirmPass">
                    <el-input v-model="form.confirmPass" type="password" placeholder="请重复输入密码" style="width:200px"/>
                </el-form-item>
            </template>
            <el-form-item label="组织机构" prop="deptId">
                <el-select v-model="form.deptId" placeholder="选择部门" filterable
                           :clearable="true"
                           style="width: 200px">
                    <el-option v-for="item in departs" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色" prop="roles">
                <!--<el-input v-model="form.roles" style="width:200px"/>-->
                <el-select v-model="roleIds" placeholder="选择角色"
                           :clearable="true"
                           multiple
                           @change="rolesChange()"
                           style="width: 200px">
                    <el-option v-for="item in roles" :key="item.id" :label="item.remark"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号码" style="width:200px"/>
            </el-form-item>
            <el-form-item label="常见邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入常见邮箱" style="width:200px"/>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio v-model="form.status" label="ENABLED">正常</el-radio>
                <el-radio v-model="form.status" label="DISABLED ">禁用</el-radio>
            </el-form-item>
            <el-form-item label="用户类型">
                <el-radio v-model="form.userType" label="BACKEND">后台管理</el-radio>
                <el-radio v-model="form.userType" label="CLIENT">客户端</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">{{$t('cancel')}}</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">{{$t('confirm')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import {add, edit} from '@/api/user'
    import {getDepts} from '@/api/dept'
    import {getAll, getLevel} from '@/api/role'
    import {getAllJob} from '@/api/job'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import {getRoles} from '@/api/role'

    export default {
        props: {
            isAdd: {
                type: Boolean,
                required: true
            },
        },
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

            const validRoles = (rule, value, callback) => {
                if (value) {
                    if (this.form.roles.length <= 0) {
                        callback(new Error('请选择角色'))
                    } else {
                        callback()
                    }
                } else {
                    callback(new Error('请选择角色'))
                }
            }
            return {
                dialog: false,
                loading: false,
                form: {
                    username: '',
                    realName: '',
                    password: '',
                    confirmPass: '',
                    departId: '',
                    roles: [],
                    phone: '',
                    email: '',
                    status: 'ENABLED',
                    userType: 'ADMIN'
                },
                roleIds: [],
                roles: [],
                depts: [],
                deptId: null,
                jobId: null,
                jobs: [],
                departs: null,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                        {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                    ],
                    confirmPass: [
                        {required: true, validator: confirmPass, trigger: 'blur'}
                    ],
                    email: [
                        {required: false, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, trigger: 'blur', validator: validPhone}
                    ],
                    realName: [
                        {required: true, message: '请输入输入用户姓名', trigger: 'blur'},
                    ],
                    roles: [
                        {required: true, message: '请选择角色', trigger: 'blur', validator:validRoles},
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
                        if (this.isAdd) {
                            this.doAdd()
                        } else this.doEdit()
                    }
                    return false
                })
            },
            doAdd() {
                add(this.form).then(res => {
                    this.resetForm();
                    this.$notify({
                        title: '添加成功',
                        message: '默认密码：123456',
                        type: 'success',
                        duration: 2500
                    });
                    this.loading = false
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
                    console.log(err.response.data.message)
                })
            },
            resetForm() {
                this.dialog = false;
                this.$refs['form'].resetFields();
                // this.deptId = null;
                // this.jobId = null;
                this.roleIds = [];
                this.form = {
                    username: '',
                    realName: '',
                    password: '',
                    confirmPass: '',
                    departId: '',
                    roles: [],
                    phone: '',
                    email: '',
                    status: 'ENABLED',
                    userType: 'ADMIN'
                }
            },
            getRoles() {
                getRoles().then(res => {
                    this.roles = res.data.records;
                }).catch(err => {
                    console.log(err.response.data.message)
                })
            },
            getDepts() {
                getDepts().then(res => {
                    this.departs = res.data.records;
                });
            },
            rolesChange(){
                this.form.roles = this.roleIds.map((item)=>{
                    return {id:item};
                })
            }
        }
    }
</script>

<style scoped>

</style>
