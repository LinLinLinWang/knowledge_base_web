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
                        border
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
                            :formatter="studentState"
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
                            <el-radio v-model="radio[scope.row.uid]" label="1">已到</el-radio>
                            <el-radio v-model="radio[scope.row.uid]" label="2">未到</el-radio>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row :gutter="16">
                    <el-col :span="4" :offset="20">
                        <el-button type="primary" @click="submit()">立即创建</el-button>

                    </el-col>


                </el-row>
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
                count: '',
                tableData: [],
                //按钮点名
                radio: {},
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
            //学生状态
            studentState(row) {
                if(row.state==null){
                    return "未请假";
                }
                switch (row.state) {


                    case '-1':
                        return "请假取消";
                    case '0':
                        return "审批中";
                    case '1':
                        return "未批准";


                }
            },

            //求返回的json数目
            JSONLength(obj) {
                var Length = 0;
                for (var item in obj) {
                    Length++;
                }
                return Length;
            },
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
                    this.count = this.JSONLength(jsondata);
                    this.tableData = jsondata;
                })
            },
            submit() {

                //都选上时
                //转换为json类型的string
                var StringJson = JSON.stringify(this.radio);
                //将json类型的String  转为 json
                var json = JSON.parse(StringJson);

                if (this.count === (this.JSONLength(json))) {
                    this.$message({
                        type: 'success',
                        message: '正在提交'
                    });
                    this.$axios({
                        method: 'POST',
                        url: '/rollcall/insertOneRollcall', //包括创建一次点名 以及传输 学生出勤信息
                        data: {
                            courseid: this.courseid,
                            rollType: this.rocalltype,
                            datamap: JSON.stringify(this.radio),
                        }
                    }).then(response => {
                        var resdata = response.data;
                        if (resdata.state == 200) {
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });

                        } else {
                            this.$message.error('请稍后再试');
                            return;
                        }
                    })
                } else {
                    this.$message.error('有遗漏的学生，请仔细检查后提交');
                    return;
                }
            }
            ,
        }
    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
