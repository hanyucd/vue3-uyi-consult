<template>
  <NavBar title="问诊支付" />

  <div v-if="Object.keys(payOrderInfo).length && Object.keys(patient).length" class="consult-pay-page">
    <div class="pay-info">
      <p class="tit">图文问诊 {{ payOrderInfo.payment }} 元</p>
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>

    <!-- 支付信息区域 -->
    <van-cell-group>
      <van-cell title="优惠券" :value="`-¥${payOrderInfo.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`-¥${payOrderInfo.pointDeduction}`" />
      <van-cell title="实付款" :value="`¥${payOrderInfo.actualPayment}`" class="pay-price" />
    </van-cell-group>
    <div class="pay-space"></div>

    <!-- 患者信息 -->
    <van-cell-group>
      <van-cell title="患者信息" :value="`${patient?.name} | ${patient?.genderValue} | ${patient?.age}岁`" />
      <van-cell title="病情描述" :label="consultStore.consult.illnessDesc" />
    </van-cell-group>

    <div class="pay-schema">
      <van-checkbox v-model="agree">我已同意 <span class="text">支付协议</span></van-checkbox>
    </div>

    <!-- 提交订单栏 -->
    <van-submit-bar
      button-type="primary"
      :price="payOrderInfo.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      :loading="loading"
      @click="submitOrder"
    />
  </div>

  <div v-else class="consult-pay-page">
    <!-- 骨架组件 -->
    <van-skeleton title :row="10" style="margin-top: 18px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ConsultOrderPreData } from '@/types/consult';
import type { Patient } from '@/types/user';
import useProxyHook from '@/hooks/useProxyHook';
import { useConsultStore } from '@/stores';

const consultStore = useConsultStore();
const proxy = useProxyHook();

onMounted(() => {
  _getConsultOrderPre();
  _getPatientDetail();
});

// 预支付信息
const payOrderInfo = ref<ConsultOrderPreData>({} as ConsultOrderPreData);
/**
 * ConsultPay页面，只有问医生和极速问诊才有该流程
 * 获取预支付订单信息
 */
const _getConsultOrderPre = async () => {
  const param = { type: consultStore.consult.type, illnessType: consultStore.consult.illnessType };
  const { data: payOrderPreData } = await proxy.$api.getConsultOrderPreApi(param);

  payOrderInfo.value = payOrderPreData;
  // 设置优惠券信息
  payOrderInfo.value.couponId && consultStore.setCouponAction(payOrderInfo.value.couponId);
};

// 患者信息
const patient = ref<Patient>({} as Patient);
/**
 * 获取患者详情
 */
const _getPatientDetail = async () => {
  const patientId = consultStore.consult.patientId;
  if (!patientId) return;
  const { data: patientData } = await proxy.$api.getPatientDetailApi(patientId);
  patient.value = patientData;
};

// 是否同意协议
const agree = ref(false);

// 支付功能 点击支付,创建订单id,打开支付抽屉
const loading = ref(false);
/**
 * 提交支付订单
 */
const submitOrder = () => {
  
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
