import { createRouter, createWebHistory } from 'vue-router';
import { constantRouterMap } from './routes';
import { useUserStore } from '@/stores';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 关闭右侧转轮
NProgress.configure({ showSpinner: false }); 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouterMap
});

// 登录页面路由
const loginRoutePath = '/login';
// 白名单路由
const whiteRouteList = ['/login', '/login/callback', '/register'];

/**
 * 全局路由前置守卫
 * return false 取消当前导航
 * return true | undefined 放行
 * return 路由地址 对象|string 重定向
 */
router.beforeEach((to, from) => {
  // console.log(to);
  // 进入路由之前开启进度条
  NProgress.start();
  // 获取用户 token 的
  const userStore = useUserStore();
  // if (!userStore.userToken && !whiteRouteList.includes(to.path)) return { path: '/login' };

  if (userStore.userToken) {
    // 防止重复登录
    if (to.path === loginRoutePath) return '/';
  } else {
    // 无 token 情况下 并且不再白名单中 则进入登录页面
    if (!whiteRouteList.includes(to.path)) return { path: '/login' };
  }
});

/**
 * 全局路由后置守卫
 */
router.afterEach((to, from) => {
  NProgress.done();
  // 建议修改标题放 后置守卫 ，切换路由完成后修改标题
  document.title = `U医-${ to.meta.title || '' }`;
});

export default router;
