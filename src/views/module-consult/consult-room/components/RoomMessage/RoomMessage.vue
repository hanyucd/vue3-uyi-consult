<template>
  <template v-for="item in list" :key="item.msg.id">
    <!-- 患者卡片 -->
    <div v-if="item.msgType === MsgType.CardPat" class="msg msg-illness">
      <div class="patient van-hairline--bottom">
        <p>
          {{ item.msg.consultRecord?.patientInfo.name }}
          {{ item.msg.consultRecord?.patientInfo.genderValue }}
          {{ item.msg.consultRecord?.patientInfo.age }}岁
        </p>
        <p v-if="item.msg.consultRecord">
          {{ getIllnessTimeText(item.msg.consultRecord.illnessTime) }} |
          {{ getConsultFlagTimeText(item.msg.consultRecord.consultFlag) }}
        </p>
      </div>
      <van-row>
        <van-col span="6">病情描述</van-col>
        <van-col span="18">{{ item.msg.consultRecord?.illnessDesc }}</van-col>
        <van-col span="6">图片</van-col>
        <van-col span="18" @click="previewImage(item.msg.consultRecord?.pictures)">点击查看</van-col>
      </van-row>
    </div>
  
    <!-- 通知-通用 -->
    <div v-if="item.msgType === MsgType.Notify" class="msg msg-tip">
      <div class="content">
        <span>{{ item.msg.content }}</span>
      </div>
    </div>

    <!-- 通知-温馨提示 -->
    <div v-if="item.msgType === MsgType.NotifyTip" class="msg msg-tip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>{{ item.msg.content }}</span>
      </div>
    </div>

    <!-- 通知-结束 -->
    <!-- <div class="msg msg-tip msg-tip-cancel">
    <div class="content">
      <span>订单取消</span>
    </div>
  </div> -->

    <!-- 发送文字 -->
    <div v-if="item.msgType === MsgType.MsgText && userStore.userId === item.from" class="msg msg-to">
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <div class="pao">{{ item.msg.content }}</div>
      </div>
      <van-image :src="item.fromAvatar" />
    </div>

    <!-- 发送图片 -->
    <div v-if="item.msgType === MsgType.MsgImage && item.from === userStore.userId" class="msg msg-to">
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <van-image fit="contain" :src="item.msg.picture?.url" />
      </div>
      <van-image :src="item.fromAvatar" />
    </div>

    <!-- 接收文字 -->
    <div v-if="item.msgType === MsgType.MsgText && userStore.userId !== item.from" class="msg msg-from">
      <van-image :src="item.fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <div class="pao">{{ item.msg.content }}</div>
      </div>
    </div>
    
    <!-- 接收图片 -->
    <div v-if="item.msgType === MsgType.MsgImage && item.from !== userStore.userId" class="msg msg-from">
      <van-image :src="item.fromAvatar" />
      <div class="content">
        <div class="time">{{ formatTime(item.createTime) }}</div>
        <van-image fit="contain" :src="item.msg.picture?.url" />
      </div>
    </div>

  <!-- 处方卡片 -->
  <!-- <div class="msg msg-recipe">
    <div class="content">
      <div class="head van-hairline--bottom">
        <div class="head-tit">
          <h3>电子处方</h3>
          <p>原始处方 <van-icon name="arrow" /></p>
        </div>
        <p>李富贵 男 31岁 血管性头痛</p>
        <p>开方时间：2022-01-15 14:21:42</p>
      </div>
      <div class="body">
        <div v-for="i in 2" :key="i" class="body-item">
          <div class="durg">
            <p>优赛明 维生素E乳</p>
            <p>口服，每次1袋，每天3次，用药3天</p>
          </div>
          <div class="num">x1</div>
        </div>
      </div>
      <div class="foot"><span>购买药品</span></div>
    </div>
  </div> -->

  <!-- 评价卡片，后期实现 -->
  </template>
</template>

<script setup lang="ts">
import type { Message, Prescription } from '@/types/room';
import { MsgType } from '@/enums';
import type { Image } from '@/types/consult';
import { showImagePreview, showToast } from 'vant';
import dayjs from 'dayjs';
import { getConsultFlagTimeText, getIllnessTimeText } from '@/utils/filterUtil';
import { useUserStore } from '@/stores';

const userStore = useUserStore();

defineProps<{
  list: Message[];
}>();

/**
 * 预览图片
 */
const previewImage = (pictures?: Image[]) => {
  if (pictures && pictures.length) {
    showImagePreview(pictures.map(item => item.url));
  } else {
    showToast('暂无图片');
  }
};

const formatTime = (time: string) => dayjs(time).format('HH:mm');
</script>

<style lang="scss" scoped>
@import '@/styles/room.scss';
</style>
