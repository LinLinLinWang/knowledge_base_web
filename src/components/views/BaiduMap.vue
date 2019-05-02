<template>
    <baidu-map class="bm-view" ak="q8xGTMGQvt1RnyNQqky4glDF"
               :center="center"
               :zoom="zoom"
               :dragging="false"
               :scroll-wheel-zoom="false"
               :double-click-zoom="false"
               :keyboard="false"
               :pinch-to-zoom="false"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom"
               @ready="handler"
    >
        <!--缩放控件-->
        <Navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></Navigation>
        <!--比例尺-->
        <Scale anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></Scale>
        <!--定位-->
        <Geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></Geolocation>
    </baidu-map>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    import Navigation from 'vue-baidu-map/components/controls/Navigation.vue'
    import Scale from 'vue-baidu-map/components/controls/Scale.vue'
    import Geolocation from 'vue-baidu-map/components/controls/Geolocation.vue'

    export default {
        data() {
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        components: {
            BaiduMap,
            Navigation,
            Scale,
            Geolocation
        },
        methods: {
            handler({BMap, map}) {
                this.center.lng = 120.437032;
                this.center.lat = 36.0819;
                this.zoom = 15;
            },

            //双向绑定位置数据
            syncCenterAndZoom(e) {
                const {lng, lat} = e.target.getCenter()
                this.center.lng = lng
                this.center.lat = lat
                this.zoom = e.target.getZoom()
            }
        }
    }
</script>


<style scoped>
    .bm-view {
        width: 100%;
        height: 600px;
    }
</style>
