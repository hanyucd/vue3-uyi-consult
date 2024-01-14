<template>
  <div class="illness-img">
    <van-uploader
      v-model="fileList"
      upload-icon="photo-o"
      upload-text="上传图片"
      max-count="9"
      :max-size="5 * 1024 * 1024"
      :after-read="onAfterRead"
      @delete="onDeleteImg"
    />
    <p v-if="!fileList.length" class="tip">
      上传内容仅医生可见,最多9张图,最大5MB
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { UploaderAfterRead, UploaderFileListItem } from 'vant/lib/uploader/types';
import useProxyHook from '@/hooks/useProxyHook';
import type { Image } from '@/types/consult';

const proxy = useProxyHook();
const fileList = ref<Image[]>([]);

const emit = defineEmits<{
  uploadSucEvt: [img: Image];
  deleteSucEvt: [imgItem: UploaderFileListItem];
}>();

// 图片上传
const onAfterRead: UploaderAfterRead = (item) => {
  if (Array.isArray(item)) return;
  if (!item.file) return;
  
  item.status = 'uploading';
  item.message = '上传中...';
  const fd = new FormData();
  fd.append('file', item.file);
  proxy.$api.uploadImageApi(fd)
    .then((res: any) => {
      item.status = 'done';
      item.message = undefined;
      item.url = res.data.url;
      
      // console.log(res);
      emit('uploadSucEvt', res.data);
    })
    .catch((error: any) => {
      console.log(error);
      item.status = 'failed';
      item.message = '上传失败';
    });
};

// 删除图片
const onDeleteImg = (item: UploaderFileListItem) => {
  emit('deleteSucEvt', item);
};

const setFileList = (val: Image[]) => {
  fileList.value = val;
};

defineExpose({
  setFileList
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
