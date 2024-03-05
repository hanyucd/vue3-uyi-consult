import { ConsultTypeEnum } from '@/enums';
import type { PartialConsult } from '@/types/consult';

type Key = keyof PartialConsult;

// 三条线都有的字段
export const commonKeys: Key[] = [
  'type', // 问医生，极速问诊，开药门诊
  'illnessDesc', // 病情描述
  'patientId', // 患者Id
  'pictures' // 图片
];

// 极速问诊字段
export const fastKeys: Key[] = [
  ...commonKeys,
  'depId', // 科室
  'illnessTime', // 患病时长
  'consultFlag' // 是否就诊过
];

// 问医生字段，比极速问诊多一个docId 医生Id
export const doctorKeys: Key[] = [...fastKeys, 'docId'];

// 开药门诊字段
export const medicineKeys: Key[] = [
  ...commonKeys,
  'allergicHistory', // 过敏史
  'fertilityStatus', // 生育状态及计划
  'liverFunction', // 肝功能
  'renalFunction', // 肾功能
  'medicines' // 药品
];

/**
 * 
 * @param consult 创建订单
 */
export const getCreateOrderParams = (consult: PartialConsult, type: ConsultTypeEnum = ConsultTypeEnum.Fast) => {
  const params: Record<string, unknown> = {};
  
  switch (type) {
    case ConsultTypeEnum.Doctor:
      for (const key of doctorKeys) {
        params[key] = consult[key];
      }
      break;
    case ConsultTypeEnum.Fast:
      for (const key of fastKeys) {
        params[key] = consult[key];
      }
      break;
    case ConsultTypeEnum.Medication:
      for (const key of medicineKeys) {
        params[key] = consult[key];
      }
      break;
  }
  return params;
};
