<template>
  <div class="doctor-card">
    <van-image round :src="doctor.avatar" />
    <p class="name">{{ doctor.name }}</p>
    <p class="van-ellipsis">{{ doctor.hospitalName }} {{ doctor.depName }}</p>
    <p>{{ doctor.positionalTitles }}</p>
    <van-button round size="small" type="primary">
      <!-- :loading="loading" -->
      <!-- @click="follow(doctor)" -->
      {{ doctor.likeFlag === 1 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>

<script setup lang="ts">
import type { Doctor } from '@/types/consult';
defineProps<{
  doctor: Doctor;
}>();
</script>

<style lange="scss">
@import './style.scss';
</style>
