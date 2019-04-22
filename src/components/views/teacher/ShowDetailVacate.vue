<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>请假详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-alert
                        :title="vacate.state"
                        :type="vacate.stateType"
                        :closable="false"
                        center
                        show-icon>
                </el-alert>
                <br>
                <el-form label-width="80px">
                    <el-form-item label="学生姓名">
                        <el-input v-model="vacate.uname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假班级">
                        <el-input v-model="vacate.classname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假课程">
                        <el-input v-model="vacate.coursename" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假类型">
                        <el-input v-model="vacate.vtype" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假原因">
                        <el-input v-model="vacate.vname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假时间">
                        <el-date-picker
                                v-model="vacate.vtime"
                                :disabled="true"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm"
                                format="yyyy-MM-dd HH:mm"
                                align="left"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="请假附件">
                        <el-button type="success" plain>下载附件</el-button>
                    </el-form-item>


                    <el-form-item label="审批备注">
                        <el-input v-model="vacate.remark" :disabled="vacate.isDisable"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :disabled="vacate.isDisable" @click="vapply(2)">同意该申请</el-button>
                        <el-button type="danger" :disabled="vacate.isDisable" @click="vapply(1)">拒绝该申请</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: "MyVacate",
        data() {
            return {
                vacate: {
                    vid: '',
                    classname: '',
                    coursename: '',
                    vtype: '',
                    vname: '',
                    vtime: [],
                    state: '',
                    stateType: '',
                    remark: '',
                    isDisable: '',
                },

            };
        },
        watch: {
            '$route'(to, from) {
                //监听路由变化
                if (this.$route.params.vid) {
                    this.getDetails();
                }
            }
        },
        created() {
            this.getDetails();
        },
        methods: {
            vapply(bstate) {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/auditVacate',
                    data: {
                        vid: this.$route.params.vid,
                        state: bstate,
                        remark: this.vacate.remark,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                    });
                    if (resdata.state === "200") {
                        this.$router.push('/vacateManagement');
                    }
                })
            },
            getDetails() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/getDetailsByTeacher',
                    data: {
                        vid: this.$route.params.vid,
                    }
                }).then(response => {
                    let datajson = JSON.parse(response.data.data);
                    this.vacate.classname = datajson.classname;
                    this.vacate.coursename = datajson.coursename;
                    this.vacate.vname = datajson.vname;
                    this.vacate.remark = datajson.remark;
                    this.vacate.uname = datajson.uname;
                    this.vacate.state = datajson.state + '';
                    this.vacate.vtime = datajson.vtime.split("至");
                    this.vacate.isDisable = this.vacate.state !== '0';
                    switch (datajson.vtype) {
                        case 0:
                            this.vacate.vtype = "事假";
                            break;
                        case 1:
                            this.vacate.vtype = "病假";
                            break;
                        case 2:
                            this.vacate.vtype = "其他";
                            break;
                    }
                    switch (datajson.state) {
                        case -1:
                            this.vacate.state = "请假已取消";
                            this.vacate.stateType = "warning";
                            break;
                        case 0:
                            this.vacate.state = "等待审批";
                            this.vacate.stateType = "info";
                            break;
                        case 1:
                            this.vacate.state = "请假已被拒绝";
                            this.vacate.stateType = "error";
                            break;
                        case 2:
                            this.vacate.state = "请假已被批准";
                            this.vacate.stateType = "success";
                            break;
                    }

                })
            },
        }
    }
</script>
<style scoped>

</style>
