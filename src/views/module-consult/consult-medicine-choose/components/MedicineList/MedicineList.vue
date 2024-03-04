<template>
  <div class="medicine-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <medicine-card v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import MedicineCard from '../MedicineCard/MedicineCard.vue';
import { ref, watch } from 'vue';
import type { MedicineList, MedicineParams } from '@/types/consult';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();

const props = defineProps<{
  keyword: string;
}>();

const list = ref<MedicineList>([]);
const loading = ref(false);
const finished = ref(false);

// 查询参数
const params = ref<MedicineParams>({
  keyword: '',
  pageSize: 10,
  current: 1
});

// 监听关键字变化-搜索
watch(() => props.keyword, (val) => {
  list.value = [];
  params.value.keyword = val;
  params.value.current = 1;
  onLoad();
});

/**
 * 加载药品
 */
const onLoad = async () => {
  const { data: medicineData } = await proxy.$api.getMedicinePageApi(params.value);
  list.value.push(...medicineData.rows);

  loading.value = false;
  if (params.value.current >= medicineData.pageTotal) {
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
