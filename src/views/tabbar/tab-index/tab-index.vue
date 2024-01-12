<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="con">
        <h1>U医</h1>
        <div class="search">
          <SvgIcon name="home-search" /> 搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>

    <!-- 导航 -->
    <div class="home-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <SvgIcon name="home-doctor" />
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>

        <van-col span="8">
          <router-link to="/consult/fast" class="nav" @click="consultStore.setConsultTypeAction(ConsultTypeEnum.Fast)">
            <SvgIcon name="home-graphic" />
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        
        <van-col span="8">
          <router-link to="/" class="nav">
            <SvgIcon name="home-prescribe" />
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <SvgIcon name="home-order" />
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        
        <van-col span="6">
          <router-link to="/" class="nav min">
            <SvgIcon name="home-docs" />
            <p class="title">健康档案</p>
          </router-link>
        </van-col>

        <van-col span="6">
          <router-link to="/" class="nav min">
            <SvgIcon name="home-rp" />
            <p class="title">我的处方</p>
          </router-link>
        </van-col>

        <van-col span="6">
          <router-link to="/" class="nav min">
            <SvgIcon name="home-find" />
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </div>

    <!-- 轮播 -->
    <div class="home-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-tabs v-model:active="active" shrink sticky>
      <van-tab title="关注">
        <RecommendDoctor />

        <KnowledgeList type="like" />
      </van-tab>
      <van-tab title="推荐">
        <KnowledgeList type="recommend" />
      </van-tab>
      <van-tab title="减脂">
        <KnowledgeList type="fatReduction" />
      </van-tab>
      <van-tab title="饮食">
        <KnowledgeList type="food" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import KnowledgeList from './components/KnowledgeList/KnowledgeList.vue';
import RecommendDoctor from './components/RecommendDoctor/RecommendDoctor.vue';
import { ref } from 'vue';
import { useConsultStore } from '@/stores';
import { ConsultTypeEnum } from '@/enums';

const consultStore = useConsultStore();
// active 的值是 tab 的索引
const active = ref(0);

</script>

<style lange="scss">
@import './style.scss';
</style>
