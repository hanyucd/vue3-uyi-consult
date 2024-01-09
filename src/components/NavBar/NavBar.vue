<template>
  <van-nav-bar fixed :title="title" :right-text="rightText" left-arrow @click-left="onClickLeftEvt" @click-right="onClickRightEvt" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

interface IProps {
  title?: string;
  rightText?: string;
  back?: () => void;
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  clickRightEvt: [];
}>();

/**
 * 点击右侧按钮
 */
const onClickRightEvt = () => {
  emit('clickRightEvt');
};

/**
 * 点击左侧按钮
 */
const onClickLeftEvt = () => {
  if (props.back) return props.back();
  
  // 判断一下历史记录里可不可以回退
  if (history.state.back) {
    router.back();
  } else {
    // 没有历史记录就跳到首页
    router.push('/');
  }
  
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
