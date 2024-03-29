import httpRequest from './httpRequest';
import type { User, UserInfo, PatientList, Patient } from '@/types/user';

export default {
  // 用户密码登录
  userLoginByPasswordApi: (param: { mobile: string; password: string }) => httpRequest<User>(`/login/password`, param, 'post'),
  // 用户验证码登录
  userLoginBySMSApi: (param: { mobile: string; code: string }) => httpRequest<User>(`/login`, param, 'post'),
  // 用户第三方登录(qq)
  userLoginByQQApi: (openId: string) => httpRequest<User>(`/login/thirdparty`, { openId, source: 'qq' }, 'post'),
  // 用户绑定手机号
  userBindMobileApi: (param: object) => httpRequest<User>(`/login/binding`, param, 'post'),
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
  // 生成订单
  createConsultOrderApi: (param: object) => httpRequest(`/patient/consult/order`, param, 'post'),
  // 获取支付地址  0 是微信  1 支付宝
  getConsultOrderPayUrlApi: (param: { paymentMethod: 0 | 1; orderId: string; payCallback: string }) => httpRequest(`/patient/consult/pay`, param, 'post'),
  // 查询订单详情信息
  getConsultOrderDetailApi: (param: object) => httpRequest('/patient/consult/order/detail', param),
  // 获取未读消息数量
  getUnreadMsgCountApi: () => httpRequest('/patient/message/unRead/all'),
  // 获取未读消息数量
  getPrescriptionPicApi: (preId: string) => httpRequest(`/patient/consult/prescription/${preId}`),
  // 评价问诊
  evaluateConsultOrderApi: (param: object) => httpRequest(`/patient/order/evaluate`, param, 'post'),
  // 分页问诊订单列表
  getConsultOrderListApi: (param: object) => httpRequest(`/patient/consult/order/list`, param),
  // 取消问诊订单
  cancelConsultOrderApi: (orderId: string) => httpRequest(`/patient/order/cancel/${orderId}`, {}, 'put'),
  // 删除问诊订单
  delConsultOrderApi: (orderId: string) => httpRequest(`/patient/order/${orderId}`, {}, 'delete'),
  // 查询药品订单预支付信息
  getMedicalOrderPreApi: (param: object) => httpRequest(`/patient/medicine/order/pre`, param),
  // 获取收货地址列表
  getAddressListApi: () => httpRequest(`/patient/order/address`),
  // 创建药品订单
  createMedicalOrderApi: (param: object) => httpRequest(`/patient/medicine/order`, param, 'post'),
  // 获取药品订单详情
  getMedicalOrderDetailApi: (orderId: string) => httpRequest(`/patient/medicine/order/detail/${orderId}`),
  // 获取药品订单物流信息
  getMedicalOrderLogisticsApi: (orderId: string) => httpRequest(`/patient/order/${orderId}/logistics`),
  // 获取药品列表
  getMedicinePageApi: (param: object) => httpRequest(`/patient/medicine`, param),
  // 获取药品订单详情
  getMedicineDetailApi: (medicineId: string) => httpRequest(`/patient/medicine/${medicineId}`),
  // 获取医生列表
  getFindDoctorPageApi: (param: object) => httpRequest(`/patient/search/doc`, param),
  // 获取医生详情
  getDoctorDetailApi: (param: object) => httpRequest(`/doc/detail`, param),
  // 获取所有地区
  getAllAreaApi: () => httpRequest(`/basicArea/all`),
};

