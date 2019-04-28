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
                    <el-row :gutter="10">


                        <el-col :span="2" :offset="2">
                            <svg-icon v-bind:icon-class="weather"/>
                            <span>{{weathername}}</span>

                        </el-col>
                        <el-col :span="2">
                            <svg-icon icon-class="周"/>
                            <span>{{temperature+"℃"}}</span>
                        </el-col>
                        <el-col :span="2">
                            <svg-icon icon-class="日期"/>
                            <span>{{humidity+"%"}}</span>

                        </el-col>
                        <el-col :span="2">
                            <svg-icon icon-class="日期"/>
                            <span>{{wind}}</span>
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
                weather: '',//图标
                weathername:'',//天气名称
                wind:'',//风向及大小
                temperature:'',//温度
                humidity:'',//湿度
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
            judgeWeather(info) {
                if (info.indexOf("多云") > -1 || info.indexOf('阴') > -1) {
                    this.weather = "多云";
                    return;

                }
                if (info.indexOf("雨") > -1) {
                    this.weather = "雨天";
                    return;

                }
                if (info.indexOf("雪") > -1) {
                    this.weather = "雪";
                    return;

                }
                if (info.indexOf("雷") > -1) {
                    this.weather = "雷";
                    return;

                }
                if (info.indexOf("雾") > -1) {
                    this.weather = "雾";
                    return;

                }
                if (info.indexOf("雾霾") > -1) {
                    this.weather = "雾霾";
                    return;

                }
                if (info.indexOf("台风") > -1) {
                    this.weather = "台风";
                    return;

                }
                if (info.indexOf("晴") > -1) {
                    this.weather = "晴";


                } else {

                    this.weather = "未知天气";
                    return;
                }

            },
            getWeather() {
                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getWeather',
                    data: {}
                }).then(response => {

                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                   this.judgeWeather(jsondata.info);
                   this.weathername=jsondata.info;
                   this.wind=jsondata.direct+":"+jsondata.power;
                   this.temperature=jsondata.temperature;
                   this.humidity=jsondata.humidity;
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