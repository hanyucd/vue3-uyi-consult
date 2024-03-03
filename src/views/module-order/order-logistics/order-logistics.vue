<template>
  <div class="order-logistics-page">
    <div id="map">
      <div class="title">
        <van-icon name="arrow-left" @click="$router.back()" />
        <span>{{ logistics?.statusValue }}</span>
        <van-icon name="service" />
      </div>

      <div class="current">
        <p class="status">订单派送中 预计{{ logistics?.estimatedTime }}送达</p>
        <p class="predict">
          <span>{{ logistics?.name }}</span>
          <span>{{ logistics?.awbNo }}</span>
        </p>
      </div>
    </div>
    
    <div class="logistics">
      <p class="title">物流详情</p>
      <van-steps direction="vertical" :active="0">
        <van-step v-for="item in logistics?.list" :key="item.id">
          <p class="status">{{ item.statusValue }}</p>
          <p class="content">
            {{ item.content }}
          </p>
          <p class="time">{{ item.createTime }}</p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { ref, onMounted } from 'vue';
import type { Location, Logistics } from '@/types/order';
import { useRoute } from 'vue-router';
import useProxyHook from '@/hooks/useProxyHook';

import endImg from '@/assets/end.png';
import startImg from '@/assets/start.png';
import carImg from '@/assets/car.png';

const proxy = useProxyHook();
const route = useRoute();

const logistics = ref<Logistics>();

onMounted(async () => {
  const res = await proxy.$api.getMedicalOrderLogisticsApi(route.params.id as string);
  logistics.value = res.data;

  _initMap();
});

window._AMapSecurityConfig = {
  securityJsCode: '415e917da833efcf2d5b69f4d821784b'
};

/**
 * 初始化地图
 */
const _initMap = () => {
  AMapLoader.load({
    key: '4eed3d61125c8b9c168fc22414aaef7e', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
      // 使用AMap 初始化地图
      const map = new AMap.Map('map', {
        //设置地图容器id
        mapStyle: 'amap://styles/fresh',
        zoom: 12 //初始化地图级别
      });

      AMap.plugin('AMap.Driving', function () {
      // var driving = new AMap.Driving({
      //   // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
      //   policy: AMap.DrivingPolicy.LEAST_TIME
      // })
      // var startLngLat = [116.379028, 39.865042]
      // var endLngLat = [116.427281, 39.903719]
      // driving.search(startLngLat, endLngLat, function (status, result) {
      //   // 未出错时，result即是对应的路线规划方案
      // })
      const driving = new AMap.Driving({
        map,
        showTraffic: false,
        hideMarkers: true
      });

      if (logistics.value?.logisticsInfo && logistics.value.logisticsInfo.length >= 2) {
        const list = [...logistics.value.logisticsInfo];

        // 创建标记函数
        const getMarker = (point: Location, image: string, width = 25, height = 30) => {
          const icon = new AMap.Icon({
            size: new AMap.Size(width, height),
            image,
            imageSize: new AMap.Size(width, height)
          });

          const marker = new AMap.Marker({
            position: [point?.longitude, point?.latitude],
            icon: icon,
            offset: new AMap.Pixel(-width / 2, -height)
          });
          
          return marker;
        };

        // 起点
        const start = list.shift();
        const startMarker = getMarker(start!, startImg);
        map.add(startMarker);
        // 终点
        const end = list.pop();
        const endMarker = getMarker(end!, endImg);
        map.add(endMarker);

        driving.search(
          [start?.longitude, start?.latitude],
          [end?.longitude, end?.latitude],
          { waypoints: list.map((item) => [item.longitude, item.latitude]) },
          () => {
            // 规划完毕
            // 运输位置
            const curr = logistics.value?.currentLocationInfo;
            const currMarker = getMarker(curr!, carImg, 33, 20);
            map.add(currMarker);
            // 3s后定位当中间进行缩放
            setTimeout(() => {
              map.setFitView([currMarker]);
              map.setZoom(10);
            }, 3000);
          }
        );
      }
    });
  });
};

</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
