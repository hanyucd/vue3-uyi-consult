<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p>{{ item.docInfo?.name || '暂未分配医生' }}</p>
      <span :class="{ orange: item.status === OrderType.ConsultPay, green: item.status === OrderType.ConsultChat }">{{ item.statusValue }}</span>
    </div>

    <div class="body" @click="$router.push(`/user/consult/${item.id}`)">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">¥ {{ item.payment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value tip">{{ item.createTime }}</div>
      </div>
    </div>

    <!-- 待支付：取消问诊+去支付
         待接诊：取消问诊+继续沟通
         咨询中：查看处方（如果开了）+继续沟通
         已完成：更多（查看处方，如果开了，删除订单）+问诊记录+（未评价?写评价:查看评价）
         已取消：删除订单+咨询其他医生 -->

    <!-- 待支付 -->
    <div v-if="item.status === OrderType.ConsultPay" class="foot">
      <van-button :loading="loading" class="gray" plain size="small" round @click="cancelConsultOrder(item)">
        取消问诊
      </van-button>

      <van-button type="primary" plain size="small" round :to="`/user/consult/${item.id}`">
        去支付
      </van-button>
    </div>

    <!-- 待接诊 -->
    <div v-if="item.status === OrderType.ConsultWait" class="foot">
      <van-button :loading="loading" class="gray" plain size="small" round @click="cancelConsultOrder(item)">
        取消问诊
      </van-button>

      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>

    <!-- 咨询中 -->
    <div v-if="item.status === OrderType.ConsultChat" class="foot">
      <van-button v-if="item.prescriptionId" class="gray" plain size="small" round>
        查看处方
      </van-button>

      <van-button type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        继续沟通
      </van-button>
    </div>

    <!-- 已完成 -->
    <div v-if="item.status === OrderType.ConsultComplete" class="foot">
      <div class="more">
        <order-record-popover
          :disabled="!item.prescriptionId"
          @on-delete="deleteConsultOrder(item)"
          @on-preview="showPrescription(item.prescriptionId as string)"
        />
      </div>
      <van-button v-if="item.prescriptionId" class="gray" plain size="small" round :to="`/room?orderId=${item.id}`">
        问诊记录
      </van-button>

      <van-button v-if="!item.evaluateId" type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        写评价
      </van-button>

      <van-button v-else type="primary" plain size="small" round :to="`/room?orderId=${item.id}`">
        查看评价
      </van-button>
    </div>

    <!-- 已取消 -->
    <div v-if="item.status === OrderType.ConsultCancel" class="foot">
      <van-button :loading="deleteLoading" class="gray" plain size="small" round @click="deleteConsultOrder(item)">
        删除订单
      </van-button>

      <van-button type="primary" plain size="small" round to="/">咨询其他医生</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderType } from '@/enums';
import type { ConsultOrderItem } from '@/types/consult';
import { useCancelOrderHook, useDeleteOrderHook, useShowPrescription } from '@/hooks/useUserHook';

// 取消功能
const { loading, cancelConsultOrder } = useCancelOrderHook();

const props = defineProps<{
  item: ConsultOrderItem;
}>();

// 删除功能
const emit = defineEmits<{
  (e: 'on-delete', id: string): void;
}>();

const { deleteLoading, deleteConsultOrder } = useDeleteOrderHook(() => {
  emit('on-delete', props.item.id);
});

// 查看处方
const { showPrescription } = useShowPrescription();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
