<template>
  <div v-if="evaluateDoc" class="evaluate-card">
    <p class="title">医生服务评价</p>
    <p class="desc">我们会更加努力提升服务质量</p>
    <van-rate
      :model-value="evaluateDoc.score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
  </div>
  
  <div v-else class="evaluate-card">
    <p class="title">感谢您的评价</p>
    <p class="desc">本次在线问诊服务您还满意吗？</p>
    <van-rate
      v-model="score"
      size="7vw"
      gutter="3vw"
      color="#FADB14"
      void-icon="star"
      void-color="rgba(0,0,0,0.04)"
    />
    <van-field
      v-model="content"
      type="textarea"
      maxlength="150"
      show-word-limit
      rows="3"
      placeholder="请描述您对医生的评价或是在医生看诊过程中遇到的问题"
    />
    <div class="footer">
      <van-checkbox v-model="anonymousFlag">匿名评价</van-checkbox>
      <van-button :class="{ disabled }" type="primary" size="small" round @click="onSubmit"> 提交评价 </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import type { Ref } from 'vue';
import { showToast } from 'vant';

import type { ConsultOrderItem } from '@/types/consult';
import type { EvaluateDoc } from '@/types/room';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();

defineProps<{
  evaluateDoc?: EvaluateDoc;
}>();

// 注入祖辈 consult-room 组件中的问诊订单
const consult = inject<Ref<ConsultOrderItem>>('consult');
// 注入祖辈 consult-room 组件中的 函数
const completeEva = inject<(score: number) => void>('completeEva');

const score = ref(0);
const content = ref('');
const anonymousFlag = ref(false); // 是否匿名

const disabled = computed(() => !score.value || !content.value);

/**
 * 提交评论
 */
const onSubmit = async () => {
  if (!score.value) return showToast('请选择评分');
  if (!content.value) return showToast('请填写评价');
  if (!consult?.value) return showToast('未找到订单');

  if (consult.value.docInfo?.id) {
    const param = {
      orderId: consult.value.id,
      docId: consult.value.docInfo.id,
      score: score.value,
      content: content.value,
      anonymousFlag: anonymousFlag.value ? 1 : 0
    };
    await proxy.$api.evaluateConsultOrderApi(param);

    // 调取祖辈组件中的方法
    completeEva && completeEva(score.value);
  }  
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
