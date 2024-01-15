import { RouteRecordRaw } from 'vue-router';
import tabbar from '@/views/tabbar/tabbar.vue';
import tabIndex from '@/views/tabbar/tab-index/tab-index.vue';
import tabArticle from '@/views/tabbar/tab-article/tab-article.vue';
import tabMsg from '@/views/tabbar/tab-msg/tab-msg.vue';
import tabProfile from '@/views/tabbar/tab-user/tab-user.vue';

const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tabbarRoute',
    redirect: '/index',
    component: tabbar,
    children: [
      { path: '/index', name: 'indexRoute', meta: { title: '首页' }, component: tabIndex },
      { path: '/article', name: 'articleRoute', meta: { title: '健康百科' }, component: tabArticle },
      { path: '/msg', name: 'msgRoute', meta: { title: '消息' }, component: tabMsg },
      { path: '/user', name: 'userRoute', meta: { title: '个人中心' }, component: tabProfile },
    ],
  },
  // 登录
  {
    path: '/login',
    name: 'loginRoute',
    meta: { title: '登录' },
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/user/patient',
    name: 'patientRoute',
    meta: { title: '家庭档案' },
    component: () => import('@/views/module-user/user-patient/user-patient.vue'),
  },
  {
    path: '/consult/fast',
    name: 'consultFastRoute',
    meta: { title: '极速问诊' },
    component: () => import('@/views/module-consult/consult-fast/consult-fast.vue'),
  },
  {
    path: '/consult/dep',
    name: 'consultDepRoute',
    meta: { title: '极速问诊' },
    component: () => import('@/views/module-consult/consult-dep/consult-dep.vue'),
  },
  {
    path: '/consult/illness',
    name: 'consultIllnessRoute',
    component: () => import('@/views/module-consult/consult-illness/consult-illness.vue'),
    meta: { title: '病情描述' }
  },
  {
    path: '/consult/pay',
    name: 'consultPayRoute',
    component: () => import('@/views/module-consult/consult-pay/consult-pay.vue'),
    meta: { title: '问诊支付' }
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: '404Route',
    meta: { title: '404' },
    component: () => import('@/views/404/404.vue')
  },
];

export { constantRouterMap };
