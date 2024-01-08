import type { FieldRule } from 'vant';

// 表单校验
export const mobileRules: FieldRule[] = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
];

export const passwordRules: FieldRule[] = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{8,24}$/, message: '密码需要8-24位' }
];

export const codeRules: FieldRule[] = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码是6个数字' }
];

export const nameRules: FieldRule[] = [
  { required: true, message: '请输入真实姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文字符2-16个字符' }
];

export const idCardRules: FieldRule[] = [
  { required: true, message: '请输入身份证号' },
  {
    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证号格式不正确'
  }
];
