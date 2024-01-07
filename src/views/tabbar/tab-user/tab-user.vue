<template>
  <div class="user-page">
    <div class="user-page-head">
      <div class="top">
        <van-image round fit="cover" :src="user?.avatar" />
        <div class="name">
          <p>{{ user?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.couponNumber }}</p>
          <p>优惠券</p>
        </van-col>
      </van-row>
    </div>

    <div class="user-page-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/order">
          全部订单
          <van-icon name="arrow" />
        </router-link>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="user?.orderInfo.paidNumber || ''">
            <SvgIcon name="user-paid" />
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user?.orderInfo.receivedNumber || ''">
            <SvgIcon name="user-shipped" />
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user?.orderInfo.shippedNumber || ''">
            <SvgIcon name="user-received" />
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="user?.orderInfo.finishedNumber || ''">
            <SvgIcon name="user-finished" />
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>

    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell v-for="(item, index) in tools" :key="index" :title="item.label" is-link :border="false" :to="item.path">
        <template #icon><SvgIcon :name="`user-tool-0${index + 1}`" /></template>
      </van-cell>
    </div>

    <a class="logout" href="javascript:;" @click="handleLogout">退出登录</a>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { UserInfo } from '@/types/user';
import useProxyHook from '@/hooks/useProxyHook';
import { showConfirmDialog } from 'vant';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';

// 工具栏数据
const tools = [
  { label: '家庭档案', path: '/user/patient' },
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
];

const userStore = useUserStore();
const proxy = useProxyHook();
const router = useRouter();
const user = ref<UserInfo>();

onMounted(async () => {
  try {
    const { data: userData } = await proxy.$api.fetchUserInfoApi();
    user.value = userData;
  } catch (error) {
    console.log(error);
  }
});

/**
 * 登出
 */
const handleLogout = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '您是否确认退出U医？'
  });
  // 点击的确认
  userStore.delUserAction();
  router.push('/login');
};
</script>

<style lange="scss">
@import './style.scss';
</style>
