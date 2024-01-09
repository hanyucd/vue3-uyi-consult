<template>
  <div class="knowledge-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard v-for="item in list" :key="item.id" :item="item" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import KnowledgeCard from '../KnowledgeCard/KnowledgeCard.vue';
import useProxyHook from '@/hooks/useProxyHook';
const proxy = useProxyHook();
import { ref } from 'vue';
import type { KnowledgeType, KnowledgeList, KnowledgeParams } from '@/types/consult';

const props = defineProps<{
  type: KnowledgeType;
}>();

// 加载中状态
const loading = ref(false);
// 是否完全加载完毕数据
const finished = ref(false);
// 数据列表
const list = ref<KnowledgeList>([]);
// 查询参数
const params = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 5
});

const onLoad = async () => {
  const { data } = await proxy.$api.getKnowledgeListApi(params.value);
  list.value.push(...data.rows);

  // 判断已经加载完成了
  if (params.value.current >= data.pageTotal) {
    finished.value = true;
  } else {
    params.value.current++;
  }

  loading.value = false;
};
</script>

<style lange="scss">
@import './style.scss';
</style>
