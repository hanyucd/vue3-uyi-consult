<template>
  <NavBar title="问诊室" />

  <div class="room-page">
    <!-- 状态栏 -->
    <RoomStatus :status="consult?.status" :countdown="consult?.countdown" />

    <!-- 消息卡片区域 -->
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <RoomMessage :list="list" />
    </van-pull-refresh>

    <!-- 操作栏 -->
    <RoomAction
      :disabled="consult?.status !== OrderType.ConsultChat"
      @send-text="onSendTextEvt"
      @send-image="onSendImageEvt"
    />
  </div>
</template>

<script setup lang="ts">
import RoomStatus from './components/RoomStatus/RoomStatus.vue';
import RoomAction from './components/RoomAction/RoomAction.vue';
import RoomMessage from './components/RoomMessage/RoomMessage.vue';

import { ref, onMounted, onUnmounted, nextTick, provide } from 'vue';
import { useRoute } from 'vue-router';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';
import { showToast } from 'vant';

import { baseURL } from '@/api/httpRequest';
import type { Message, TimeMessages } from '@/types/room';
import type { ConsultOrderItem, Image } from '@/types/consult';

import { MsgType, OrderType } from '@/enums';
import { useUserStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const userStore = useUserStore();
const route = useRoute();
// 聊天消息列表
const list = ref<Message[]>([]);
// 订单详情
const consult = ref<ConsultOrderItem>();
// 初始信息
const initialMsg = ref(true);
const loading = ref(false);
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'));

// 提供依赖provide
provide('consult', consult);

// 提供子组件修改卡片类型的依赖
const completeEva = (score: number) => {
  const evaItem = list.value.find((item) => item.msgType === MsgType.CardEvaForm);

  if (evaItem) {
    evaItem.msg.evaluateDoc = { score };
    evaItem.msgType = MsgType.CardEva;
  }
};

provide('completeEva', completeEva);

let socket: Socket;

onMounted(() => {
  // 加载问诊订单信息
  _loadConsult();
  
  // 建立链接, 创建socket.id实例
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
      // 对下次刷新历史记录的时间进行赋值
      if (index === 0) time.value = item.createTime;

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

    loading.value = false;
    if (!arr.length) return showToast('没有更多聊天记录了');

    if (initialMsg.value) {
      nextTick(() => {
        // 初始化的时候把最后一条更新状态,那么之前的都会变成已读
        socket.emit('updateMsgStatus', arr[arr.length - 1].id);
        
        window.scrollTo(0, document.body.scrollHeight);
        initialMsg.value = false;
      });
    }
  });

  // 监听订单状态变化
  socket.on('statusChange', () => _loadConsult());

  // 接收聊天消息
  socket.on('receiveChatMsg', async (event) => {
    console.log('接收消息', event);
    list.value.push(event);
    // 等待 DOM 更新
    await nextTick();
    
    socket.emit('updateMsgStatus', event.id);
    // 滚动到底部
    window.scrollTo(0, document.body.scrollHeight);
  });
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

/**
 * 下拉刷新加载更多聊天记录
 */
const onRefresh = () => {
  console.log('下拉刷新了');
  socket.emit('getChatMsgList', 20, time.value, route.query.orderId);
};

/**
 * 监听发送文字事件
 */
// 1. 底部操作栏,输入信息,传递给父组件
// 2. 由父组件发送消息,通过emit发送消息: sendChatMsg
// 3. 接收消息: 用on: receiveChatMsg接收服务器返回的消息
// 4. 渲染的时候需要区分是自己发的还是医生发的
const onSendTextEvt = (sendText: string) => {
  console.log(sendText);
  socket.emit('sendChatMsg', {
    form: userStore.userId,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: sendText
    }
  });
};

/**
 * 监听发送图片
 */
// 1. 底部操作栏上传图片, 成功后把图片传递给父组件 {id, url}
// 2. 由父组件发送消息, 通过emit   sendChatMsg
// 3. 渲染时区分是自己发的还是医生发的
const onSendImageEvt = (img: Image) => {
  console.log(img);
  socket.emit('sendChatMsg', {
    form: userStore.userId,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: {
      picture: img
    }
  });
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
