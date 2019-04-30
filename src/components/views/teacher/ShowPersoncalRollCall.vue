<template>
    <div>
        <el-row :gutter="16">
            <WeatherAndWeekDayAndDate></WeatherAndWeekDayAndDate>


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

            return {


            }
        },
        created() {
            this.courseid = this.$route.params.courseid;

        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
