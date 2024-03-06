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
      :loading="submitBarLoading"
      @click="submitOrder"
    />
  </div>

  <div v-else class="consult-pay-page">
    <!-- 骨架组件 -->
    <van-skeleton title :row="10" style="margin-top: 18px" />
  </div>

  <!-- 支付面板 -->
  <PayActionSheet v-model:show="paySheetShow" :order-id="consultOrderId" :actual-payment="payOrderInfo.actualPayment" :on-close="onPayActionSheetClose" pay-callback="/room" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import type { ConsultOrderPreData, ConsultOrderPreParams, PartialConsult } from '@/types/consult';
import type { Patient } from '@/types/user';
import useProxyHook from '@/hooks/useProxyHook';
import { useConsultStore } from '@/stores';
import { ConsultTypeEnum } from '@/enums';
import { showConfirmDialog, showDialog, showToast } from 'vant';
import { getCreateOrderParams } from '@/utils/createOrderParamUtil';

const router = useRouter();
const consultStore = useConsultStore();
const proxy = useProxyHook();
// 从对象类型中取出联合类型 key 值
type ConsultKey = keyof PartialConsult;

onMounted(() => {
  const validKeys: ConsultKey[] = [ 'type', 'illnessType', 'depId', 'illnessDesc', 'illnessTime', 'consultFlag', 'patientId', ];

  // 问医生，必填字段加一个docId
  if (consultStore.consult.type === ConsultTypeEnum.Doctor) {
    validKeys.push('docId');
  }

  const valid = validKeys.every((key) => consultStore.consult[key] !== undefined);
  if (!valid) {
    return showDialog({
      title: '温馨提示',
      message: '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false
    }).then(() => {
      router.push('/');
    });
  }

  _getConsultOrderPre();
  _getPatientDetail();
});

onBeforeRouteLeave(() => {
  if (consultOrderId.value) {
    showToast('你已生成问诊订单');
    return false;
  }
});

// 预支付信息
const payOrderInfo = ref<ConsultOrderPreData>({} as ConsultOrderPreData);
/**
 * ConsultPay页面，只有问医生和极速问诊才有该流程
 * 获取预支付订单信息
 */
const _getConsultOrderPre = async () => {
  const param: ConsultOrderPreParams = { type: consultStore.consult.type, illnessType: consultStore.consult.illnessType };
  // 问医生需要带上docId
  if (consultStore.consult.docId) {
    param.docId = consultStore.consult.docId;
  }
  
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
  patient.value = patientData!;
};

// 是否同意协议
const agree = ref(false);
// 支付功能 点击支付,创建订单id,打开支付抽屉
const submitBarLoading = ref(false);
// 是否显示支付面板
const paySheetShow = ref(false);
// 问诊订单 id
const consultOrderId = ref('');
/**
 * 提交支付订单
 */
const submitOrder = async () => {
  if (!agree.value) return showToast('请勾选我同意支付协议');
  submitBarLoading.value = true;

  const type = consultStore.consult.type;
  const params = getCreateOrderParams(consultStore.consult, type);
  const { data: orderData } = await proxy.$api.createConsultOrderApi(params);
  
  // const consultParam = consultStore.consult;
  // const { data: orderData } = await proxy.$api.createConsultOrderApi(consultParam);
  
  consultOrderId.value = orderData.id;
  submitBarLoading.value = false;

  // 创建了订单id 之后, 把仓库数据清空一下,防止多次生成同样内容的订单
  consultStore.clearConsultAction();
  paySheetShow.value = true;
};

/**
 * 监听 支付面板 关闭事件
 */
const onPayActionSheetClose = () => {
  console.log('父组件关闭面板');
  // return true;

  return showConfirmDialog({
    title: '关闭支付',
    message: '取消支付将无法获得医生回复,医生接诊名额有限,是否确认关闭?',
    cancelButtonText: '仍要关闭',
    confirmButtonText: '继续支付',
    confirmButtonColor: 'var(--cp-primary)'
  }).then(() => {
    return false;
  }).catch(() => {
    // 点取消就跳转到订单页
    consultOrderId.value = '';
    router.push('/user/consult');
    return true;
  });
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
