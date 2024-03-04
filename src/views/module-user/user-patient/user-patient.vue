<template>
  <NavBar :title="isChange ? '选择患者' : '家庭档案'" />

  <div class="patient-page">
    <!-- 头部提示 -->
    <div v-if="isChange" class="patient-change">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>
    
    <div class="patient-list">
      <div v-for="item in patientArys" :key="item.id" class="patient-item" :class="{ selected: patientId === item.id }" @click="selectPatient(item)">
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">
            {{ item.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}
          </span>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </div>
        <div class="icon" @click.stop="openPatientPopup(item)">
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

    <!-- 底部按钮 -->
    <div v-if="isChange" class="patient-next">
      <van-button type="primary" round block @click="nextStep">下一步</van-button>
    </div>

    <!-- 患者 popup 组件 -->
    <van-popup v-model:show="isShowPatientPopup" position="right">
      <NavBar :title="patient.id ? '编辑患者' : '添加患者'" right-text="保存" :back="() => isShowPatientPopup = false" @clickRightEvt="onSavePatientEvt" />

      <van-form ref="patientFormRef" autocomplete="off">
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
      <!-- 删除按钮 -->
      <van-action-bar v-if="patient.id">
        <van-action-bar-button text="删除" @click="deletePatient" />
      </van-action-bar>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConsultStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';
import type { PatientList, Patient } from '@/types/user';
import { nameRules, idCardRules } from '@/utils/ruleUtil';
import { showConfirmDialog, showSuccessToast, showToast, type FormInstance } from 'vant';

const route = useRoute();
const router = useRouter();
const consultStore = useConsultStore();
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
  patientArys.value = patientData!;

  // 如果是选择患者页面 并且有患者信息 需要设置默认选中病人
  if (isChange.value && patientArys.value.length) {
    const defPatient = patientArys.value.find(item => item.defaultFlag === 1);
    // 选中规则 有默认选中默认的, 没有默认的选中数组第一个
    patientId.value = defPatient ? defPatient.id! : patientArys.value[0].id!;
  }
};

// 是否显示患者 popup
const isShowPatientPopup = ref(false);

/**
 * 打开患者 popup
 */
const openPatientPopup = (item?: Patient) => {
  // 修改患者
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item;
    patient.value = { id, gender, name, idCard, defaultFlag };
  // 新增患者
  } else {
    patientFormRef.value?.resetValidation();
    patient.value = { ...initPatient };
  }
  
  isShowPatientPopup.value = true;
};

// 患者表单 实例
const patientFormRef = ref<FormInstance>();

/**
 * 保存患者事件
 */
const onSavePatientEvt = async () => {
  // 表单整体校验 validate 进行校验
  await patientFormRef.value?.validate();
  // 取出身份证倒数第二位，%2之后  1 男  0 女
  const gender = +patient.value.idCard.slice(-2, -1) % 2;
  if (gender !== patient.value.gender) {
    await showConfirmDialog({ title: '温馨提示', message: '填写的性别和身份证上的不一致\n您确认提交吗？', showConfirmButton: false });
  }

  // 提交即可 编辑 或者 添加
  patient.value.id
    ? await proxy.$api.updatePatientInfoApi(patient.value)
    : await proxy.$api.addPatientInfoApi(patient.value);

  isShowPatientPopup.value = false;
  _getPatientList();
  showSuccessToast(patient.value.id ? '编辑成功' : '添加成功');
};

/**
 * 删除患者
 */
const deletePatient = async () => {
  if (patient.value.id) {
    // 确认框，删除请求，关闭，加载，提示
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认删除 ${ patient.value.name } 患者信息？`
    });
    await proxy.$api.delPatientApi(patient.value.id);
    isShowPatientPopup.value = false;
    _getPatientList();
    showSuccessToast('删除成功');
  }
};

// isChange如果为true  那么就是选择患者页面
const isChange = computed(() => route.query.isChange === '1');
// 是否来自开药门诊
const fromMedicineConsultFlag = computed(() => route.query.from === 'medicineConsult');

// 选择效果
const patientId = ref('');

/**
 * 选择患者
 */
const selectPatient = (item: Patient) => {
  if (!isChange.value) return;
  patientId.value = item.id!;
};

// 选择患者 下一步
const nextStep = () => {
  if (!patientId.value) return showToast('请选择患者');
  consultStore.setPatientAction(patientId.value);
  if (fromMedicineConsultFlag.value) {
    router.push('/consult/choose');
  } else {
    router.push('/consult/pay');
  }
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
