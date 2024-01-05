<template>
  <div>
    <van-button type="primary" @click="setUserClick">主要按钮</van-button>
    <van-button type="primary" @click="getUserInfo">主要按钮</van-button>

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';
const userStore = useUserStore();
// console.log(userStore);

const proxy = useProxyHook();

const setUserClick = () => {
  userStore.setUserAction({
    token: 'token',
    refreshToken: 'refreshToken',
    avatar: 'avatar',
    // 脱敏手机号
    mobile: '14333',
    // 用户名
    account: 'xiaoMing',
    // 用户id
    id: '834'
  });
};

const getUserInfo = () => {
  // api.fetchUserInfoApi().then(res => console.log(res));
  proxy.$api.fetchUserInfoApi();
};

</script>

<style lang="scss" scoped>
</style>
