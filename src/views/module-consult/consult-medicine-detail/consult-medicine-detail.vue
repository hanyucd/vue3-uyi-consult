<template>
  <div v-if="detail" class="medicine-detail-page">
    <NavBar :title="detail.name" />

    <!-- 主图片 -->
    <van-swipe indicator-color="#fff">
      <van-swipe-item v-for="(item, index) in detail.mainPictures" :key="index">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>

    <div class="detail-top">
      <div class="info">
        <p class="name">
          <span>{{ detail.name }}</span>
        </p>
        <p class="size">
          <van-tag v-if="detail.prescriptionFlag === 1">处方药</van-tag>
          <span>{{ detail.specs }}</span>
        </p>
        <p class="price">￥{{ detail.amount }}</p>
      </div>
    </div>

    <div class="pay-space"></div>

    <div class="detail-bottom">
      <div class="info-item">
        <div class="info-title">药品名称</div>
        <div class="info-desc">{{ detail.name }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">品牌</div>
        <div class="info-desc">{{ detail.brand }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">功能主治</div>
        <div class="info-desc">{{ detail.indicationsFunction }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">不良反应</div>
        <div class="info-desc">{{ detail.untowardReaction }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">禁忌</div>
        <div class="info-desc">{{ detail.contraindication }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">注意事项</div>
        <div class="info-desc">{{ detail.preparation }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">有效期</div>
        <div class="info-desc">{{ detail.expiration }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">执行标准</div>
        <div class="info-desc">{{ detail.standard }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">批准文号</div>
        <div class="info-desc">{{ detail.approvalNo }}</div>
      </div>
      <div class="info-item">
        <div class="info-title">生产企业</div>
        <div class="info-desc">{{ detail.manufacturer }}</div>
      </div>
    </div>

    <medicine-action from="detail" @add-to-cart="onAddToCart" />
  </div>
</template>

<script setup lang="ts">
import MedicineAction from '../components/MedicineAction/MedicineAction.vue';
import { useConsultStore } from '@/stores';
import type { MedicineDetail } from '@/types/consult';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const route = useRoute();
const consultStore = useConsultStore();

const id = computed(() => route.params.id); // 药品 id
const detail = ref<MedicineDetail>();

onMounted(() => {
  loadDetail();
});

/**
 * 药品详情
 */
const loadDetail = async () => {
  const { data } = await proxy.$api.getMedicineDetailApi(id.value as string);
  detail.value = data;
};

const onAddToCart = () => {
  const medicines = consultStore.consult.medicines || [];
  const medicine = medicines?.find((item) => item.id === detail.value?.id);

  if (medicine) {
    medicine.quantity = String(+medicine.quantity + 1);
  } else {
    medicines.push({
      amount: detail.value!.amount,
      avatar: detail.value!.avatar,
      id: detail.value!.id,
      name: detail.value!.name,
      prescriptionFlag: detail.value!.prescriptionFlag,
      specs: detail.value!.specs,
      usageDosag: detail.value!.usageDosag,
      quantity: '1'
    });
  }
  consultStore.setMedicinesAction(medicines);
};
</script>

<style lange="scss">
@import './style.scss';
</style>
