<template>
  <NavBar title="病情描述" />

  <div class="consult-illness-page">
    <!-- 医生提示 -->
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助</p>
        <p class="safe">
          <SvgIcon name="consult-safe" />
          <span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 表单 -->
    <div class="illness-form">
      <van-field v-model="form.illnessDesc" type="textarea" rows="3" placeholder="请详细描述您的病情,病情描述不能为空" />

      <div class="item">
        <p>本次患病多久了?</p>
        <radioBtn v-model="form.illnessTime" :radio-options="timeOptions" />
      </div>

      <div class="item">
        <p>此次病情是否去医院就诊过？</p>
        <radioBtn v-model="form.consultFlag" :radio-options="flagOptions" />
      </div>
      <div class="item">
        <ImgUpload ref="imageUpdateRef" @uploadSucEvt="onUploadSucEvt" @deleteSucEvt="onDeleteSuccess" />
      </div>
      
      <!-- 下一步 -->
      <van-button :class="{ disabled }" type="primary" block round @click="nextStep"> 下一步 </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useConsultStore } from '@/stores';
import type { ConsultIllness } from '@/types/consult';
import { flagOptions, timeOptions } from '@/consts';
import type { Image } from '@/types/consult';
import { showConfirmDialog, showToast } from 'vant';
import type { UploaderFileListItem } from 'vant/lib/uploader/types';
import ImgUpload from '@/components/ImgUpload/ImgUpload.vue';

const router = useRouter();
const consultStore = useConsultStore();

// 病情描述 表单
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
});

// 是否禁止下一步
const disabled = computed(() => !form.value.illnessDesc || form.value.illnessTime === undefined || form.value.consultFlag === undefined);

// 患者表单 实例
const imageUpdateRef = ref<InstanceType<typeof ImgUpload> | null>(null);

onMounted(() => {
  // 数据的回显
  if (consultStore.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复您之前填写的病情信息呢?',
      confirmButtonColor: 'var(--cp-primary)',
      closeOnPopstate: false
    }).then(() => {
      // 点击确认
      const { illnessDesc, illnessTime, consultFlag, pictures } = consultStore.consult;
      form.value = { illnessDesc, illnessTime, consultFlag, pictures };
      // 图片如果传了,也得回显
      imageUpdateRef.value?.setFileList(pictures || []);
    });
  }
});

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
  if (form.value.illnessTime === undefined) return showToast('请选择症状的持续时间');
  if (form.value.consultFlag === undefined) return showToast('请选择是否就诊过');

  // 数据存到store
  consultStore.setIllnessAction(form.value);
  // 跳转，携带标识
  router.push('/user/patient?isChange=1');
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
