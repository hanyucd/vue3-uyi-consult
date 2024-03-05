<template>
  <div class="item van-hairline--top" @click="onGoDetail">
    <img class="img" :src="item.avatar" alt="" />
    <div class="info">
      <p class="name">
        <span>{{ item.name }}</span>
        <span>
          <van-stepper v-model="step" :name="item.id" min="0" :class="{ hide: step === 0 }" @change="onChange" @click.stop />
        </span>
      </p>
      <p class="size">
        <van-tag v-if="item.prescriptionFlag === 1">处方药</van-tag>
        <span>{{ item.specs }}</span>
      </p>
      <p class="price">￥{{ item.amount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Medical } from '@/types/room';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useConsultStore } from '@/stores';

const router = useRouter();
const consultStore = useConsultStore();

const props = defineProps<{
  item: Medical; // 药品单项
}>();

const step = ref(0);

// 主要是实现要和组件 MedicineAction 中的 van-action-sheet 数据联动
watch(() => consultStore.consult.medicines?.find((item) => item.id === props.item.id), (val) => {
  if (val) {
    step.value = +val.quantity;
  } else {
    step.value = 0;
  }
}, { deep: true, immediate: true });

/**
 * 当绑定值变化时触发的事件
 */
const onChange = (value: string, detail: { name: string }) => {
  // 药品
  const medicines = consultStore.consult.medicines || [];
  // 查找是否已存在该药品
  const medicine = medicines?.find((item) => item.id === detail.name);
  if (medicine) {
    // 存在，就改变数量
    medicine.quantity = value;
  } else {
    // 不存在，就push该药品
    medicines.push({ ...props.item, quantity: value });
  }

  // 过滤出数量不为 1 的药品
  consultStore.setMedicinesAction(medicines.filter((item) => +item.quantity > 0));
};

/**
 * 进入药品详情页面
 */
const onGoDetail = () => {
  router.push(`/medicineDetail/${props.item.id}`);
};
</script>

<style lange="scss">
@import './style.scss';
</style>
