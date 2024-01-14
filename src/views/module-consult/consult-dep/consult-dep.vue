<template>
  <NavBar title="选择科室" />

  <div class="consult-dep-page">
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="item in allDep" :key="item.id" :title="item.name" />
      </van-sidebar>

      <div class="sub-dep">
        <router-link v-for="sub in subDep" :key="sub.id" to="/consult/illness" @click="consultStore.setConsultDepAction(sub.id)">
          {{ sub.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConsultStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';
import type { TopDep } from '@/types/consult';
import { ref, onMounted, computed } from 'vue';

const consultStore = useConsultStore();
const proxy = useProxyHook();

const active = ref(0);
// 所有科室列表
const allDep = ref<TopDep[]>([]);
// 子课室列表
const subDep = computed(() => allDep.value[active.value]?.child);

onMounted(async () => {
  const { data: depData } = await proxy.$api.getAllDepApi();
  allDep.value = depData;
});
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
