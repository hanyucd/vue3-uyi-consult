import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useUserStore } from '@/stores';
import { showToast } from 'vant';
import router from '@/router';

const http: AxiosInstance = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
});

/**
 * 请求拦截器
 */
http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // console.log(config);
    const userStore = useUserStore();

    console.log(userStore.userToken);

    // 请求头添加 token
    if (userStore.userToken) {
      config.headers['Authorization'] = `Bearer ${ userStore.userToken }`;
    }

    return config;
  }, (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 */
http.interceptors.response.use((res: AxiosResponse) => {
    // console.log(res);
    // 摘取核心响应数据
    const resData = res.data;
    // 跟后台约定,响应成功,但是code不为10000,是业务失败(不同公司处理方案不一)
    if (resData.code !== 10000) {
      showToast(resData.message || '业务失败');
      return Promise.reject(resData);
    }

    console.log(resData);

    return resData;
  }, (error: AxiosError) => {
    // console.log(error);
    console.log(router);

    // 处理401错误
    if (error.response?.status === 401) {
      // 清除本地的用户信息
      const userStore = useUserStore();
      userStore.delUserAction();
      // 跳转到登录页面，携带当前访问页面的地址（包含参数的）
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      });
    }
    return Promise.reject(error);
  },
);

// 返回 res.data 的interface
interface IResponse<T = any> {
  code: number | string;
  message: string;
  data: T | null
}

const httpRequest = <T = any>(url = '', data = {}, method: Method = 'get', otherConfig = {}): Promise<IResponse<T>> => {
  return http.request({
    url,
    method: method.toLowerCase(),
    [method === 'get' ? 'params' : 'data']: data,
    ...otherConfig
  });
};

export default httpRequest;
