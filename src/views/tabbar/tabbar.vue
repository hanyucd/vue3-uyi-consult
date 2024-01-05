<template>
  <div>
    <router-view />

    <van-tabbar v-model="tabActive">
      <van-tabbar-item name="indexRoute" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="orderRoute" icon="bars">订单</van-tabbar-item>
      <van-tabbar-item name="profileRoute" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const tabActive = ref(route.name as string); // tab 激活
// console.log(route.name);

watch(tabActive, (newVal) => {
  console.log(newVal);
  router.push({ name: newVal });
});
</script>

<style scoped></style>
