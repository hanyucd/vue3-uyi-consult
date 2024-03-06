<template>
  <div class="doctor-card" @click="goDoctorDetail">
    <img :src="item.avatar" class="avator" alt="" />
    
    <div class="detail">
      <p>
        <span class="doctor-name">{{ item.name }}</span><span class="doctor-other-info">{{ item.depName }} | {{ item.positionalTitles }}</span>
      </p>
      <p class="hospital-info">
        <span class="hospital-grade">{{ item.gradeName }}</span><span class="hospital-name">{{ item.hospitalName }}</span>
      </p>
      <p class="skill-list">{{ item.major }}</p>
      <p class="record-list">
        <van-icon name="star" color="#fea116" />
        <span class="score">{{ item.score }}</span><span> / 接诊数 </span><span class="count">{{ item.consultationNum }}</span>
      </p>
      <p class="bottom-content">
        <span class="price">¥{{ item.serviceFee }}</span><span class="btn" @click.stop="askDoctor">问医生</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConsultStore } from '@/stores';
import type { Doctor } from '@/types/consult';
import { useRouter } from 'vue-router';

const props = defineProps<{
  item: Doctor;
  grade?: string;
}>();

const router = useRouter();
const consultStore = useConsultStore();

/**
 * 进入医生详情页面
 */
const askDoctor = () => {
  if (props.grade === '9') {
    consultStore.setIllnessTypeAction(1);
  } else {
    consultStore.setIllnessTypeAction(0);
  }

  consultStore.setDocIdAction(props.item.id);
  router.push(`/consult/illness`);
};

/**
 * 进入医生详情页面
 */
const goDoctorDetail = () => {
  if (props.grade === '9') {
    consultStore.setIllnessTypeAction(1);
  } else {
    consultStore.setIllnessTypeAction(0);
  }

  router.push(`/doctorDetail/${props.item.id}`);
};
</script>

<style lange="scss">
@import './style.scss';
</style>
