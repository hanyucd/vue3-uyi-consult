<template>
  <NavBar title="选择药品" />

  <div class="consult-choose-page">
    <van-search
      v-model="searchValue"
      show-action
      placeholder="搜一搜: 药品名称"
      @search="onSearch"
      @cancel="onCancel"
    />

    <!-- 药品列表 -->
    <medicine-list :keyword="keyword" />

    <!-- 药品底部操作 -->
    <medicine-action />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MedicineList from './components/MedicineList/MedicineList.vue';
import MedicineAction from './components/MedicineAction/MedicineAction.vue';

const searchValue = ref('');

const keyword = ref('');
const onSearch = () => {
  keyword.value = searchValue.value;
};

const onCancel = () => {
  keyword.value = '';
};
</script>

<style lange="scss">
@import './style.scss';
</style>
