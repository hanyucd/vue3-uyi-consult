import httpRequest from './httpRequest';
import type { User, UserInfo, PatientList, Patient } from '@/types/user';

export default {
  // 用户密码登录
  userLoginByPasswordApi: (param: { mobile: string; password: string }) => httpRequest<User>(`/login/password`, param, 'post'),
  // 用户验证码登录
  userLoginBySMSApi: (param: { mobile: string; code: string }) => httpRequest<User>(`/login`, param, 'post'),
  // 发送手机验证码
  sendMobileSMSApi: (param: object) => httpRequest(`/code`, param),
  // 拉取用户信息
  fetchUserInfoApi: () => httpRequest<UserInfo>(`/patient/myUser`),
  // 获取患者列表
  getPatientListApi: () => httpRequest<PatientList>(`/patient/mylist`),
  // 添加患者信息
  addPatientInfoApi: (param: object) => httpRequest(`/patient/add`, param, 'post'),
  // 更新患者信息
  updatePatientInfoApi: (param: object) => httpRequest(`/patient/update`, param, 'put'),
  // 删除患者
  delPatientApi: (patientId: string) => httpRequest(`/patient/del/${ patientId }`, {}, 'delete'),
  // 获取患者详情信息
  getPatientDetailApi: (patientId: string) => httpRequest<Patient>(`/patient/info/${ patientId }`),
  // 获取文章列表
  getKnowledgeListApi: (param: object) => httpRequest(`/patient/home/knowledge`, param),
  // 获取推荐医生列表
  getRecommendDoctorListApi: (param: object) => httpRequest(`/home/page/doc`, param),
  // 关注/取关
  followOrUnfollowApi: (param: object) => httpRequest(`/like`, param, 'post'),
  // 获取全部科室
  getAllDepApi: () => httpRequest('/dep/all'),
  // 上传文件
  uploadImageApi: (formData: object) => httpRequest('/upload', formData, 'post', { headers: { 'Content-Type': 'multipart/form-data' }}),
  // 获取问诊订单预支付
  getConsultOrderPreApi: (param: object) => httpRequest('/patient/consult/order/pre', param),
};
