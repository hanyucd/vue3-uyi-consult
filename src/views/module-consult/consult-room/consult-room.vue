<template>
  <NavBar title="问诊室" />

  <div class="room-page">
    <!-- 状态栏 -->
    <RoomStatus />

    <!-- 消息卡片区域 -->
    <RoomMessage />

    <!-- 操作栏 -->
    <RoomAction />
  </div>
</template>

<script setup lang="ts">
import RoomStatus from './components/RoomStatus/RoomStatus.vue';
import RoomAction from './components/RoomAction/RoomAction.vue';
import RoomMessage from './components/RoomMessage/RoomMessage.vue';

</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
