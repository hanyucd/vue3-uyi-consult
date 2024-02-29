<template>
  <NavBar title="问诊室" />

  <div class="room-page">
    <!-- 状态栏 -->
    <RoomStatus />

    <!-- 消息卡片区域 -->
    <RoomMessage :list="list" />

    <!-- 操作栏 -->
    <RoomAction />
  </div>
</template>

<script setup lang="ts">
import RoomStatus from './components/RoomStatus/RoomStatus.vue';
import RoomAction from './components/RoomAction/RoomAction.vue';
import RoomMessage from './components/RoomMessage/RoomMessage.vue';

import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores';
import type { Socket } from 'socket.io-client';
import type { Message, TimeMessages } from '@/types/room';
import { MsgType } from '@/enums';
import { baseURL } from '@/api/httpRequest';
import { io } from 'socket.io-client';

const userStore = useUserStore();
const route =  useRoute();
// 聊天消息列表
const list = ref<Message[]>([]);

let socket: Socket;

onMounted(() => {
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${ userStore.userToken }`
    },
    query: {
      orderId: route.query.orderId
    }
  });

  socket.on('connect', () => {
    console.log('连接成功');
  });

  socket.on('disconnect', () => {
    console.log('连接关闭');
  });

  socket.on('error', (event) => {
    // 出现错误打印一下
    console.log('错了', event);
  });

  // 获取聊天记录，如果是第一次（默认消息）
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    console.log(data);
    
    const arr: Message[] = [];

    data.forEach((item, index) => {
      arr.push({
        msgType: MsgType.Notify,
        msg: { content: item.createTime },
        createTime: item.createTime,
        id: item.createTime
      });
      
      arr.push(...item.items);
    });
    // console.log(arr);

    // 追加到聊天消息列表里
    list.value.unshift(...arr);
  });
});

onUnmounted(() => {
  // 手动关闭连接
  socket.close();
});
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
