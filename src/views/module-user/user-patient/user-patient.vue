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

      <div v-if="patientArys.length < 7" class="patient-add" @click="openPatientPopup()">
        <SvgIcon name="user-add" />
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加 6 人</div>
    </div>

    <!-- 患者 popup 组件 -->
    <van-popup v-model:show="isShowPatientPopup" position="right">
      <NavBar title="添加患者" :back="() => isShowPatientPopup = false" />

      <van-form ref="form" autocomplete="off">
        <van-field v-model="patient.name" label="真实姓名" placeholder="请输入真实姓名" :rules="nameRules" />
        <van-field v-model="patient.idCard" label="身份证号" placeholder="请输入身份证号" :rules="idCardRules" />
        <van-field label="性别" class="pb4">
          <!-- 单选按钮组件 -->
          <template #input>
            <RadioBtn v-model="patient.gender" :radio-options="radioOptions" />
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultPatient" :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import useProxyHook from '@/hooks/useProxyHook';
import type { PatientList, Patient } from '@/types/user';
import { nameRules, idCardRules } from '@/utils/ruleUtil';

const proxy = useProxyHook();
const patientArys = ref<PatientList>([]); // 患者列表

const radioOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
];

// 定义一个格式化的 患者数据
const initPatient: Patient = {
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
};

const patient = ref<Patient>({ ...initPatient });

// 默认患者
const defaultPatient = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false;
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0;
  },
});

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

const isShowPatientPopup = ref(false);

const openPatientPopup = (item?: Patient) => {
  console.log('打开');
  
  // 修改患者
  if (item) {
    console.log('修改');
  // 新增患者
  } else {
    patient.value = { ...initPatient };
  }
  
  isShowPatientPopup.value = true;
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
