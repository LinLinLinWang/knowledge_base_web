<template>
    <el-table
            :data="tableData.filter(data => !search || data.cname.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="cid"
                prop="cid">
        </el-table-column>
        <el-table-column
                label="cname"
                prop="cname">
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
                        @click="handleEdit(scope.$index, scope.row)">加入
                </el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                search: ''
            }
        },
        created() {
            this.getAllClass();
        },
        methods: {
            getAllClass() {
                this.$axios({
                    method: 'POST',
                    url: '/class/getAllClass',
                    data: {}
                }).then(response => {
                    var resdata = response.data;
                    var jsondata = eval('(' + resdata.data + ')');
                    this.tableData = jsondata;
                    console.log("jsonuser: " + jsondata)
                })
            },
            handleEdit(index, row) {
                this.$axios({
                    method: 'POST',
                    url: '/classstudents/joinClass',
                    data: {
                        cid: row.cid,
                    }
                }).then(response => {
                    var resdata = response.data;
                    this.$alert(resdata.msg, '操作结果', {
                        confirmButtonText: '确定',
                    });
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },
    }
</script>
