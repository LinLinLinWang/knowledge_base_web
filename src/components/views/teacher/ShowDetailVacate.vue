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
                    <el-form-item label="请假班级">
                        <el-input v-model="vacate.cname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="任课老师">
                        <el-input v-model="vacate.uname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假类型">
                        <el-input v-model="vacate.vtype" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假原因">
                        <el-input v-model="vacate.vname":disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="请假时间">
                        <el-date-picker
                                v-model="vacate.vtime":disabled="true"
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

                    <el-form-item>
                        <el-button type="danger" :disabled="vacate.isDisable">拒绝该申请</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" :disabled="vacate.isDisable">同意该申请</el-button>
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
                    cname: '',
                    vtype: '',
                    vname: '',
                    vtime: [],
                    uname: '',
                    state: '',
                    stateType: '',
                    isDisable: '',
                },
                vsid: ''

            };
        },
        watch: {
            '$route'(to, from) { //监听路由是否变化

                if (this.$route.params.vid) {
                    this.getDetails();
                }
            }
        },
        created() {


            this.getDetails();

        },
        methods: {
            getDetails() {

                this.$axios({
                    method: 'POST',
                    url: '/vacate/getVacateDetailByVid',
                    data: {
                        vid: this.$route.params.vid,
                    }
                }).then(response => {
                    let datajson = JSON.parse(response.data.data);
                    this.vacate.cname = datajson.cname;
                    this.vacate.vname = datajson.vname;
                    this.vacate.uname = datajson.uname;
                    this.vacate.state = datajson.state;
                    this.vacate.vtime = datajson.vtime.split("至");
                    switch (datajson.vtype) {
                        case '0':
                            this.vacate.vtype = "事假";
                            break;
                        case '1':
                            this.vacate.vtype = "病假";
                            break;
                        case '2':
                            this.vacate.vtype = "其他";
                            break;
                    }
                    switch (datajson.vtype) {
                        case '0':
                            this.vacate.vtype = "事假";
                            break;
                        case '1':
                            this.vacate.vtype = "病假";
                            break;
                        case '2':
                            this.vacate.vtype = "其他";
                            break;
                    }

                })
            },
        }
    }
</script>


<style scoped>

</style>
