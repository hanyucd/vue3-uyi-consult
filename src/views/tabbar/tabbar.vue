<template>
  <div class="layout-page">
    <router-view v-slot="{ Component }">
      <keep-alive :max="6">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <van-tabbar v-model="tabActive">
      <van-tabbar-item name="indexRoute">
        <span>首页</span>
        <template #icon="{ active }">
          <SvgIcon :name="`home-index-${ active ? 'active' : 'default' }`" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item name="articleRoute">
        <span>健康百科</span>
        <template #icon="{ active }">
          <SvgIcon :name="`home-article-${ active ? 'active' : 'default' }`" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item name="msgRoute">
        <span>消息</span>
        <template #icon="{ active }">
          <SvgIcon :name="`home-notice-${ active ? 'active' : 'default' }`" />
        </template>
      </van-tabbar-item>

      <van-tabbar-item name="userRoute">
        <span>我的</span>
        <template #icon="{ active }">
          <SvgIcon :name="`home-mine-${ active ? 'active' : 'default' }`" />
        </template>
      </van-tabbar-item>
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
  router.push({ name: newVal });
});
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
