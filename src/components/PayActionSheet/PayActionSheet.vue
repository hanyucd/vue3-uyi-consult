
import api from '@/api';
<template>
  <van-action-sheet :show="show" title="选择支付方式" :close-on-popstate="false" :closeable="false" :before-close="onClose" @update:show="emit('update:show', $event)">
    <div class="pay-type">
      <p class="amount">￥ {{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon>
            <SvgIcon name="consult-wechat" />
          </template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 0" />
          </template>
        </van-cell>

        <van-cell title="支付宝支付" @click="paymentMethod = 1">
          <template #icon>
            <SvgIcon name="consult-alipay" />
          </template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 1" />
          </template>
        </van-cell>
      </van-cell-group>
      
      <div class="btn">
        <van-button type="primary" round block @click="confirmPay">立即支付</van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { showLoadingToast, showToast } from 'vant';
import { ref, toRefs } from 'vue';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();

interface IProps {
  show: boolean;
  orderId: string;
  actualPayment: number;
  payCallback: string;
  onClose?: () => void;
}

const props = defineProps<IProps>();
// props 响应式解构
const { orderId, show, payCallback } = toRefs(props);

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void;
}>();

const paymentMethod = ref<0 | 1>();

// 立即支付
const confirmPay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式');
  showLoadingToast({ message: '跳转支付', duration: 0 });

  const payParam = { orderId: orderId.value, paymentMethod: paymentMethod.value, payCallback: import.meta.env.VITE_APP_CALLBACK + payCallback.value };
  const { data: payUrlData } = await proxy.$api.getConsultOrderPayUrlApi(payParam);
  // 跳转掉微信、支付宝支付页面
  window.location.href = payUrlData.payUrl;
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
