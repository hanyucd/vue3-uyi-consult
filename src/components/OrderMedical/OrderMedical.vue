<template>
  <div class="order-medical">
    <div class="head">
      <h3>优医药房</h3>
      <small>优医质保 假一赔十</small>
    </div>
    <div v-for="med in medicines" :key="med.id" class="item van-hairline--top">
      <img class="img" :src="med.avatar" alt="" />
      <div class="info">
        <p class="name">
          <span>{{ med.name }} </span>
          <span>x{{ med.quantity }}</span>
        </p>
        <p class="size">
          <van-tag v-if="med.prescriptionFlag">处方药</van-tag>
          <span>{{ med.specs }}</span>
        </p>
        <p class="price">￥{{ med.amount }}</p>
      </div>
      <div class="desc">{{ med.usageDosag }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Medical } from '@/types/room';

defineProps<{
  medicines: Medical[];
}>();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
