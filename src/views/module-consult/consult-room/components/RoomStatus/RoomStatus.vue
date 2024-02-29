<template>
  <div class="room-status">
    <div v-if="status === OrderType.ConsultWait" class="wait">
      已通知医生尽快接诊，24小时内医生未回复将自动退款
    </div>

    <div v-if="status === OrderType.ConsultChat" class="chat">
      <span>咨询中</span>
      <span v-if="countdown">剩余时间：<van-count-down :time="countdown * 1000" /> </span>
    </div>

    <div
      v-if=" status === OrderType.ConsultComplete || status === OrderType.ConsultCancel "
      class="end"
    >
      <van-icon name="passed" /> 已结束
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderType } from '@/enums';

defineProps<{
  status?: OrderType;
  countdown?: number;
}>();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
