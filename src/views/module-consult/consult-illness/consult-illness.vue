<template>
  <NavBar title="病情描述" />

  <div class="consult-illness-page">
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe">
          <SvgIcon name="consult-safe" />
          <span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 表单 -->
    <div class="illness-form">
      <van-field v-model="form.illnessDesc" type="textarea" rows="3" placeholder="请详细描述您的病情,病情描述不能为空" />

      <div class="item">
        <p>本次患病多久了?</p>
        <radioBtn v-model="form.illnessTime" :radio-options="timeOptions" />
      </div>

      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <radioBtn v-model="form.consultFlag" :radio-options="flagOptions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ConsultIllness } from '@/types/consult';
import { flagOptions, timeOptions } from '@/consts';

// 病情描述 表单
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
});
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
