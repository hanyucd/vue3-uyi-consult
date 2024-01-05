import { RouteRecordRaw } from 'vue-router';
import tabbar from '@/views/tabbar/tabbar.vue';
import tabIndex from '@/views/tabbar/tab-index/tab-index.vue';
import tabArticle from '@/views/tabbar/tab-article/tab-article.vue';
import tabMsg from '@/views/tabbar/tab-msg/tab-msg.vue';
import tabProfile from '@/views/tabbar/tab-profile/tab-profile.vue';

const constantRouterMap: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'tabbarRoute',
    redirect: '/index',
    component: tabbar,
    children: [
      { path: '/index', name: 'indexRoute', meta: { title: '首页' }, component: tabIndex },
      { path: '/article', name: 'orderRoute', meta: { title: '健康百科' }, component: tabArticle },
      { path: '/msg', name: 'orderRoute', meta: { title: '消息' }, component: tabMsg },
      { path: '/profile', name: 'profileRoute', meta: { title: '个人中心' }, component: tabProfile },
    ],
  },
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
