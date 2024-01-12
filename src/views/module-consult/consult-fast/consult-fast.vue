<template>
  <NavBar title="极速问诊" right-text="问诊记录" />
  <div class="consult-fast-page">
    <div class="fast-logo">
      <img class="img" src="@/assets/consult-fast.png" alt="" />
      <p class="text"><span>20s</span> 快速匹配专业医生</p>
    </div>

    <div class="fast-type">
      <router-link to="/consult/dep" class="item" @click="consultStore.setIllnessTypeAction(1)">
        <SvgIcon class="pic" name="consult-doctor" />
        <div class="info">
          <p>三甲图文问诊</p>
          <p>三甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow" />
      </router-link>
      
      <router-link to="/consult/dep" class="item" @click="consultStore.setIllnessTypeAction(0)">
        <SvgIcon class="pic" name="consult-message" />
        <div class="info">
          <p>普通图文问诊</p>
          <p>二甲主治及以上级别医生</p>
        </div>
        <van-icon name="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConsultStore } from '@/stores';
const consultStore = useConsultStore();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
