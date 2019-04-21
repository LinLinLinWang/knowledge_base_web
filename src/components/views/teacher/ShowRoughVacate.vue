<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
                       未审批的请假
                </span>
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="请假编号"
                            prop="vid">
                    </el-table-column>

                    <el-table-column
                            label="请假班级名"
                            prop="cname"
                            >
                    </el-table-column>
                    <el-table-column
                            label="学生id"
                            prop="uid"
                           >
                    </el-table-column>
                    <el-table-column
                            label="学生名"
                            prop="uname"
                           >
                    </el-table-column>


                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="showDetail(scope.$index, scope.row)">查看详情
                            </el-button>



                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="创建班级"/>

                已拒绝的请假
                </span>

                <el-table
                        :data="tableData1"
                        style="width: 100%">

                    <el-table-column
                            label="请假编号"
                            prop="vid">
                    </el-table-column>

                    <el-table-column
                            label="请假班级名"
                            prop="cname"
                            >
                    </el-table-column>
                    <el-table-column
                            label="学生id"
                            prop="uid"
                          >
                    </el-table-column>
                    <el-table-column
                            label="学生名"
                            prop="uname"
                           >
                    </el-table-column>


                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="showDetail(scope.$index, scope.row)">查看详情
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
       同意的请假
                </span>
                <el-table
                        :data="tableData2"
                        style="width: 100%">

                    <el-table-column
                            label="请假编号"
                            prop="vid">
                    </el-table-column>

                    <el-table-column
                            label="请假班级名"
                            prop="cname"
                            >
                    </el-table-column>
                    <el-table-column
                            label="学生id"
                            prop="uid"
                          >
                    </el-table-column>
                    <el-table-column
                            label="学生名"
                            prop="uname"
                            >
                    </el-table-column>


                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="showDetail(scope.$index, scope.row)">查看详情
                            </el-button>



                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
    <!-- 对话框-->

</template>

<script>
    export default {

        data() {
            return {
                tableData: [],
                tableData1: [],
                tableData2: [],
                search: '',

                formInline: {
                    name: '',
                    region: ''
                },

                dialogVisible: false,
                ruleForm: {
                    cname: '',
                    ctime: ''

                },
                cid: ''
            }
        },

        created() {

            this.getAllVacateStateIsZero();
            this.getAllVacateStateIsOne();
            this.getAllVacateStateIsTwo();
        },
        methods: {



// 已经申请的
            getAllVacateStateIsZero() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state:0
                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })
            },
            //已经拒绝的
            getAllVacateStateIsOne() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state:1
                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData1 = jsondata;
                })
            },
            //深情通过的
            getAllVacateStateIsTwo() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state:2
                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData2 = jsondata;
                })
            },


            handleDelete(index, row) {

                this.$prompt('请输入班级新名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{6,10}$/,

                    inputErrorMessage: '格式不正确（汉字 字母 数字）6--10位'
                }).then(({value}) => {
                    this.$axios({
                        method: 'POST',
                        url: '/class/changeClass',
                        data: {
                            cid: row.cid,
                            name: value
                        }
                    }).then(response => {
                        var resdata = response.data;

                        if (resdata.state == '200') {

                            this.$message({
                                type: 'success',
                                message: '修改后的名字是: ' + value
                            });
                            this.getAllClass();

                        } else {
                            this.$message({
                                type: 'info',
                                message: '修改名字失败'
                            });

                        }

                    })


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            //路由跳转
            showDetail(index, row) {

                this.$router.push({name: 'showdetailVacate', params: {vid: row.vid}})


            }
        },

    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
