<template>
  <div class="room-action">
    <van-field
      v-model="text"
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      :disabled="disabled"
      @keyup.enter="enterSendText"
    />
    <van-uploader :preview-image="false" :disabled="disabled" :after-read="enterSendImage">
      <SvgIcon name="consult-img" />
    </van-uploader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Image } from '@/types/consult';
import type { UploaderAfterRead } from 'vant/lib/uploader/types';
import { showLoadingToast } from 'vant';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();

defineProps<{
  disabled: boolean;
}>();

const emit = defineEmits<{
  sendText: [text: string];
  sendImage: [image: Image];
}>();

const text = ref('');

/**
 * 发送文字 
 */
const enterSendText = () => {
  emit('sendText', text.value);
  text.value = '';
};

/**
 * 发送图片
 */
const enterSendImage: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return;
  if (!item.file) return;
  const t = showLoadingToast('正在上传');

  const fd = new FormData();
  fd.append('file', item.file);
  // 上传图片
  proxy.$api.uploadImageApi(fd)
    .then((res: any) => {
      item.status = 'done';
      item.message = undefined;
      
      // console.log(res);
      emit('sendImage', res.data);
    })
    .catch((error: any) => {
      console.log(error);
      item.status = 'failed';
      item.message = '上传失败';
    })
    .finally(() => {
      t.close();
    });
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
