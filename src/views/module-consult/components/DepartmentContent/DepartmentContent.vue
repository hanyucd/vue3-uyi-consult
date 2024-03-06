<template>
  <div class="department-content">
    <div class="department-header">
      <p class="title-text">按科室找医生</p>
      <p class="all-link" @click="show = true">
        全部科室
        <van-icon name="arrow" />
      </p>
    </div>
    <div class="department-list">
      <div v-for="item in showDepts" :key="item.id" class="department-item" @click="goFindDoctorByDepId(item)">
        <img :src="item.avatar" alt="" class="department-icon" /><span
          class="department-name"
        >{{ item.name }}</span>
      </div>
    </div>
  </div>

  <van-action-sheet v-model:show="show" title="全部科室">
    <div class="content">
      <div v-for="item in depts" :key="item.id">
        <div v-if="item.child.length > 0">
          <p class="department-header">{{ item.name }}</p>
          <div class="mb-20">
            <span v-for="sub in item.child" :key="sub.id" class="department-text" @click="goFindDoctorByDepId(sub)">{{ sub.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { useConsultStore } from '@/stores';
import type { SubDep, TopDep } from '@/types/consult';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  depts: TopDep[];
}>();

const consultStore = useConsultStore();
const router = useRouter();

const showDepts = computed(() => props.depts[0]?.child || []);
const show = ref(false);

const goFindDoctorByDepId = (item: SubDep) => {
  consultStore.setConsultDepAction(item.id);
  router.push(`/doctorList/${item?.id}?department=${item?.name}`);
};
</script>

<style lange="scss">
@import './style.scss';
</style>
