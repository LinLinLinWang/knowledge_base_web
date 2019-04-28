<template>
    <div style="background-color: white">
        <el-row :gutter="16">
                <el-col :span="4">

                </el-col>
        </el-row>

    </div>
    <!-- 对话框-->

</template>

<script>
    export default {

        data() {
            return {
                courseid: '',
                coursename: '',
                rocalltype: '',
                rocalldetail: '' //显示点名方式详情

            }
        },
        created() {

            this.courseid = this.$route.params.courseid,
                this.rocalltype = this.$route.params.rocalltype,
                this.coursename = this.$route.params.coursename,
                this.rocalldetail = this.$route.params.rocalldetail


        },
        methods: {}
    }
</script>

<style scoped>
    .el-tabs__item {
        height: 50px !important;
        font-size: 25px;
    }
</style>
