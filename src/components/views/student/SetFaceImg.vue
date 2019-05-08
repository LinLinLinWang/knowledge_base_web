<template>
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
</template>

<script>

    export default {
        data() {
            return {
                notsupport: false,
                successnum: 0,
                param: new FormData(),
            }
        },
        components: {},
        mounted() {
            this.getMedia();
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
            }
        }
    }
</script>


<style scoped>
    #videovar {
        max-width: 400px;
    }
</style>
