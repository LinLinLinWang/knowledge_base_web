<template>
    <div style="background-color: white">
        <el-row :gutter="16">
            <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>
        </el-row>
        <el-row :gutter="16">
            <el-col :span="8" :offset="8">
                <el-tag size="medium">{{rocalldetail}}</el-tag>
            </el-col>
            <el-col :span="8">

            </el-col>

        </el-row>
        <el-row :gutter="16">
            <el-col :span="18">
                <el-table
                        :data="tableData"
                        style="width: 100%">

                    <el-table-column
                            label="学生账号"
                            prop="uid">
                    </el-table-column>
                    <el-table-column
                            label="学生姓名"
                            prop="uname">
                    </el-table-column>
                    <el-table-column
                            label="学生手机号"
                            prop="phone"
                    >
                    </el-table-column>
                    <el-table-column
                            label="请假情况"
                            prop="state"
                           >
                    </el-table-column>

                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input

                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>
                        <template slot-scope="scope">
                            <el-radio v-model="radio[scope.$index]" class="" label="1">已到</el-radio>
                            <el-radio v-model="radio[scope.$index]"  class="" label="2">未到</el-radio>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>

            <el-col :span="6">
                /请假的学生
            </el-col>
        </el-row>
    </div>
    <!-- 对话框-->

</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';


    export default {
        components: {
            WeatherAndWeekDayAndDate
        },
        data() {
            return {
                tableData: [],
                //按钮点名
                radio:[],
                courseid: '',
                coursename: '',
                rocalltype: '',
                rocalldetail: '' //显示点名方式详情

            }
        },
        created() {
            //获取参数值
            this.courseid = this.$route.params.courseid,
                this.rocalltype = this.$route.params.rocalltype,
                this.coursename = this.$route.params.coursename,
                this.rocalldetail = this.$route.params.rocalldetail
            //执行函数
            this.getCourseStudentWithoutVacate();


        },
        methods: {
            //根据路由的参数 courseid来选择展示要点名的学生
            getCourseStudentWithoutVacate() {


                this.$axios({
                    method: 'POST',
                    url: '/rollcall/getCourseStudentWithoutVacate',
                    data: {
                        courseid: this.courseid
                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData = jsondata;
                })
            }


        }
    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
