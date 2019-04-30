<template>
    <div>
        <el-row :gutter="16">
            <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>


        </el-row>
        <el-tabs tab-position="top" :stretch="true">

        </el-tabs>
        <el-row :gutter="16">
            <el-col :span="12">
                全体出勤
                <el-row>
                    <el-row>
                        <el-col :span="6" :offset="6">
                            <el-button type="primary" onclick="getLatestRollDetail(1)">最近一次</el-button>


                        </el-col>
                        <el-col :span="6">
                            <el-button type="success" onclick="getLatestRollDetail(this.index)">上次出勤</el-button>
                        </el-col>
                        <el-col :span="6">

                        </el-col>

                    </el-row>
                    <el-row>
                        <ve-pie :data="chartData"></ve-pie>
                    </el-row>
                </el-row>
                <el-row>
                    <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
                </el-row>
            </el-col>
            <el-col :span="12">
                按照自己设定出勤率查看出勤率范围的学生
            </el-col>

        </el-row>

    </div>
</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';

    export default {
        components: {
            WeatherAndWeekDayAndDate
        },
        name: "ShowRollCallHistory",
        data() {
            this.chartSettings = {
                stack: {'用户': ['请假人数', '喊到人数', '逃课人数']},
                area: true
            }
            return {
                //折线图
                index: '',//查询的编号
                attentnum: '',//喊到的人
                courseid: '',
                vacatenum: '',//请假的人

                notattentnum: '',//逃课的人
                chartData1: {
                    columns: ['日期', '请假人数', '喊到人数', '逃课人数', '比例'],
                    rows: [
                        {'日期': '1/1', '请假人数': 2222, '喊到人数': 1393, '逃课人数': 1093, '比例': 0.32},
                        {'日期': '1/2', '请假人数': 2222, '喊到人数': 3530, '逃课人数': 3230, '比例': 0.26},
                        {'日期': '1/3', '请假人数': 2222, '喊到人数': 2923, '逃课人数': 2623, '比例': 0.76},
                        {'日期': '1/4', '请假人数': 2222, '喊到人数': 1723, '逃课人数': 1423, '比例': 0.49},
                        {'日期': '1/5', '请假人数': 2222, '喊到人数': 3792, '逃课人数': 3492, '比例': 0.323},
                        {'日期': '1/6', '请假人数': 2222, '喊到人数': 4593, '逃课人数': 4293, '比例': 0.78}
                    ]
                },


                chartData: {
                    columns: ['出勤情况', '访问用户'],
                    rows: [
                        {'出勤情况': '答到人数', '访问用户': this.attentnum},
                        {'出勤情况': '请假人数', '访问用户': this.vacatenum},
                        {'出勤情况': '逃课人数', '访问用户': this.notattentnum},

                    ]
                }
            }
        },
        beforeCreate() {
            // this.getLatestRollDetail(1);



        },

        created() {
            this.courseid = this.$route.params.courseid;
            this.getLatestRollDetail(1);


        },
        methods: {
            getLatestRollDetail(index_) {
                if (index_ == 1) {
                    //获取最近一次该课程出勤情况
                    //获取没有来的人的数目

                    this.$axios({
                        method: 'POST',
                        url: '/rollcall/getLastRollCallInfo',
                        data: {
                            courseid: this.courseid,
                            index: 1
                        }
                    }).then(response => {
                        var resdata = response.data;
                        if (resdata.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '获取最近一次点名记录成功'
                            });

                            this.index = this.index + 1;
                            this.attentnum=resdata.data.attnum;
                            this.vacatenum=resdata.data.vnum;
                            this.notattentnum=resdata.data.notattnum;


                        } else {
                            this.$message.error('请稍后再试');
                        }

                    })
                } else {
                    this.$axios({
                        method: 'POST',
                        url: '/rollcall/getLastRollCallInfo',
                        data: {
                            courseid: this.courseid,
                            index: index_
                        }
                    }).then(response => {
                        var jsondata = eval('(' + response.data.data + ')');
                        if (jsondata.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '获取倒数第' + index_ + '次点名记录成功'
                            });

                            this.index = this.index + 1;
                        } else {
                            this.$message.error('没有更多的点名记录了');
                        }

                    })

                }


            }
        }
    }
</script>

<style scoped>

</style>