import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PartialConsult, ConsultIllness, MedicineIllness } from '@/types/consult';
import type { Medical } from '@/types/room';
import type { ConsultTypeEnum } from '@/enums';

export const useConsultStore = defineStore('consultModule', () => {
  // 问诊数据
  const consult = ref<PartialConsult>({});
  
  // 设置问诊类型
  const setConsultTypeAction = (_type: ConsultTypeEnum) => consult.value.type = _type;

  // 设置问诊级别
  const setIllnessTypeAction = (_type: 0 | 1) => consult.value.illnessType = _type;

  // 设置问诊科室
  const setConsultDepAction = (_depId: string) => consult.value.depId = _depId;

  // 设置病情描述
  const setIllnessAction = (illness: ConsultIllness) => {
    consult.value.illnessDesc = illness.illnessDesc;
    consult.value.illnessTime = illness.illnessTime;
    consult.value.consultFlag = illness.consultFlag;
    consult.value.pictures = illness.pictures;
  };

  // 设置患者
  const setPatientAction = (_patientId: string) => (consult.value.patientId = _patientId);

  // 设置优惠券
  const setCouponAction = (_couponId: string) => (consult.value.couponId = _couponId);

  // 设置开药问诊信息
  const setMedicineIlnessAction = (illness: MedicineIllness) => {
    consult.value.illnessDesc = illness.illnessDesc;
    consult.value.liverFunction = illness.liverFunction;
    consult.value.renalFunction = illness.renalFunction;
    consult.value.allergicHistory = illness.allergicHistory;
    consult.value.fertilityStatus = illness.fertilityStatus;
    consult.value.pictures = illness.pictures;
  };

  // 设置开药问诊-中的选择的药品
  const setMedicinesAction = (val: Medical[]) => (consult.value.medicines = val);

  // 设置医生 id
  const setDocIdAction = (val: string) => (consult.value.docId = val);

  // 清空记录
  const clearConsultAction = () => (consult.value = {});
  
  return {
    consult,
    setConsultTypeAction,
    setIllnessTypeAction,
    setConsultDepAction,
    setIllnessAction,
    setPatientAction,
    setCouponAction,

    setMedicineIlnessAction,
    setMedicinesAction,
    setDocIdAction,
    clearConsultAction,
  };
}, {
  persist: {
    key: 'consult_info'
  },
});
