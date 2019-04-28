<template xmlns:el-col="http://www.w3.org/1999/html">
    <div>
        <el-row :gutter="16">
             <WeatherAndWeekDayAndDate> </WeatherAndWeekDayAndDate>
            <el-row :gutter="16">
                <el-col :span="16">
                    <el-row :gutter="24">
                        <el-col :span="8" :offset="8">
                            请选择课程点名
                        </el-col>
                        <el-col :span="8">


                        </el-col>
                    </el-row>

                    <el-row :gutter="24">
                        <el-card :body-style="{ padding: '5px' }">


                            <el-table
                                    :data="tableData1.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"

                                    style="width: 100%">

                                <el-table-column
                                        label="课程id"
                                        prop="courseid">
                                </el-table-column>
                                <el-table-column
                                        label="班级名字"
                                        prop="classname">
                                </el-table-column>
                                <el-table-column
                                        label="课程名字"
                                        prop="cname"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="应到人数/总人数"
                                        prop="cname"
                                        :formatter="snum_anum"


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
                                                @click="showRollWays(scope.$index, scope.row)">点名
                                        </el-button>

                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-card>


                    </el-row>

                </el-col>
                <el-col :span="8">
                    <el-card :body-style="{ padding: '5px' }">

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

                    </el-card>
                </el-col>

            </el-row>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="点名课程名字" prop="cname">
                    <el-input v-model="ruleForm.cname" :disabled=true></el-input>
                </el-form-item>
                <el-form-item label="点名方式" prop="ctime">
                    <el-select v-model="ruleForm.ctime" placeholder="请选择点名方式">
                        <el-option :label="item.rtname" :value="item.rtid+''" v-for="item  in rolltype"
                                   v-bind:key="item.rtid"></el-option>

                    </el-select>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="startRoll">确 定</el-button>
  </span>
        </el-dialog>
    </div>

</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';

    export default {
        name: "ShowRollClallClass",
        components: {
            WeatherAndWeekDayAndDate
        },
        data() {
            return {
                //点名类型
                rolltype: [],
                courseid: '',//点名班级号
                //对话框选择点名技术
                dialogVisible: false,
                ruleForm: {
                    cname: '',
                    ctime: ''

                },

                search: '',
                tableData1: [],
                weekday: '',
                date: '',//日期
                weather: '',//图标
                weathername: '',//天气名称
                wind: '',//风向及大小
                temperature: '',//温度
                humidity: '',//湿度
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
            this.getDay();
            this.getCourseToday();
            this.getRollType();

        },
        methods: {
            //获取点名当时
            getRollType() {

                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getRollType',
                    data: {}
                }).then(response => {
                    var jsondata = eval('(' + response.data.data + ')');
                    this.rolltype = jsondata;
                    console.log(jsondata);

                })

            },
            getDay() {
                var myDate = new Date();

                //获取当前星期X(0-6,0代表星期天)
                var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
                this.weekday = weekDay[myDate.getDay()];
                this.date = "日期：" + myDate.toLocaleDateString();     //获取当前日期

            },
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
                    this.weathername = "当前：" + jsondata.info;
                    this.wind = jsondata.direct + ":" + jsondata.power;
                    this.temperature = "温度：" + jsondata.temperature;
                    this.humidity = "湿度:" + jsondata.humidity;
                })


            },
            getCourseToday() {

                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getCourseToday',
                    data: {}
                }).then(response => {
                    var jsondata = eval('(' + response.data.data + ')');

                    this.tableData1 = jsondata;

                })


            }, snum_anum(row) {
                return row.anum + "/" + row.snum;
            },
            showRollWays(index, row) {
                this.dialogVisible = true;
                this.courseid = row.courseid;
                this.ruleForm.cname = row.cname;
                this.ruleForm.ctime = '1'


            },
            //关闭对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {

                        done();
                    })
                    .catch(_ => {
                    });

            },
            //开始点名 //选择
            startRoll() {
                //获取点名的课程

                this.$router.push({
                    name: 'RocallUseNormal',
                    params: {
                        courseid: this.courseid,
                        rocalltype: this.ruleForm.ctime,
                        coursename: this.ruleForm.cname,

                        rocalldetail: this.rolltype[this.ruleForm.ctime].rtdescription

                    }
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