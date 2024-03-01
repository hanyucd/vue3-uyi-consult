<template>
  <div>
    list
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ConsultTypeEnum } from '@/enums';

const props = defineProps<{
  type: ConsultTypeEnum;
}>();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
