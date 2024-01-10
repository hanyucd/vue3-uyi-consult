<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow"></i></a>
    </div>
    
    <div class="body">
      <van-swipe :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in 5" :key="item">
          <DoctorCard />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoctorCard from '../DoctorCard/DoctorCard.vue';
</script>

<style lange="scss">
@import './style.scss';
</style>
