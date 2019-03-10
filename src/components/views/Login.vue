<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 验证码登录</span>
                    <el-form :model="ruleFormCode" :rules="rulesCode" ref="ruleFormCode" label-width="0px"
                             class="ms-content">
                        <el-form-item prop="phone">
                            <el-input v-model="ruleFormCode.phone" placeholder="手机号">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="code">
                            <el-input type="password" placeholder="验证码" v-model="ruleFormCode.code">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="16">
                                <el-input v-model="ruleForm.validatecode"
                                          v-bind:disabled="phoneinputdisabled"
                                          placeholder="输入验证码">
                                    <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-button
                                        type="primary"
                                        round
                                        @click="getPhoneValidateCode"
                                        v-bind:disabled="changeCodeDisabled"
                                        v-bind:style="{opacity:changeCodeOpacity}">{{codemsg}}
                                </el-button>
                            </el-col>
                        </el-row>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm('ruleFormCode')">登录</el-button>
                        </div>
                        <p class="login-tips">Tips : 用户名1，密码1。</p>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 密码登录</span>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                        <el-form-item prop="phone">
                            <el-input v-model="ruleForm.phone" placeholder="phone">
                                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="password" v-model="ruleForm.password">
                                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                            </el-input>
                        </el-form-item>
                        <div class="login-btn">
                            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                        </div>
                        <p class="login-tips">Tips : 用户名1，密码1。</p>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label" @click="toRegiste()"><i class="el-icon-date"></i> 新用户注册</span>
                </el-tab-pane>
            </el-tabs>


        </div>
    </div>
</template>

<script type="application/ecmascript">
    import * as types from '../../config/types'

    export default {
        name: '',
        data() {
            return {
                msg: '',
                ruleForm: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                ruleFormCode: {
                    phone: '',
                    code: ''
                },
                rulesCode: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                },
                phoneinputdisabled: false,
                changeCodeDisabled: false,
                changeCodeOpacity: "1",
                codemsg: "获取验证码",
            }
        },
        methods: {
            //新用户注册
            toRegiste() {
                this.$router.push('/registe')
            },
            //获取验证码
            getPhoneValidateCode() {
                this.phoneinputdisabled = "true";
                this.$axios({
                    method: 'POST',
                    url: '/users/getLoginValidatecode',
                    data: {
                        userphone: this.ruleFormCode.userphone,
                    }
                }).then(response => {
                    this.changeGetCodeButtonStyle();
                    var resdata = response.data;
                    if (resdata.state === "200") {
                        this.promot = "请注意接收验证码";
                        //进行按钮倒计时
                    } else {
                        alert(resdata.msg);
                    }
                })
            },
            //改变获取验证码按钮样式
            changeGetCodeButtonStyle() {
                this.changeCodeDisabled = true;
                setTimeout(function () {
                    this.changeCodeOpacity = "0.6";
                }, 1000);
                let time = 60;
                let set = setInterval(function () {
                    this.codemsg = "(" + --time + ")" + "秒后获取";
                }, 1000);
                setTimeout(function () {
                    this.codemsg = "重新获取验证码";
                    this.changeCodeOpacity = "1";
                    this.changeCodeDisabled = false;
                    clearInterval(set);
                }, 60000);
            },
            //验证码登录
            submitCodeForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/users/loginByCode',
                            data: {
                                phone: this.ruleFormCode.phone,
                                code: this.ruleFormCode.code
                            }
                        }).then(response => {
                            var resdata = response.data;
                            var jsonuser = eval('(' + resdata.user + ')');
                            if (resdata.state === "200") {
                                this.$store.commit(types.LOGIN, {token: resdata.token, user: jsonuser});
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirect
                                });
                            } else {
                                alert("手机号或验证码错误");
                            }
                        })
                    } else {
                        alert("请输入用户名和密码");
                        return false;
                    }
                });
            },
            //提交登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/users/login',
                            data: {
                                phone: this.ruleForm.phone,
                                password: this.ruleForm.password
                            }
                        }).then(response => {
                            var resdata = response.data;
                            var jsonuser = eval('(' + resdata.user + ')');
                            if (resdata.state === "200") {
                                this.$store.commit(types.LOGIN, {token: resdata.token, user: jsonuser});
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                this.$router.push({
                                    path: redirect
                                });
                            } else {
                                alert("手机号或密码错误");
                            }
                        })
                    } else {
                        alert("请输入用户名和密码");
                        return false;
                    }
                });
            }
        }
    }

</script>


<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 410px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
        margin-top: 35px;
        /*height: 10px;*/
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
