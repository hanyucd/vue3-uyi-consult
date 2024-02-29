<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="disabled"
    />
    <van-uploader :preview-image="false" :disabled="disabled">
      <SvgIcon name="consult-img" />
    </van-uploader>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  disabled: boolean;
}>();
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
