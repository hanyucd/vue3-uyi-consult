import httpRequest from './httpRequest';
import type { User } from '@/types/user';

export default {
  // 用户密码登录
  userLoginByPasswordApi: (param: any) => httpRequest<User>(`/login/password`, param, 'post'),
  // 拉取用户信息
  fetchUserInfoApi: () => httpRequest<User>(`/patient/myUser`, {}),
};
