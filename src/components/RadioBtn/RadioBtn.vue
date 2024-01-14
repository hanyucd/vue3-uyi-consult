<template>
  <div class="cp-radio-btn">
    <a
      v-for="item in radioOptions"
      :key="item.value"
      class="item"
      :class="{ active: modelValue === item.value }"
      href="javascript:;"
      @click="toggleItem(item.value)"
    >
      {{ item.label }}
    </a>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  radioOptions: Array<{ label: string; value: string | number }>;
  modelValue: string | number | undefined;
}

defineProps<IProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();

const toggleItem = (value: string | number) => {
  emit('update:modelValue', value);
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
