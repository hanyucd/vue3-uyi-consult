<template>
  <RouterView />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';
const userStore = useUserStore();
const proxy = useProxyHook();
</script>

<style lang="scss" scoped>
</style>
