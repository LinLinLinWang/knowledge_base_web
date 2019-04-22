<template>
    <div style="background-color: white">
        <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
                      <h style="color: black">   未审批的请假</h>
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
                                    placeholder="输入关键字搜索"></el-input>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleDelete(scope.$index, scope.row)">查看详情
                            </el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="创建班级"/>

                       <h style="color: red">   已拒绝的请假</h>
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
                                    placeholder="输入关键字搜索"></el-input>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleDelete(scope.$index, scope.row)">查看详情
                            </el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane>
                <span slot="label" class="tabs-span">
                    <svg-icon icon-class="我的班级"/>
                    <h style="color: deepskyblue"> 同意的请假</h>
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
                                    placeholder="输入关键字搜索"></el-input>
                        </template>
                        <template slot-scope="scope">

                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleDelete(scope.$index, scope.row)">查看详情
                            </el-button>


                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课程名称" prop="cname">
                    <el-input v-model="ruleForm.cname"></el-input>
                </el-form-item>
                <el-form-item label="课程安排" prop="ctime">
                    <el-select v-model="ruleForm.ctime" placeholder="请选择上课时间">
                        <el-option label="周一" value="1"></el-option>
                        <el-option label="周二" value="2"></el-option>
                        <el-option label="周三" value="3"></el-option>
                        <el-option label="周四" value="4"></el-option>
                        <el-option label="周五" value="5"></el-option>
                        <el-option label="周六" value="6"></el-option>
                        <el-option label="周日" value="7"></el-option>

                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
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
                        state: 0
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData = eval('(' + resdata.data + ')');
                })
            },
            //已经拒绝的
            getAllVacateStateIsOne() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state: 1
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData1 = eval('(' + resdata.data + ')');
                })
            },
            //申请已通过
            getAllVacateStateIsTwo() {
                this.$axios({
                    method: 'POST',
                    url: '/vacate/VacateList',
                    data: {
                        state: 2
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData2 = eval('(' + resdata.data + ')');
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
            //添加课程
            addCourse(index, row) {

                this.dialogVisible = true;
                this.cid = row.cid;


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
