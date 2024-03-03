<template>
  <NavBar title="药品支付结果" />
  
  <div v-if="order?.status === OrderType.MedicinePay" class="result error">
    <van-icon name="clear" />
    <p class="price">￥ {{ order?.actualPayment }}</p>
    <p class="status">支付失败</p>
    <p class="tip">订单支付失败，可以点击查看订单继续支付，如有疑问联系客服~</p>
    <div class="btn">
      <van-button type="primary" :to="`/order/${order?.id}`">查看订单</van-button>
      <van-button :to="`/room?orderId=${order?.roomId}`">返回诊室</van-button>
    </div>
  </div>

  <div v-else class="result">
    <van-icon name="checked" />
    <p class="price">￥ {{ order?.actualPayment }}</p>
    <p class="status">支付成功</p>
    <p class="tip">订单支付成功，已通知药房尽快发出， 请耐心等待~</p>
    <div class="btn">
      <van-button type="primary" :to="`/order/${order?.id}`">查看订单</van-button>
      <van-button :to="`/room?orderId=${order?.roomId}`">返回诊室</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { OrderDetail } from '@/types/order';
import { useRoute } from 'vue-router';
import { OrderType } from '@/enums';
import useProxyHook from '@/hooks/useProxyHook';
const proxy = useProxyHook();

const order = ref<OrderDetail>();
  const route = useRoute();

onMounted(async () => {
  const res = await proxy.$api.getMedicalOrderDetailApi(route.query.orderId as string);
  order.value = res.data;
});

</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
