<template>
    <div>
        <el-row :gutter="16" >
            <el-row :gutter="16">
                  天气 以及 周几
            </el-row>
            <el-row :gutter="16">
                <el-col :span="16">
                    显示班级
                </el-col>
                <el-col :span="8">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地址">
                        </el-table-column>
                    </el-table>
                </el-col>

            </el-row>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "ShowRollClallClass",
        data() {
            return {
                value: new Date(),
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style scoped>

    .el-row {
        margin-bottom: 20px;

    }
    .el-col {
        border-radius: 4px;
    }
</style>