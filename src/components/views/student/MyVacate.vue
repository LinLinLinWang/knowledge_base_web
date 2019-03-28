<template>
    <div class="app">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="请假类型" required>
                <el-select v-model="ruleForm.vtype" placeholder="请选择请假类型">
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

            <el-form-item label="请假课程" required>
                <el-select
                        v-model="ruleForm.vcourse"
                        filterable
                        placeholder="请选择要请假的课程"
                        no-data-text="您还没有课程">
                    <el-option
                            v-for="item in myCourse"
                            :key="item.cname"
                            :label="item.cname"
                            :value="item.cname">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="请假原因" required class="reason">
                <el-input v-model="ruleForm.vreason"
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
                //时间选择器快捷选项
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
                    vreason: '',
                    vcourse: '',
                    vdatetime: '',
                    vtype: '',
                },
                rules: {
                    vdatetime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                },
                //已加入的班级
                myCourse: '',
            };
        },
        created() {
            this.getJoinedClass();
        },
        methods: {
            getJoinedClass() {
                this.$axios({
                    method: 'POST',
                    url: '/course/getMyCourse',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.myCourse = jsondata;
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method: 'POST',
                            url: '/vacate/createVacate',
                            data: {
                                vtype: this.ruleForm.vtype,
                                vreason: this.ruleForm.vreason,
                                vcourse: this.ruleForm.vcourse,
                            }
                        }).then(response => {
                            var resdata = response.data;
                            this.$alert(resdata.msg, '操作结果', {
                                confirmButtonText: '确定',
                            });
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

    .reason {
        width: 50%;
    }
</style>
