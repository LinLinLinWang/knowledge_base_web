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
                            label="人脸识别">
                        <template slot-scope="scope">

                            <el-button type="primary" @click="openCamers(scope.row.uid)">打开相机</el-button>
                        </template>


                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input

                                    size="mini"
                                    placeholder="输入关键字搜索"/>
                        </template>

                        <template slot-scope="scope">

                            <el-radio v-model="radio[scope.row.uid]" label="0">已到</el-radio>
                            <el-radio v-model="radio[scope.row.uid]" label="1">未到</el-radio>
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


                <el-card :body-style="{ padding: '5px' }">
                    <el-row>
                        请假同学信息(点击左侧展开详情)
                    </el-row>
                    <el-row :gutter="16">

                        <el-table
                                :data="tableData1"
                                style="width: 100%">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="学生学号">
                                            <span>{{ props.row.uid}}</span>
                                        </el-form-item>
                                        <el-form-item label="学生姓名">
                                            <span>{{ props.row.uname}}</span>
                                        </el-form-item>
                                        <el-form-item label="学生手机号">
                                            <span>{{ props.row.phone }}</span>
                                        </el-form-item>
                                        <el-form-item label="学生请假类型">
                                            <span>{{showVtype(props.row.vtype)}}</span>
                                        </el-form-item>
                                        <el-form-item label="请假时间">
                                            <span>{{ props.row.vtime }}</span>
                                        </el-form-item>

                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="学生姓名"
                                    prop="uname">
                            </el-table-column>
                            <el-table-column
                                    label="请假类型"
                                    prop="vtype"
                                    :formatter="showVtype">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-card>

            </el-col>
        </el-row>
        <!-- 对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible_"
                width="30%"
                :before-close="handleClose">

            <div class="container">
                <el-button type="danger" plain v-if="notsupport">获取摄像头权限失败，请检查后重试</el-button>
                <div v-if="!notsupport">
                    共需10张照片，已有{{successnum}}张
                    <el-button type="primary" @click="getPhoto" round>拍照</el-button>
                    <br>
                    <video id="videovar" width="100%" autoplay></video>
                    <br>
                    <canvas id="canvasvar"></canvas>
                </div>
            </div>

        </el-dialog>

    </div>


</template>

<script>
    import WeatherAndWeekDayAndDate from './WeatherAndWeekDayAndDate';


    export default {
        components: {
            WeatherAndWeekDayAndDate
        },
        data() {
            return {
                successnum: 0,
                notsupport: false,
                dialogVisible_: false,
                tableData1: [],
                count: '',
                tableData: [],
                //按钮点名
                radio: {},
                courseid: '',
                coursename: '',
                rocalltype: '',
                rocalldetail: '' //显示点名方式详情

            }
        }, mounted() {
            this.getMedia();
        },
        created() {

            //获取参数值
            this.courseid = this.$route.params.courseid,
                this.rocalltype = this.$route.params.rocalltype,
                this.coursename = this.$route.params.coursename,
                this.rocalldetail = this.$route.params.rocalldetail
            //执行函数
            this.getCourseStudentWithoutVacate();
            //获取请假的学生
            this.getCourseStudentWhoVacate();

        },
        methods: {
            getMedia() {
                var that = this;
                var videovar = document.getElementById('videovar');
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({video: true},
                        function (stream) {
                            try {
                                videovar.src = window.URL.createObjectURL(stream);
                            } catch (e) {
                                //chrome中createObjectURL设置MediaStream已被弃用
                                videovar.srcObject = stream;
                            }
                            videovar.onloadedmetadata = function () {
                                videovar.play();
                            };
                        },
                        function () {
                            that.$message({
                                type: 'error',
                                message: '调用摄像头失败，请请检查后重试'
                            });
                            that.notsupport = true;
                        }
                    );
                }
            },
            getPhoto() {
                var videovar = document.getElementById('videovar');
                var width = videovar.clientWidth;
                var height = videovar.clientHeight;
                var canvas = document.getElementById('canvasvar');
                var context2D = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                context2D.drawImage(videovar, 0, 0, width, height);
                var image_code = canvas.toDataURL("image/png");//要传给后台的base64


                let that = this;

                //此处使用原生js，避免拦截器影响multipart/form-data
                let url = this.$axios.defaults.baseURL + "/users/uploadPhotoForRollCall";
                let data = this.param;
                //附加表单id
                data.append('imgCode', image_code);

                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let resdata = JSON.parse(xhr.responseText);
                        console.log(resdata);
                        that.successnum = resdata.successnum;
                        if (resdata.state === "400") {
                            that.$alert(resdata.msg, '操作结果', {
                                confirmButtonText: '确定',
                            });
                        } else {
                            that.$message({
                                message: resdata.msg,
                                type: 'success'
                            });
                        }
                        if (that.successnum === "10") {
                            this.$router.push({
                                path: "/"
                            });
                        }
                    }
                };

                xhr.open('POST', url);

                xhr.setRequestHeader("Authorization", that.$store.state.token);
                xhr.send(data);
            },
            //关闭对话框
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {
                    });
            },
            //打开相机
            openCamers(uid) {
                this.getMedia();
                this.dialogVisible_ = true;

            },
            //获取当前课程下的学生请假信息
            getCourseStudentWhoVacate() {

                this.$axios({
                    method: 'POST',
                    url: '/vacate/getCourseStudentWhoVacate',
                    data: {
                        courseid: this.courseid
                    }
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');

                    this.tableData1 = jsondata;
                })

            },
            //学生状态
            studentState(row) {
                if (row.state == null) {
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
            //学生请假的类型
            showVtype(row) {
                if (row.vtype == undefined) {

                    switch (row) {


                        case '0':
                            return "事假";
                        case '1':
                            return "病假";
                        case '2':
                            return "其他";


                    }
                }


                switch (row.vtype) {


                    case '0':
                        return "事假";
                    case '1':
                        return "病假";
                    case '2':
                        return "其他";


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
                    url: '/rollcall/getStudentRollCallRandom',
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
