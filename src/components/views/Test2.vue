<template>
    <el-alert
            :title="usertype"
            type="info"
            center
            show-icon>
    </el-alert>
</template>

<script>
    export default {
        name: "Test",
        usertype: this.$store.state.user.type,
    }
</script>

<style scoped>

</style>
