<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>


  <div class="div-test">容器</div>

  <van-button type="primary" @click="setUserClick">主要按钮</van-button>
  <van-button type="primary" @click="getUserInfo">主要按钮</van-button>

  <RouterView />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import api from '@/api';
const userStore = useUserStore();

console.log(userStore);

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
  api.fetchUserInfoApi().then(res => console.log(res));
};

</script>

<style lang="scss" scoped>
.div-test {
  width: 200px;
  height: 200px;
  background: var(--cp-primary);
}
</style>
