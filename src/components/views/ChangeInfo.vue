<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 信息维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-alert
                        title="不需要修改的信息请留空"
                        type="info"
                        center
                        show-icon>
                </el-alert>
                <br>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.oldpassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newpassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="SubmitInfo">确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'baseform',
        data: function () {
            return {
                form: {
                    email: '',
                    oldpassword: '',
                    newpassword: '',
                }
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                this.$axios({
                    method: 'GET',
                    url: '/users/getInfo',
                }).then(response => {
                    var resdata = response.data;
                    this.form.email = resdata.email;
                });
            },
            SubmitInfo() {
                this.$axios({
                    method: 'POST',
                    url: '/users/changeInfo',
                }).then(response => {
                    var resdata = response.data;
                    if (resdata.state === "200") {
                        this.$message.success('修改成功!');
                    } else {
                        this.$message.error('修改失败!请检查密码');
                    }
                });
            }
        }
    }
</script>
