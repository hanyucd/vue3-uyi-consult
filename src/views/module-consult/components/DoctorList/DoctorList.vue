<template>
  <div class="doctor-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <doctor-card v-for="item in list" :key="item.id" :item="item" :grade="grade" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import DoctorCard from '../DoctorCard/DoctorCard.vue';
import { ref, watch } from 'vue';
import type { DoctorList, DoctorOrderType, DoctorParams } from '@/types/consult';
import type { PositionalTitles, PriceRange } from '@/enums';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();

const props = defineProps<{
  depId: string;
  order?: DoctorOrderType;
  provinceId?: string;
  grade?: string;
  positionalTitles?: PositionalTitles;
  priceRange?: PriceRange;
}>();

const list = ref<DoctorList>([]);
const loading = ref(false);
const finished = ref(false);

const params = ref<DoctorParams>({
  current: 1,
  pageSize: 10,
  depId: props.depId,
  order: props.order || 'default_ascend',
  provinceId: props.provinceId || '100000'
});

watch(
  [
    () => props.order,
    () => props.provinceId,
    () => props.grade,
    () => props.positionalTitles,
    () => props.priceRange
  ],
  ([order, provinceId, grade, positionalTitles, priceRange]) => {
    list.value = [];
    params.value.order = order || 'default_ascend';
    params.value.provinceId = provinceId || '100000';
    params.value.grade = grade;
    params.value.positionalTitles = positionalTitles;
    params.value.priceRange = priceRange;
    params.value.current = 1;
    onLoad();
  }
);

/**
 * 加载医生列表
 */
const onLoad = async () => {
  const { data } = await proxy.$api.getFindDoctorPageApi(params.value);
  list.value.push(...data.rows);
  loading.value = false;
  
  if (params.value.current >= data.pageTotal) {
    finished.value = true;
  } else {
    finished.value = false;
    params.value.current++;
  }
};
</script>

<style lange="scss">
@import './style.scss';
</style>
