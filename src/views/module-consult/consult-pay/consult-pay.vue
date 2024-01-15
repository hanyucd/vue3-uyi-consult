<template>
  <NavBar title="问诊支付" />
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
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
