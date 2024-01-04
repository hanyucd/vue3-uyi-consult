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

  <van-button type="primary">主要按钮</van-button>
  <van-button type="success">成功按钮</van-button>
  <van-button type="default">默认按钮</van-button>
  <van-button type="warning">警告按钮</van-button>
  <van-button type="danger">危险按钮</van-button>

  <RouterView />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
const userStore = useUserStore();

console.log(userStore.a);

</script>

<style lang="scss" scoped>
.div-test {
  width: 200px;
  height: 200px;
  background: var(--cp-primary);
}
</style>
