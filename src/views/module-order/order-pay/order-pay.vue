<template>
  <NavBar title="问诊记录" />
  
  <div v-if="orderPre && address" class="order-pay-page">
    <div class="order-address">
      <p class="area">
        <van-icon name="location" />
        <span>{{ address.province + address.city + address.county }}</span>
      </p>
      <p class="detail">{{ address.addressDetail }}</p>
      <p>
        {{ address.receiver }}
        {{ address.mobile.replace(/^(\d{3})(?:\d{4})(\d{4})$/, '\$1****\$2') }}
      </p>
    </div>

    <order-medical :medicines="orderPre?.medicines" />
    
    <div class="order-detail">
      <van-cell-group>
        <van-cell title="药品金额" :value="`￥${orderPre.payment}`" />
        <van-cell title="运费" :value="`￥${orderPre.expressFee}`" />
        <van-cell title="优惠券" :value="`-￥${orderPre.couponDeduction}`" />
        <van-cell title="实付款" :value="`￥${orderPre.actualPayment}`" class="price" />
      </van-cell-group>
    </div>

    <div class="order-tip">
      <p class="tip">
        由于药品的特殊性，如非错发、漏发药品的情况，药品一经发出
        不得退换，请核对药品信息无误后下单。
      </p>
      <van-checkbox v-model="agree">我已同意<a href="javascript:;">支付协议</a></van-checkbox>
    </div>

    <van-submit-bar
      :price="orderPre.actualPayment * 100"
      button-text="立即支付"
      button-type="primary"
      text-align="left"
      :loading="loading"
      @submit="submitPayOrder"
    />

    <!-- 支付面板 -->
    <PayActionSheet v-model:show="paySheetShow" :order-id="orderId" :actual-payment="orderPre.actualPayment" pay-callback="/order/pay/result" />
  </div>

  <div v-else class="order-pay-page">
    <van-skeleton title :row="4" style="margin-top: 30px" />
    <van-skeleton title :row="4" style="margin-top: 30px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { showToast } from 'vant';
import type { AddressItem, OrderPre } from '@/types/order';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const route = useRoute();

// 预支付订单信息
const orderPre = ref<OrderPre>();
// 收货地址信息
const address = ref<AddressItem>();

onMounted(() => {
  _loadOrderPre();
  _loadAddress();
});

/**
 * 加载预支付订单信息
 */
const _loadOrderPre = async () => {
  const { data: orderPreData } = await proxy.$api.getMedicalOrderPreApi({ prescriptionId: route.query.id });
  orderPre.value = orderPreData;
};

/**
 * 加载收货地址信息
 */
const _loadAddress = async () => {
  const { data: addressData } = await proxy.$api.getAddressListApi();

  // 如果有默认的收货地址就是它，如果没有就去第一个收货地址即可
  if (addressData.length) {
    const defAddress = addressData.find((item: AddressItem) => item.isDefault === 1);

    if (defAddress) {
      address.value = defAddress;
    } else {
      address.value = addressData[0];
    }
  }
};

const agree = ref(false);
const loading = ref(false);
const orderId = ref(''); // 支付订单 id
const paySheetShow = ref(false); // 支付抽屉

/**
 * 生成药品支付订单
 */
const submitPayOrder = async () => {
  if (!agree.value) return showToast('请同意支付协议');
  if (!address.value?.id) return showToast('请选择收货地址');
  if (!orderPre.value?.id) return showToast('未找到处方');

  // 没有生成订单id 的时候,才调用接口
  if (!orderId.value) {
    try {
      const res = await proxy.$api.createMedicalOrderApi({
        id: orderPre.value.id,
        addressId: address.value.id,
        couponId: orderPre.value.couponId
      });

      orderId.value = res.data.id;
      loading.value = false;
      // 有orderId了 打开支付抽屉
      paySheetShow.value = true;
    } catch (e) {
      loading.value = false;
    }
  } else {
    // 有订单id 直接打开支付抽屉
    paySheetShow.value = true;
  }
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
