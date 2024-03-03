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

  // initMap();
});
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
