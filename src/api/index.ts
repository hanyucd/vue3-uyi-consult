import httpRequest from './httpRequest';
import type { User, UserInfo, PatientList, Patient } from '@/types/user';

export default {
  // 用户密码登录
  userLoginByPasswordApi: (param: { mobile: string, password: string }) => httpRequest<User>(`/login/password`, param, 'post'),
  // 用户验证码登录
  userLoginBySMSApi: (param: { mobile: string, code: string }) => httpRequest<User>(`/login`, param, 'post'),
  // 发送手机验证码
  sendMobileSMSApi: (param: object) => httpRequest(`/code`, param),
  // 拉取用户信息
  fetchUserInfoApi: () => httpRequest<UserInfo>(`/patient/myUser`),
  // 获取患者列表
  getPatientListApi: () => httpRequest<PatientList>(`/patient/mylist`),
};
