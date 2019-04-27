<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>
                    我的考勤列表
                </el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div class="container">
            <el-row :gutter="12" style="text-align: right;">
                <el-col>
                    <el-date-picker
                            style="margin-right: 10px"
                            v-model="selectdatetime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm"
                            align="left"
                            :picker-options="pickerOptions"
                            :default-time="['08:00:00', '21:30:00']">
                    </el-date-picker>
                    <el-button type="primary">搜索此时间内的记录</el-button>
                    <el-button type="danger">清空条件</el-button>
                </el-col>
            </el-row>

            <el-table
                    :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="班级名"
                        prop="cname">
                </el-table-column>
                <el-table-column
                        label="课程名"
                        prop="coursename">
                </el-table-column>
                <el-table-column
                        label="任课老师"
                        prop="uname">
                </el-table-column>
                <el-table-column
                        label="点名时间"
                        prop="rtime">
                </el-table-column>
                <el-table-column
                        label="出勤状态"
                        prop="rtime">
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
                                @click="joinClassButton(scope.$index, scope.row)">加入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="total, prev, pager, next, jumper"
                        :total="datatotal"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                //筛选日期
                selectdatetime: '',
                currentPage: 1,
                search: '',
                tableData: [],
                datatotal: 0,

            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcalldetails/myAttendance',
                    data: {
                        currentPage: this.currentPage,

                    }
                }).then(response => {
                    var resdata = response.data;
                    this.tableData = eval('(' + resdata.data + ')');
                })
            },

        }
    }

</script>

<style scoped>

    .table {
        width: 100%;
        font-size: 14px;
    }

</style>
