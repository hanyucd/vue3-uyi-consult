<template>
  <NavBar v-if="order" :title="`药品订单详情-${order.statusValue}`" />
  
  <div v-if="order" class="order-detail-page">
    <div class="order-head">
      <div class="card" @click="$router.push(`/order/logistics/${order?.id}`)">
        <div class="logistics">
          <p>{{ order?.expressInfo.content }}</p>
          <p>{{ order?.expressInfo.time }}</p>
        </div>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 药品列表 -->
    <order-medical :medicines="order!.medicines" />

    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${order?.payment}`" />
        <van-cell title="运费" :value="`￥4${order?.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${order?.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${order?.actualPayment}`" class="price" />
        <van-cell title="订单编号" :value="order?.orderNo" />
        <van-cell title="创建时间" :value="order?.createTime" />
        <van-cell title="支付时间" :value="order?.payTime" />
        <van-cell title="支付方式" :value="order?.paymentMethod === 0 ? '微信' : '支付宝支付'" />
      </van-cell-group>
    </div>

    <!-- 已取消 -->
    <van-action-bar v-if="order.status === OrderType.MedicineCancel">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="沟通记录" />
    </van-action-bar>

    <!-- 待收货 -->
    <van-action-bar v-if="order.status === OrderType.MedicineTake">
      <van-action-bar-button type="primary" text="确认收货" />
    </van-action-bar>

    <!-- 待发货 -->
    <van-action-bar v-if="order.status === OrderType.MedicineSend">
      <van-action-bar-button type="primary" text="提醒发货" />
    </van-action-bar>
    
    <!-- 待支付 -->
    <van-action-bar v-if="order.status === OrderType.MedicinePay">
      <p class="price">
        需要支付：<span>￥{{ order.actualPayment }}</span>
      </p>
      <van-action-bar-button color="#bbb" text="取消订单" />
      <van-action-bar-button type="primary" text="继续支付" />
    </van-action-bar>

    <!-- 已完成 -->
    <van-action-bar v-if="order.status === OrderType.MedicineComplete">
      <van-action-bar-icon icon="delete-o" text="删除" />
      <van-action-bar-button type="primary" text="再次购买" />
    </van-action-bar>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { OrderType } from '@/enums';
import { useOrderDetailHook } from '@/hooks/useUserHook';

const route = useRoute();

const { order } = useOrderDetailHook(route.params.id as string);
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
