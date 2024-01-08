<template>
  <NavBar title="家庭档案" />

  <div class="patient-page">
    <div class="patient-list">
      <div v-for="item in patientArys" :key="item.id" class="patient-item">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            {{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}
          </span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon">
          <SvgIcon name="user-edit" />
        </div>
        <div v-if="item.defaultFlag === 1" class="tag">默认</div>
      </div>

      <div class="patient-add">
        <SvgIcon name="user-add" />
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加 6 人</div>
    </div>

    <RadioBtn v-model="patient.gender" :radio-options="radioOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import useProxyHook from '@/hooks/useProxyHook';
import type { PatientList, Patient } from '@/types/user';

const proxy = useProxyHook();
const patientArys = ref<PatientList>([]); // 患者列表

const radioOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
];

const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
};

const patient = ref<Patient>({ ...initPatient });

onMounted(() => {
  _getPatientList();
});

/**
 * 获取患者列表
 */
const _getPatientList = async () => {
  const { data: patientData } = await proxy.$api.getPatientListApi();
  patientArys.value = patientData;
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
