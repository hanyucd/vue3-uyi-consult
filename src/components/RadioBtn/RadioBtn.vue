<template>
  <div class="cp-radio-btn">
    <a
      v-for="item in radioOptions"
      :key="item.value"
      class="item"
      :class="{ active: modelValue === item.value }"
      href="javascript:;"
      @click="toggleItem(item.value)"
    >{{ item.label }}</a>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  radioOptions: Array<{ label: string, value: string | number}>,
  modelValue: string | number
}

defineProps<IProps>();

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>();

const toggleItem = (value: string | number) => {
  emit('update:modelValue', value);
};
</script>

<style lang="scss" scoped>
.cp-radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 32px;
    min-width: 60px;
    line-height: 30px;
    padding: 0 14px;
    text-align: center;
    border: 1px solid var(--cp-bg);
    background-color: var(--cp-bg);
    margin-right: 10px;
    box-sizing: border-box;
    color: var(--cp-text2);
    margin-bottom: 10px;
    border-radius: 4px;
    transition: all 0.3s;
    &.active {
      border-color: var(--cp-primary);
      background-color: var(--cp-plain);
    }
  }
}
</style>
