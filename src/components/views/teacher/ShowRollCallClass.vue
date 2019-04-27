<template>
    <div>
        <el-row :gutter="16">
            <el-row :gutter="16">
                <el-card :body-style="{ padding: '5px' }">
                    <el-row style="padding: 14px;">

                        <el-col :span="6" :offset="6">
                            <svg-icon icon-class="天气"/>
                            <span>天气</span>
                        </el-col>
                        <el-col :span="6">
                            <svg-icon icon-class="周"/>
                            <span>周几</span>
                        </el-col>
                        <el-col :span="6">
                            <svg-icon icon-class="日期"/>
                            <span>日期</span>
                        </el-col>

                    </el-row>
                </el-card>
            </el-row>
            <el-row :gutter="16">
                <el-col :span="16">
                    <el-row :gutter="24">
                        <el-col :span="8" :offset="8">
                            请选择课程点名
                        </el-col>
                        <el-col :span="8">


                        </el-col>
                    </el-row>
                    <el-card :body-style="{ padding: '5px' }">
                        <el-col :span="24">
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
                    </el-card>
                </el-col>
                <el-card :body-style="{ padding: '5px' }">
                    <el-col :span="24">
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
                </el-card>


            </el-row>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "ShowRollClallClass",
        data() {
            return {
                loginaddress: '',
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
        },
        created() {

            this.getWeather();

        },
        methods: {

            getWeather() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getWeather',
                    data: {}
                }).then(response => {

                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    console.log(jsondata)
                })


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