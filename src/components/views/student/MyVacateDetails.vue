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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {

                tableData: [],

            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {

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
