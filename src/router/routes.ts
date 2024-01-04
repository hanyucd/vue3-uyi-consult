import { RouteRecordRaw } from 'vue-router';

const constantRouterMap: RouteRecordRaw[] = [
  // 登录页面
  {
    path: '/login',
    name: 'loginRoute',
    meta: { title: '登录' },
    component: () => import('@/views/login/login.vue'),
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: '404Route',
    meta: { title: '404' },
    component: () => import('@/views/404/404.vue')
  },
];

export { constantRouterMap };
