import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PartialConsult, ConsultIllness } from '@/types/consult';
import type { ConsultTypeEnum } from '@/enums';

export const useConsultStore = defineStore('consultModule', () => {
  // 问诊记录数据
  const consult = ref<PartialConsult>({});
  
  // 设置问诊记录类型
  const setConsultTypeAction = (_type: ConsultTypeEnum) => consult.value.type = _type;

  // 设置问诊记录类型
  const setIllnessTypeAction = (_type: 0 | 1) => consult.value.illnessType = _type;

  // 设置问诊记录类型
  const setConsultDepAction = (_depId: string) => consult.value.depId = _depId;

  // 设置病情描述
  const setIllnessAction = (illness: ConsultIllness) => {
    consult.value.illnessDesc = illness.illnessDesc;
    consult.value.illnessTime = illness.illnessTime;
    consult.value.consultFlag = illness.consultFlag;
    consult.value.pictures = illness.pictures;
  };
  
  return {
    consult,
    setConsultTypeAction,
    setIllnessTypeAction,
    setConsultDepAction,
    setIllnessAction
  };
}, {
  persist: {
    key: 'consult_info'
  },
});
