<template>
    <div class="container">
        <div class="ms-registe">
            <div class="col-md-4 col-md-offset-4">
                <div class="ms-title">用户注册</div>
                <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="ms-content">
                    <el-alert
                            :title="promot"
                            :type="promotType"
                            center
                            show-icon>
                    </el-alert>

                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="姓名" v-on:input="validateUsername()">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="userphone">
                        <el-input v-model="ruleForm.userphone"
                                  v-bind:disabled="phoneinputdisabled"
                                  placeholder="手机号"
                                  v-on:input="getRealTimePhone">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="validatecode">
                        <el-row>
                            <el-col :span="18">
                                <el-input v-model="ruleForm.validatecode"
                                          v-bind:disabled="phoneinputdisabled"
                                          placeholder="输入验证码">
                                    <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button
                                        type="primary"
                                        round
                                        @click="getPhoneValidateCode"
                                        v-bind:disabled="changeCodeDisabled"
                                        v-bind:style="{opacity:changeCodeOpacity}">{{codemsg}}
                                </el-button>
                            </el-col>
                        </el-row>

                    </el-form-item>
                    <br>
                    <div class="form-group" id="toLoginMsg">
                        <p @click="toLogin()">已经有账号了吗?点这里登陆</p>
                    </div>
                    <br>
                    <div class="registe-btn">
                        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    </div>

                </el-form>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Registe",
        data() {
            return {
                ruleForm: {
                    username: '',
                    useremail: '',
                    userphone: '',
                    validatecode: '',
                },

                phoneinputdisabled: false,

                promot: "请确保信息的准确性,姓名注册后不可修改",
                promotType: 'warning',
                codemsg: "获取验证码",

                changeCodeDisabled: false,
                changeCodeOpacity: "1"

            }
        },

        methods: {
            toLogin() {
                this.$router.push('/login');
            },
            //检测名字
            validateUsername() {
                this.promot = "用户姓名仅支持中文";
                this.promotType = "info";
                let uname = this.ruleForm.username;
                var reg = /^[\u4E00-\u9FA5]+$/;
                if (!reg.test(uname)) {
                    this.promot = "姓名含有非中文";
                    this.promotType = "warning";
                    this.ruleForm.username = uname.substring(0, uname.length - 1);
                } else {
                    this.promot = "姓名符合规范";
                    this.promotType = "success";
                    return true;
                }

                if (uname.length > 20) {
                    this.promot = "用户姓名长度不可超过20";
                    this.promotType = "warning";
                    this.ruleForm.username = uname.substring(0, 19);
                }

                return false;
            },

            //实时获取用户输入的手机号
            getRealTimePhone() {
                this.promot = "请填写手机号";
                var userphone = this.userphone;
                if (userphone.length === 11 || userphone.length > 11) {
                    if (userphone.length > 11) {
                        this.promot = "手机号只有11位！";
                        this.userphone = "";
                    }
                    if (!(/^1[3|4|5|7|8][0-9]\d{8,11}$/.test(userphone))) {
                        this.promot = "手机号格式错误！";
                        this.userphone = "";
                    } else {
                        this.$axios({
                            method: 'POST',
                            url: '/usersRegiste/phoneIsOrNotExist',
                            data: {
                                userphone: this.userphone,
                            }
                        }).then(response => {
                            var resdata = response.data;
                            if (null == resdata) {
                                this.promot = "请检查网络连接状况";
                            }
                            if (resdata.state === "200") {
                                this.promot = "该手机号可以注册使用";
                                this.changeCodeDisabled = false;
                                this.changeCodeOpacity = "1";
                            } else {
                                this.promot = "手机号已经注册";
                                this.changeCodeDisabled = true;
                                this.changeCodeOpacity = "0.6";
                            }
                        })
                    }
                }
            },
            //获取验证码
            getPhoneValidateCode() {
                this.phoneinputdisabled = "true";
                this.$axios({
                    method: 'POST',
                    url: '/usersRegiste/getValidatecode',
                    data: {
                        userphone: this.userphone,
                    }
                }).then(response => {
                    this.changeGetCodeButtonStyle();
                    var resdata = response.data;
                    //      var jsonuser = eval('(' + resdata.user + ')');
                    if (resdata.state === "200") {
                        this.promot = "请注意接收验证码";
                        //进行按钮倒计时
                    } else {
                        alert(resdata.msg);
                    }
                })
            },
            //提交注册
            submitForm() {
                if (this.validateUsername()) {
                    this.$axios({
                        method: 'POST',
                        url: '/users/registe',
                        data: {
                            username: this.ruleForm.username,
                            userphone: this.ruleForm.userphone,
                            validatecode: this.ruleForm.validatecode
                        }
                    }).then(response => {
                        var resdata = response.data;
                        if (resdata.state === "200") {
                            alert("注册成功");
                            this.$router.push('/login');
                        } else {
                            alert(resdata.msg);
                        }
                    })
                }
            },
            //改变获取验证码按钮样式
            changeGetCodeButtonStyle() {
                this.changeCodeDisabled = true;
                setTimeout(function () {
                    this.changeCodeOpacity = "0.6";
                }, 1000);
                var time = 60;
                var set = setInterval(function () {
                    this.codemsg = "(" + --time + ")" + "秒后获取";
                }, 1000);
                setTimeout(function () {
                    this.codemsg = "重新获取验证码";
                    this.changeCodeOpacity = "1";
                    this.changeCodeDisabled = false;
                    clearInterval(set);
                }, 60000);
            }
        }
    }
</script>
<style scoped>

    .container {
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
        font-size: 30px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }


    .ms-registe {
        position: absolute;
        left: 45%;
        top: 50%;
        /*width: 420px;*/
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(200, 200, 200, 0.7);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .registe-btn {
        text-align: center;
    }

    .registe-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    #toLoginMsg {
        color: #6a5f31;
    }

</style>
