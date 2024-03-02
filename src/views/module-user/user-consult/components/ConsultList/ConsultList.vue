<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <consult-item v-for="item in list" :key="item.id" :item="item" @on-delete="onDeleteEvt" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import ConsultItem from '../ConsultItem/ConsultItem.vue';
import { ref } from 'vue';
import type { ConsultTypeEnum } from '@/enums';
import type { ConsultOrderItem, ConsultOrderListParams } from '@/types/consult';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();

const props = defineProps<{
  type: ConsultTypeEnum;
}>();

const loading = ref(false);
const finished = ref(false);
const list = ref<ConsultOrderItem[]>([]);
// 接口参数
const params = ref<ConsultOrderListParams>({
  type: props.type,
  current: 1,
  pageSize: 5
});

/**
 * 加载数据
 */
const onLoad = async () => {
  const { data: orderData } = await proxy.$api.getConsultOrderListApi(params.value);
  list.value.push(...orderData.rows);

  // 数据是否加载完了
  if (params.value.current < orderData.pageTotal) {
    params.value.current++;
  } else {
    finished.value = true;
  }
  loading.value = false;
};

/**
 * 监听从列表中移除订单-事件
 */
const onDeleteEvt = (orderId: string) => {
  list.value = list.value.filter((item) => item.id !== orderId);
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
