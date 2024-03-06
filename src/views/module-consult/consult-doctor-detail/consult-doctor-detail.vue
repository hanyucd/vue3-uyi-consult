<template>
  <div v-if="doctor" class="doctor-detail-page">
    <NavBar />
    
    <div class="basic-info-bg">
      <div class="basic-info-content">
        <p class="avator-line">
          <img alt="" class="doctor-avator" :src="doctor.avatar" />
          <van-button class="follow-btn" round size="small" type="primary" :loading="loading" @click="follow(doctor)">
            {{ doctor.likeFlag === 1 ? '已关注' : '+ 关注' }}
          </van-button>
        </p>
        <p class="doctor-line">
          <span class="doctor-name">{{ doctor.name }}</span><span class="dep-info">{{ doctor.depName }} | </span><span class="dep-info">{{ doctor.positionalTitles }}</span>
        </p>
        <p class="hospital-line">
          <span class="grade-name">{{ doctor.gradeName }}</span><span class="hospital-name">{{ doctor.hospitalName }}</span>
        </p>
        <p class="record-list">
          <img src="" alt="" /><span class="score">{{ doctor.score }}</span><span> / 接诊数 </span><span class="score">{{ doctor.consultationNum }}</span>
        </p>
      </div>
    </div>
    <div class="intro-content">
      <p class="intro-title">个人简介</p>
      <p class="intro-pre-title">擅长领域</p>
      <div class="adm-ellipsis intro-desc">
        {{ doctor.major }}
      </div>
    </div>

    <div class="banner-content">
      <div class="banner-box">
        <van-icon name="chat-o" class="banner-icon" size="33px" color="#fff" />
        <div>
          <p>
            <span class="inquire-type">图文问诊</span><span class="price">¥{{ doctor.serviceFee }}/次</span>
          </p>
          <p class="tips">最长24小时图文多次沟通</p>
        </div>
        <span class="consult-btn" @click="askDoctor">去咨询</span>
      </div>
    </div>

    <div class="evaluate-content">
      <div class="evaluate-header">
        <p>
          <span class="evaluate-title">患者评价</span>
          <span class="evaluate-total">(0)</span>
        </p>
        <p>
          <span class="rate-title">评分</span><span class="rate-text">{{ doctor.score }}</span>
        </p>
      </div>
      <div class="no-evaluate">暂无</div>
    </div>

    <div class="article-list">
      <p class="intro-title">他的文章</p>
    </div>

    <div class="bottom-content">
      <van-button type="primary" round size="large" @click="askDoctor">
        咨询医生
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Doctor } from '@/types/consult';
import { useConsultStore } from '@/stores';
import { useFollow } from '@/hooks/useUserHook';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const route = useRoute();
const router = useRouter();
const consultStore = useConsultStore();
const { loading, follow } = useFollow();

// 医生 id
const doctorId = route.params.id as string;
// 医生信息
const doctor = ref<Doctor>();

onMounted(() => {
  loadData();
});

/**
 * 加载医生详情
 */
const loadData = async () => {
  const { data } = await proxy.$api.getDoctorDetailApi({ docId: doctorId });
  doctor.value = data;
};

const askDoctor = () => {
  consultStore.setDocIdAction(doctor.value!.id);
  router.push(`/consult/illness`);
};
</script>

<style lange="scss">
@import './style.scss';
</style>
