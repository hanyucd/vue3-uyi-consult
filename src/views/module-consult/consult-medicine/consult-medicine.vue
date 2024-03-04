<template>
  <NavBar title="开药门诊" right-text="问诊记录" @click-right="$router.push('/user/consult')" />
  
  <div class="consult-medicine-page">
    <van-notice-bar text="请如实填写资料以便医生了解您的病情和用药需求" />

    <div class="illness-form">
      <div class="adm-list-header">症状描述</div>
      <van-field v-model="form.illnessDesc" type="textarea" rows="3" placeholder="请输入所患疾病名称" />

      <div class="adm-list-header">用药人身体情况</div>
      <div class="item">
        <p>肝功能</p>
        <radioBtn v-model="form.liverFunction" :radio-options="liverFunctionOptions" />
      </div>

      <div class="item">
        <p>肾功能</p>
        <radioBtn v-model="form.renalFunction" :radio-options="renalFunctionOptions" />
      </div>

      <div class="item">
        <p>过敏史</p>

        <radioBtn v-model="form.allergicHistory" :radio-options="allergicHistoryOptions" />
      </div>
      <div class="item">
        <p>生育状态及计划</p>
        <radioBtn v-model="form.fertilityStatus" :radio-options="fertilityStatusOptions" />
      </div>

      <div class="adm-list-header">补充病例信息</div>
      <!-- 上传组件 -->

      <ImgUpload ref="imageUpdateRef" @uploadSucEvt="onUploadSucEvt" @deleteSucEvt="onDeleteSuccess" />
      
      <!-- 下一步 -->
      <van-button :class="{ disabled }" type="primary" block round @click="nextStep">
        下一步
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { liverFunctionOptions, allergicHistoryOptions, fertilityStatusOptions, renalFunctionOptions } from '@/consts';
import type { MedicineIllness, Image } from '@/types/consult';
import { showToast, type UploaderFileListItem } from 'vant';

import { useConsultStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const router = useRouter();
const consultStore = useConsultStore();

// 开药问诊表单
const form = ref<MedicineIllness>({
  illnessDesc: '',
  liverFunction: undefined,
  renalFunction: undefined,
  allergicHistory: undefined,
  fertilityStatus: undefined,
  pictures: []
});

const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.liverFunction === undefined ||
    form.value.renalFunction === undefined ||
    form.value.allergicHistory === undefined ||
    form.value.fertilityStatus === undefined
);

/**
 * 监听 上传图片成功 事件
 */
 const onUploadSucEvt = (imageItem: Image) => {
  form.value.pictures?.push(imageItem);
};

/**
 * 监听 删除图片 事件
 */
const onDeleteSuccess = (image: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter((pic) => pic.url !== image.url);
};

/**
 * 下一步
 */
const nextStep = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述');

  if (form.value.liverFunction === undefined) return showToast('请选择肝功能情况');
  if (form.value.renalFunction === undefined) return showToast('请选择肾功能情况');
  if (form.value.allergicHistory === undefined) return showToast('请选择过敏史情况');
  if (form.value.fertilityStatus === undefined) return showToast('请选择生育状态及计划');

  consultStore.setMedicineIlnessAction(form.value);
  // 进入选择患者
  router.push('/user/patient?isChange=1&from=medicineConsult');
};
</script>

<style lange="scss">
@import './style.scss';
</style>
