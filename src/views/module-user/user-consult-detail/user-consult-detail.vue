<template>
  <NavBar title="问诊详情" />

  <div v-if="item" class="consult-detail-page">
    <div class="detail-head">
      <div class="text">
        <h3>图文问诊 {{ item.payment }} 元</h3>
        <span
          class="sta"
          :class="{
            orange: item.status === OrderType.ConsultPay,
            green: item.status === OrderType.ConsultChat
          }"
        >{{ item.statusValue }}</span>
        <p class="tip">服务医生信息</p>
      </div>
      <div class="card">
        <img class="avatar" :src="item.docInfo?.avatar" alt="" />
        <p class="doc">
          <span>极速问诊</span>
          <span>{{ item.docInfo?.name }}</span>
        </p>
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="detail-patient">
      <van-cell-group :border="false">
        <van-cell title="患者信息" :value="`${item.patientInfo.name} | ${item.patientInfo.genderValue} | ${item.patientInfo.age}岁`" />
        <van-cell title="患病时长" :value="getIllnessTimeText(item.illnessTime)" />
        <van-cell title="就诊情况" :value="getConsultFlagTimeText(item.consultFlag)" />
        <van-cell title="病情描述" :label="item.illnessDesc" />
      </van-cell-group>
    </div>

    <div class="detail-order">
      <h3>订单信息</h3>
      <van-cell-group :border="false">
        <van-cell title="订单编号">
          <template #value>
            <span class="copy" @click="onCopy">复制</span>
            {{ item.orderNo }}
          </template>
        </van-cell>
        <van-cell title="创建时间" :value="item.createTime" />
        <van-cell title="应付款" :value="`￥${item.payment}`" />
        <van-cell title="优惠券" :value="`-￥${item.couponDeduction}`" />
        <van-cell title="积分抵扣" :value="`-￥${item.pointDeduction}`" />
        <van-cell title="实付款" :value="`￥${item.actualPayment}`" class="price" />
      </van-cell-group>
    </div>

    <!-- 待支付状态 显示个支付的倒计时 -->
    <div v-if="item.status === OrderType.ConsultPay" class="detail-time">
      请在
      <van-count-down :time="item.countdown * 1000" />
      内完成支付，超时订单将取消
    </div>

    <!-- 待支付：支付金额+取消问诊+去支付
           待接诊：取消问诊+继续沟通
           咨询中：查看处方（如果开了）+继续沟通
           已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价）
           已取消：删除订单+咨询其他医生 -->
           
    <!-- 待支付  -->
    <div v-if="item.status === OrderType.ConsultPay" class="detail-action van-hairline--top">
      <div class="price">
        <span>需付款</span>
        <span>￥{{ item.actualPayment }}</span>
      </div>
      <van-button type="default" round :loading="loading" @click="cancelConsultOrder(item!)">
        取消问诊
      </van-button>
      <van-button type="primary" round @click="show = true">继续支付</van-button>
    </div>

    <!-- 待接诊 -->
    <div v-if="item.status === OrderType.ConsultWait" class="detail-action van-hairline--top">
      <van-button type="default" round :loading="loading" @click="cancelConsultOrder(item!)">
        取消问诊
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>

    <!-- 咨询中 -->
    <div v-if="item.status === OrderType.ConsultChat" class="detail-action van-hairline--top">
      <van-button v-if="item.prescriptionId" type="default" round @click="showPrescription(item!.prescriptionId as string)">
        查看处方
      </van-button>
      <van-button type="primary" round :to="`/room?orderId=${item.id}`">继续沟通</van-button>
    </div>

    <!-- 已完成 -->
    <div v-if="item.status === OrderType.ConsultComplete" class="detail-action van-hairline--top">
      <order-record-popover
        :disabled="!item.prescriptionId"
        @on-delete="deleteConsultOrder(item!)"
        @on-preview="showPrescription(item!.prescriptionId as string)"
      />
      <van-button :to="`/room?orderId=${item.id}`" type="default" round>问诊记录</van-button>

      <van-button v-if="item.evaluateId" :to="`/room?orderId=${item.id}`" type="default" round>查看评价</van-button>
      <van-button v-else type="primary" round :to="`/room?orderId=${item.id}`">写评价</van-button>
    </div>

    <!-- 已取消 -->
    <div v-if="item.status === OrderType.ConsultCancel" class="detail-action van-hairline--top">
      <van-button type="default" round :loading="deleteLoading" @click="deleteConsultOrder(item!)">
        删除订单
      </van-button>
      <van-button type="primary" round to="/">咨询其他医生</van-button>
    </div>
  </div>

  <!-- 骨架屏 -->
  <div v-else class="consult-detail-page">
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getConsultFlagTimeText, getIllnessTimeText } from '@/utils/filterUtil';
import { useRoute, useRouter } from 'vue-router';
import { useClipboard } from '@vueuse/core';
import { showToast } from 'vant';
import { OrderType } from '@/enums';
import type { ConsultOrderItem } from '@/types/consult';
import useProxyHook from '@/hooks/useProxyHook';
import { useCancelOrderHook, useDeleteOrderHook, useShowPrescription } from '@/hooks/useUserHook';

const proxy = useProxyHook();
const route = useRoute();
const router = useRouter();

// 复制单号功能
const { copy, copied, isSupported } = useClipboard();

// 查看处方
const { showPrescription } = useShowPrescription();
// 取消功能
const { loading, cancelConsultOrder } = useCancelOrderHook();
// 删除功能
const { deleteLoading, deleteConsultOrder } = useDeleteOrderHook(() => {
  router.push('/user/consult');
});

const item = ref<ConsultOrderItem>();

// 提供显示变量
const show = ref(false);

watch(copied, () => {
  if (copied.value) showToast('已复制');
});

onMounted(async () => {
  // 动态路由获取参数使用 route.params    ?后面的参数获取使用 route.query
  const { data: consultOrderData } = await proxy.$api.getConsultOrderDetailApi({ orderId: route.params.id });
  item.value = consultOrderData;
});

/**
 * 复制
 */
const onCopy = () => {
  if (!isSupported.value) return showToast('未授权,不支持复制');
  copy(item.value?.orderNo || '');
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
