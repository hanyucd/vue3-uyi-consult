import httpRequest from './httpRequest';
import type { User } from '@/types/user';

export default {
  // 用户登录
  // userLoginApi: (param: any) => httpRequest(`/admin/login`, param, 'post'),
  // 拉取用户信息
  fetchUserInfoApi: () => httpRequest<User>(`/patient/myUser`, {}),
};
