import { IllnessTime } from '@/enums';

// 时间选项
export const timeOptions = [
  { label: '一周内', value: IllnessTime.Week },
  { label: '一月内', value: IllnessTime.Month },
  { label: '半年内', value: IllnessTime.HalfYear },
  { label: '大于半年', value: IllnessTime.More }
];

// 是否就诊选项
export const flagOptions = [
  { label: '就诊过', value: 0 },
  { label: '没就诊过', value: 1 }
];
