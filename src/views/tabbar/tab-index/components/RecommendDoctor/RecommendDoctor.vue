<template>
  <div class="follow-doctor">
    <div className="head">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow"></i></a>
    </div>

    <div class="body">
      <van-swipe :width="(150 / 375) * width" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="item in recommendDoctorList" :key="item.id">
          <DoctorCard :doctor="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import DoctorCard from '../DoctorCard/DoctorCard.vue';
import { useWindowSize } from '@vueuse/core';
import useProxyHook from '@/hooks/useProxyHook';
import type { DoctorList } from '@/types/consult';
import { ref, onMounted } from 'vue';

const proxy = useProxyHook();
const { width } = useWindowSize();

const recommendDoctorList = ref<DoctorList>([]);

onMounted(() => {
  _getRecommendDoctorList();
});

const _getRecommendDoctorList = async () => {
  const { data: recommendDoctorData } = await proxy.$api.getRecommendDoctorListApi({ current: 1, pageSize: 5 });
  recommendDoctorList.value = recommendDoctorData.rows;
};
</script>

<style lange="scss">
@import './style.scss';
</style>
