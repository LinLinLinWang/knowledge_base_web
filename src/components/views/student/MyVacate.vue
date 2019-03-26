<template>
    <div class="app">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="请假类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择请假类型">
                    <el-option label="事假" value="shanghai"></el-option>
                    <el-option label="病假" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请假时间" required>
                <el-date-picker
                        v-model="ruleForm.vdatetime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="left"
                        :picker-options="pickerOptions"
                        :default-time="['08:00:00', '21:30:00']">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="请假原因" prop="name" class="reason">
                <el-input v-model="ruleForm.reason"
                          type="textarea"
                          autosize>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交请假</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "MyVacate",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                ruleForm: {
                    reason: '',
                    region: '',
                    vdatetime: '',
                    delivery: false,
                    type: [],
                },
                rules: {
                    vdatetime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/vacate/appleVacate',
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
                        this.$alert("请检查信息完整性", '操作结果', {
                            confirmButtonText: '确定',
                        });

                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .app {
        background-color: white
    }
    .reason{
        width: 50%;
    }
</style>
