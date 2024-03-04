<template>
  <!-- 药品底部操作栏 -->
  <van-action-bar>
    <van-action-bar-icon icon="cart-o" :color="cartLength > 0 ? '#323233' : '#eee'" :badge="cartLength" @click="openCart" />
    <div class="total-price">￥ {{ totalPrice }}</div>
    <!-- 
      列表页 申请开放
      详情页 加入药箱
     -->
    <van-action-bar-button v-if="from === 'list'" type="primary" text="申请开方" @click="onAskDocotor" />
    <van-action-bar-button v-else type="primary" text="加入药箱" @click="onAddToCart" />

    <!-- 药品清单抽屉 -->
    <van-action-sheet v-model:show="show">
      <div class="content">
        <div class="content-header">
          <div class="content-header-left">
            <span>药品清单</span><span>共{{ cartLength }}件商品</span>
          </div>
          <div class="content-header-right" @click="clear">
            <van-icon name="delete-o" />
            <span>清空</span>
          </div>
        </div>
        <!-- 列表 -->
        <div class="medicine-list">
          <medicine-card v-for="item in selectedMedicines" :key="item.id" :item="item" />
        </div>
      </div>
      
      <van-action-bar>
        <van-action-bar-icon icon="cart-o" :color="cartLength > 0 ? '#323233' : '#eee'" :badge="cartLength" />
        <div class="total-price">￥ {{ totalPrice }}</div>
        <van-action-bar-button type="primary" text="申请开方" @click="onAskDocotor" />
      </van-action-bar>
    </van-action-sheet>
  </van-action-bar>
</template>

<script setup lang="ts">
import MedicineCard from '../MedicineCard/MedicineCard.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConsultStore } from '@/stores';
import { showDialog, showToast } from 'vant';

const router = useRouter();
const consultStore = useConsultStore();

// Props 解构默认值
withDefaults(defineProps<{ from?: 'list' | 'detail' }>(), { from: 'list' });

const emits = defineEmits<{
  (e: 'addToCart'): void;
}>();

// 已选择药品
const selectedMedicines = computed(() => consultStore.consult.medicines?.filter((item) => +item.quantity > 0) || []); 

// 购物车药品 数量
const cartLength = computed(() => selectedMedicines.value.length || 0);

// 已选择药品总价
const totalPrice = computed(() => {
  return selectedMedicines.value?.reduce((sum, item) => {
      return (sum += +item.amount * +item.quantity);
    }, 0)
    .toFixed(2);
});

const show = ref(false);

/**
 * 打开购物出 popup
 */
const openCart = () => {
  if (cartLength.value === 0) return showToast('请选择药品');
  show.value = true;
};

/**
 * 情况购物车药品
 */
 const clear = () => {
  consultStore.setMedicinesAction([]);
  show.value = false;
};

// TODO:
const onAskDocotor = async () => {};

const onAddToCart = () => {
  emits('addToCart');
};
</script>

<style lange="scss">
@import './style.scss';
</style>
