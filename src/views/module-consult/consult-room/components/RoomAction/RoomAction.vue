<template>
  <div class="room-action">
    <van-field
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="true"
    />
    <van-uploader :preview-image="false" :disabled="true">
      <SvgIcon name="consult-img" />
    </van-uploader>
  </div>
</template>

<script setup lang="ts"></script>

<style lange="scss" scoped>
@import './style.scss';
</style>
