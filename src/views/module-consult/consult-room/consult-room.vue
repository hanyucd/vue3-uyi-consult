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
import type { Socket } from 'socket.io-client';
import type { Message, TimeMessages } from '@/types/room';
import type { ConsultOrderItem, Image } from '@/types/consult';
import { MsgType } from '@/enums';
import { baseURL } from '@/api/httpRequest';
import { io } from 'socket.io-client';

import { useUserStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const userStore = useUserStore();
const route = useRoute();
// 聊天消息列表
const list = ref<Message[]>([]);
// 订单详情
const consult = ref<ConsultOrderItem>();

let socket: Socket;

onMounted(() => {
  _loadConsult();
  
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

  // 监听订单状态变化
  socket.on('statusChange', () => _loadConsult());
});

onUnmounted(() => {
  // 手动关闭连接
  socket.close();
});

/**
 * 查询订单详情信息
 */
const _loadConsult = async () => {
  const { data: consultOrderData } = await proxy.$api.getConsultOrderDetailApi({ orderId: route.query.orderId });
  consult.value = consultOrderData;
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
