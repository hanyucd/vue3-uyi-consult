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
import type { Logistics } from '@/types/order';
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
  securityJsCode: '4023ab921b5c38d4cc97ddc9f6f83cd5'
};

/**
 * 初始化地图
 */
const _initMap = () => {
  AMapLoader.load({
    key: 'f49f88f95c60c46f3aec10ab2c435117', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
      // 使用AMap 初始化地图
      const map = new AMap.Map('map', {
        //设置地图容器id
        mapStyle: 'amap://styles/fresh',
        zoom: 12 //初始化地图级别
      });
    });
};

</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
