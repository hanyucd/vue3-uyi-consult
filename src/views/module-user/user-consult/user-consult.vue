<template>
  <NavBar title="问诊记录" />

  <div class="consult-page">
    <van-tabs sticky>
      <van-tab title="极速问诊">
        <consult-list :type="ConsultTypeEnum.Fast" />
      </van-tab>
      
      <van-tab title="找医生">
        <consult-list :type="ConsultTypeEnum.Doctor" />
      </van-tab>

      <van-tab title="开药问诊">
        <consult-list :type="ConsultTypeEnum.Medication" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import ConsultList from './components/ConsultList/ConsultList.vue';
import { ConsultTypeEnum } from '@/enums';

</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
