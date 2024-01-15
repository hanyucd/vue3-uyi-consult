<template>
  <NavBar title="问诊支付" />
</template>

<script setup lang="ts">
import { useConsultStore } from '@/stores';
const consultStore = useConsultStore();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
