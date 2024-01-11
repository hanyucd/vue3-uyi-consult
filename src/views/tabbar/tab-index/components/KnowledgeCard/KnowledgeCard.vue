<template>
  <div class="knowledge-card van-hairline--bottom">
    <div class="head">
      <van-image round class="avatar" :src="item.creatorAvatar" />
      <div class="info">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dep van-ellipsis">
          {{ item.creatorHospatalName }}
          {{ item.creatorDep }}
          {{ item.creatorTitles }}
        </p>
      </div>
      <van-button class="btn" size="small" round :loading="loading" @click="follow(item)">
        {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    
    <div class="body">
      <h3 class="title van-ellipsis">
        {{ item.title }}
      </h3>
      <p class="tag">
        <span v-for="(tag, i) in item.topics" :key="i"># {{ tag }}</span>
      </p>
      <p class="intro van-multi-ellipsis--l2">
        {{ item.content.replace(/<[^>]+>/g, '') }}
      </p>
      <div class="imgs" :class="{ large: item.coverUrl.length === 1 }">
        <van-image v-for="(url, i) in item.coverUrl" :key="i" fit="cover" :src="url" @click="previewImage(i, item.coverUrl)" />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }} 收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showImagePreview } from 'vant';
import type { Knowledge } from '@/types/consult';
import { useFollow } from '@/hooks/useUserHook';

defineProps<{
  item: Knowledge;
}>();

const { loading, follow } = useFollow('knowledge');

/**
 * 预览图片
 */
const previewImage = (imageIndex: number, images: Array<string>) => {
  showImagePreview({ startPosition: imageIndex, images, });
};
</script>

<style lange="scss">
@import './style.scss';
</style>
