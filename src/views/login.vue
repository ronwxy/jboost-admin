<template>
    <div class="login">
        <template v-if="language === 'en'">
            <div class="language" @click.stop="locale('zh')">
                中
            </div>
        </template>
        <template v-else>
            <div class="language" @click.stop="locale('en')">
                En
            </div>
        </template>
        <div class="container">
            <div class="login-logo">
                <div class="title">{{$t("login.home_title")}}</div>
                <div class="login">
                    <img src="../assets/lb1.jpg" :style="{opacity:showOpacity && 1 || 0}" class="lb"/>
                    <img src="../assets/lb2.jpg" :style="{opacity:!showOpacity && 1 || 0}" class="lb"/>
                </div>
            </div>
            <div class="login-body">
                <el-form ref="loginForm" :model="loginType === 'USER' ? usernameLogin : phoneLogin" :rules="loginType === 'USER' ? usernameLoginRules : phoneLoginRules" label-position="left" label-width="0px"
                         class="login-form">
                    <div class="title-item">
                        <div class="title" @click="onSelectLoginType('USER')" :class="{'active':loginType=== 'USER'}">{{$t('login.username_login')}}</div>
                        <div class="title" @click="onSelectLoginType('PHONE')" :class="{'active':loginType=== 'PHONE'}">{{$t('login.phone_login')}}</div>
                    </div>

                    <div v-show="loginType === 'USER'">
                        <el-form-item prop="username">
                            <el-input v-model="usernameLogin.username" type="text" auto-complete="off" :placeholder="$t('login.username')">
                                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="usernameLogin.password" type="password" auto-complete="off" :placeholder="$t('login.password')" @keyup.enter.native="handleLogin">
                                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"
                                            style="color:red"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="captcha" style="display: flex;">
                            <el-input v-model="usernameLogin.captcha" auto-complete="off" :placeholder="$t('login.captcha')" style="width: 174px;margin-right: 5px;"
                                        @keyup.enter.native="handleLogin">
                                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                            </el-input>
                            <div class="login-code">
                                <img :src="codeUrl" @click="getCode">
                            </div>
                        </el-form-item>
                        <el-checkbox v-model="usernameLogin.rememberMe" style="margin:0px 0px 25px 0px;color:#FFFFFF">{{$t('login.remember_me')}}
                        </el-checkbox>
                        <!-- <el-form-item prop="rememberMe" style="width:100%;">
                            <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                                        @click.native.prevent="handleLogin">
                                <span v-if="!loading">{{$t('login.login')}}</span>
                                <span v-else>{{$t('login.logging')}}</span>
                            </el-button>
                        </el-form-item> -->
                    </div>
                    <div v-show="loginType === 'PHONE'">
                        <el-form-item prop="phone">
                            <el-input v-model="phoneLogin.phone" type="text" auto-complete="off" :placeholder="$t('login.phone')">
                                <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon"/>
                            </el-input>
                        </el-form-item>
                         <el-form-item prop="captcha" style="display: flex;">
                            <el-input v-model="phoneLogin.captcha" auto-complete="off" :placeholder="$t('login.captcha')" style="width: 174px;margin-right: 5px;"
                                      @keyup.enter.native="handleLogin">
                                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                            </el-input>
                            <div class="login-code">
                                <img :src="codeUrl" @click="getCode">
                            </div>
                        </el-form-item>
                        <el-form-item prop="code" style="display: flex;">
                            <el-input v-model="phoneLogin.code" auto-complete="off" :placeholder="$t('login.sms_code')" style="width: 174px;margin-right: 5px;"
                                      @keyup.enter.native="handleLogin">
                                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
                            </el-input>
                            <div class="login-code">
                                <div class="send-verify" @click="onSendVerify" :class="{disabled:timeout > 0}">
                                    {{timeout === 0 ? ( isSend ? '重新发送' : '获取验证码' ) : (timeout + '秒再获取')}}
                                </div>
                            </div>
                        </el-form-item>
                       
                    </div>
                     <el-form-item style="width:100%;">
                            <el-button :loading="loading" size="medium" type="primary" style="width:100%;"
                                       @click.native.prevent="handleLogin">
                                <span v-if="!loading">{{$t('login.login')}}</span>
                                <span v-else>{{$t('login.logging')}}</span>
                            </el-button>
                    </el-form-item>

                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {encrypt} from '@/utils/rsaEncrypt'
    import Config from '@/config'
    import {getCodeImg,getIdentify} from '@/api/login'
    import Cookies from 'js-cookie'

    export default {
        name: 'Login',
        data() {
            return {
                codeUrl: '',
                cookiePass: '',
                usernameLogin: {
                    username: '',
                    password: '',
                    rememberMe: false,
                    captcha: '',
                    uuid: ''
                },
                phoneLogin:{
                    phone: '',
                    captcha: '',
                    uuid: '',
                    code: ''
                },
                loading: false,
                redirect: undefined,
                showOpacity: true,
                title: '',
                language:'',
                loginType:'USER',//PHONE
                verify: '',
                timeout: 0,
                isSend: false,
            }
        },
        computed: {
            usernameLoginRules() {
                return {
                    username: [{required: true, trigger: 'change', message: this.$t('login.username_required')}],
                    password: [{required: true, trigger: 'change', message:
                    this.$t('login.password_required')}],
                    captcha: [{required: true, trigger: 'change', message: 
                    this.$t('login.captcha_required')}],
                }
            },
            phoneLoginRules() {
                return {
                    phone:[{required: true, trigger: 'change', message: this.$t('login.phone_required')}],
                    captcha: [{required: true, trigger: 'change', message: this.$t('login.captcha_required')}],
                    code: [{required: true, trigger: 'change', message: this.$t('login.code_required')}],
                }
            }
        },
        watch: {
            $route: {
                handler: function (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        created() {
            this.getCode();
            this.getCookie();
            window.setInterval(this.report, 5000);
            this.title = process.env.VUE_APP_NAME;
            this.language = localStorage.getItem('locale') || (navigator.language || navigator.browserLanguage).toLowerCase();

        },
        methods: {
            report() {
                this.showOpacity = !this.showOpacity;
            },
            getCode() {
                getCodeImg().then(res => {
                    this.codeUrl = 'data:image/gif;base64,' + res.data.img;
                    if(this.loginType === 'USER') {
                        this.usernameLogin.uuid = res.data.uuid
                    }else{
                        this.phoneLogin.uuid = res.data.uuid
                    }
                })
            },
            getCookie() {
                const username = Cookies.get('username')
                let password = Cookies.get('password')
                const rememberMe = Cookies.get('rememberMe')
                // 保存cookie里面的加密后的密码
                this.cookiePass = password === undefined ? '' : password
                this.usernameLogin = {
                    username: username === undefined ? this.usernameLogin.username : username,
                    password: password === undefined ? this.usernameLogin.password : password,
                    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    let user = {};
                    if(this.loginType==='USER'){
                        user = {
                            username: this.usernameLogin.username,
                            password: this.usernameLogin.password,
                            rememberMe: this.usernameLogin.rememberMe,
                            code: this.usernameLogin.captcha,
                            uuid: this.usernameLogin.uuid,
                            loginType:"USER",
                        }
                        if (user.password !== this.cookiePass) {
                            user.password = encrypt(user.password)
                        }
                    }else{
                        user = {
                            phone: this.phoneLogin.phone,
                            code: this.phoneLogin.code,
                            loginType:"PHONE",
                        }
                    }

                    if (valid) {
                        this.loading = true
                        if (user.rememberMe) {
                            Cookies.set('username', user.username, {expires: Config.passCookieExpires})
                            Cookies.set('password', user.password, {expires: Config.passCookieExpires})
                            Cookies.set('rememberMe', user.rememberMe, {expires: Config.passCookieExpires})
                        } else {
                            Cookies.remove('username')
                            Cookies.remove('password')
                            Cookies.remove('rememberMe')
                        }
                        this.$store.dispatch('Login', user).then(() => {
                            this.loading = false;
                            this.$router.push({path: this.redirect || '/'})
                        }).catch(() => {
                            this.loading = false
                            this.getCode()
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            locale(lang) {
                localStorage.setItem('locale', lang);
                this.$i18n.locale = lang;
                if (this.language === 'en') {
                    this.language = 'zh';
                } else {
                    this.language = 'en';
                }
            },
            onSelectLoginType(type){
                this.loginType = type;
                this.getCode()
            },
            onSendVerify () {
                if (this.isPhone(this.phoneLogin.phone)) {
                    if (this.timeout === 0) {
                        getIdentify(this.phoneLogin.phone, this.phoneLogin.captcha, this.phoneLogin.uuid).then(res =>{
                            this.$set(this, 'isSend', true);
                            this.$set(this, 'timeout', 60);
                            let timeout = setInterval(() => {
                                if (this.timeout === 0) {
                                    clearTimeout(timeout);
                                } else {
                                    this.$set(this, 'timeout', this.timeout - 1);
                                }
                            }, 1000);
                            this.$notify({
                                title: '发送成功',
                                type: 'success',
                                duration: 2500
                            })
                        });
                    } else {
                        this.$notify({
                            title: '发送失败，请稍后再试！',
                            type: 'error',
                            duration: 2500
                        })
                    }
                } else {
                    this.$notify({
                        title: '请输入正确的手机号',
                        type: 'error',
                        duration: 2500
                    })
                }
            },
            isPhone(phone) {
                return /^(1[3-9][0-9])\d{8}$/.test(phone);
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .login {
        .el-form-item__content {
            display: flex;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .login {
        display: flex;
        height: 100%;
        flex-direction: column;

        .language{
            position: absolute;
            width: 20px;
            height: 20px;
            right: 50px;
            top: 20px;
            cursor: pointer;
            fill: #ffffff;
            color: #FFF;
            font-size: 12px;
            font-weight: bold;
            border: 2px solid #FFF;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            user-select: none;
        }
        .container {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
            background-image: url(../assets/login/bg.png);
            background-size: cover;
            justify-content: center;
            align-items: center;
            .login-logo {
                display: flex;
                align-items: baseline;
                justify-content: center;
                flex-direction: column;
                height: 450px;
                width: 600px;
                border-radius: 10px 0 0 10px;
                background: linear-gradient(-25deg, rgba(71, 101, 255, 1), rgba(169, 105, 255, 1));
                padding: 45px;
                .title {
                    font-size: 25px;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);
                    margin: 0 0 50px 0;
                    user-select: none;
                }
                .login {
                    position: relative;
                    height: 320px;
                    width: 496px;
                    .lb {
                        opacity: 1;
                        transition: all 1s linear;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                    }
                }
            }
            .login-body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 450px;
                width: 350px;
                overflow: hidden;
                /*background: #111111;*/
                border-radius: 0 10px 10px 0;
                .login-form {
                    border-radius: 0 10px 10px 0;
                    background: #1212126e;
                    height: 450px;
                    width: 350px;
                    position: relative;
                    padding: 35px;
                    .title-item{
                        display: flex;
                        flex-direction: row;
                    }
                    .title {
                        font-size: 19px;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 1);
                        text-align: center;
                        padding: 9px;
                        margin-bottom:29px;
                        user-select: none;
                        width: 50%;
                        cursor: pointer;
                        &.active{
                          //border-bottom: 2px solid #FFF;
                          //  border-radius: 10px 0 10px 10px;
                            border-radius: 6px;
                            box-shadow: inset 0px 0px 13px 0px white;
                        }
                    }
                    .el-form-item__content {
                        display: flex;
                    }
                    .el-input {
                        height: 44px;
                        input {
                            height: 44px;
                            background: rgba(255, 255, 255, 0.1);
                            font-size: 16px;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                            outline: none;
                            /*box-shadow: 0 0 20px 10px #fff inset;*/
                        }
                        /*input:-webkit-autofill {*/
                            /*box-shadow: 0 0 0 1000px white inset !important;*/
                        /*}*/
                    }
                    .login-code {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100px;
                        img {
                            cursor: pointer;
                            vertical-align: middle;
                            border-radius: 5px;
                            height: 44px;
                            width: 100px;
                        }
                        .send-verify {
                            font-size: 14px;
                            color: #50efd1;
                            text-align: center;
                            cursor: pointer;
                            &.disabled {
                                color: #00b8ff;
                            }
                        }
                    }

                    /* .el-input__prefix {
                         transform: translateX(-80px);
                         filter: drop-shadow(#FFFFFF 80px 0);
                     }*/

                    .el-button--primary {
                        color: #fff;
                        width: 280px;
                        height: 50px;
                        background: linear-gradient(-25deg, rgba(71, 119, 255, 1), rgba(116, 105, 255, 1));
                        border-radius: 5px;
                        span {
                            font-size: 16px;
                            font-weight: 400;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                    .input-icon {
                        height: 44px;
                        width: 16px;
                        margin: 0 4px;
                    }
                }
            }

            .login-inner {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding-left: 190px;
                width: 100%;
                height: 100%;
                .login-content {
                    width: 428px;
                    height: auto;
                    font-size: 24px;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 42px;
                    position: relative;
                    top: -60px;
                }

            }

        }

        .login-footer {
            width: 100%;
            letter-spacing: 1px;
            text-align: center;
            color: #666666;
            font-size: 14px;
            flex-grow: 1;
            align-items: flex-end;
            display: flex;
            justify-content: center;
        }
    }

    .login-tip {
        font-size: 13px;
        text-align: center;
        color: #bfbfbf;
    }

</style>