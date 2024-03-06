<template>
  <NavBar title="找医生" right-text="问诊记录" @click-right="$router.push('/user/consult')" />

  <div class="consult-doctor-page">
    <div class="search">
      <cp-icon name="home-search" /> 搜一搜：医生/疾病名称
    </div>
    <div class="quick-inquary-banner">
      <div class="left-content">
        <van-icon name="chat-o" size="33" />
        <div>
          <p class="solgan">快速问医 无需等待</p>
          <p class="tips">2w+名医在线问诊</p>
        </div>
      </div>
      <span
        class="inquary-btn"
        @click="consultStore.setConsultTypeAction(ConsultTypeEnum.Fast) && $router.push('/consult/fast') "
      >去咨询</span>
    </div>

    <!-- 科室搜索  -->
    <department-content :depts="depts" />

    <div class="famous-doctor-list">
      <div>
        <p class="title-text">名医推荐</p>
        <p class="sub-title">获取更多诊疗建议</p>
      </div>

      <van-tabs shrink sticky>
        <van-tab v-for="item in allDepts" :key="item.id" :title="item.name">
          <doctor-list :dep-id="item.id" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import DepartmentContent from '../components/DepartmentContent/DepartmentContent.vue';
import DoctorList from '../components/DoctorList/DoctorList.vue';
import { ref, computed, onMounted } from 'vue';
import type { TopDep } from '@/types/consult';
import { ConsultTypeEnum } from '@/enums';
import { useConsultStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const consultStore = useConsultStore();

const depts = ref<TopDep[]>([]); // 所有科室

// 拉平子数组
const allDepts = computed(() =>
  depts.value.map((item) => item?.child || []).flat()
);

onMounted(() => {
  _loadAllDepts();
});

/**
 * 加载所有科室
 */
const _loadAllDepts = async () => {
  const { data: depData } = await proxy.$api.getAllDepApi();
  depts.value = depData;
};
</script>

<style lange="scss">
@import './style.scss';
</style>
