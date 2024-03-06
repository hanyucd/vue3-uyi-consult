<template>
  <NavBar :title="department" />
  
  <div class="doctor-list-page">
    <div class="search">
      <cp-icon name="home-search" /> 搜一搜：医生/疾病名称
    </div>

    <!-- 区域 -->
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item title="区域">
        <div class="wrapper">
          <van-sidebar v-model="active">
            <van-sidebar-item v-for="item in areas" :key="item.id" :title="item.name" />
          </van-sidebar>
          <div class="sub">
            <span v-for="city in citys" :key="city.id" @click="selectCity(city.id)">
              <span>{{ city.name }}</span>
              <van-icon v-if="city.id === provinceId" name="success" />
            </span>
          </div>
        </div>
      </van-dropdown-item>
      
      <van-dropdown-item v-model="order" :options="options" />

      <van-dropdown-item ref="itemRef" title="筛选">
        <div class="find-doctor-form">
          <div class="item">
            <p>医院等级</p>
            <RadioBtn v-model="form.grade" :radio-options="gradeOptions" />
          </div>
          <div class="item">
            <p>医生职称</p>
            <RadioBtn v-model="form.positionalTitles" :radio-options="positionalTitlesOptions" />
          </div>
          <div class="item">
            <p>价格区间</p>
            <RadioBtn v-model="form.priceRange" :radio-options="priceRangeOptions" />
          </div>
          <van-button round class="reset-btn" @click="onReset">重置</van-button>
          <van-button round type="primary" class="confirm-btn" @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>

    <!-- 医生列表组件 -->
    <doctor-list
      :dep-id="depId"
      :order="order"
      :province-id="provinceId"
      :grade="grade"
      :positional-titles="positionalTitles"
      :price-range="priceRange"
    />
  </div>
</template>

<script lang="ts" setup>
import DoctorList from '../components/DoctorList/DoctorList.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { gradeOptions, positionalTitlesOptions, priceRangeOptions } from '@/consts';
import type { Area, DoctorOrderType } from '@/types/consult';
import type { PositionalTitles, PriceRange } from '@/enums';
import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const route = useRoute();

// 科室名称
const department = (route.query.department || '找医生') as string;
// 科室 id
const depId = route.params.depId as string;
// 排序选项
const options = [
  { text: '综合排序', value: 'default_ascend' },
  { text: '评分', value: 'score_ascend' },
  { text: '咨询量', value: 'consultationNum_ascend' },
  { text: '价格', value: 'serviceFee_ascend' }
];

const menuRef = ref(null);
const itemRef = ref();
// 选中的排序值
const order = ref<DoctorOrderType>('default_ascend');

const grade = ref<string>();
const positionalTitles = ref<PositionalTitles>();
const priceRange = ref<PriceRange>();

const provinceId = ref('100000');
// 选中的省份下标
const active = ref(0);
// 地区列表
const areas = ref<Area[]>([]);

// 城市
const citys = computed(() => {
  const parent = areas.value[active.value];
  const result = parent?.citys || [];
  return [
    { id: parent.id, parentId: parent.parentId, name: '全部' },
    ...result
  ];
});

onMounted(async () => {
  const { data } = await proxy.$api.getAllAreaApi();
  areas.value = [
    { id: '100000', parentId: '', name: '全部' },
    ...data
  ];
});

// 过滤医生表单类型
type FindDoctorForm = {
  grade?: string;
  positionalTitles?: PositionalTitles;
  priceRange?: PriceRange;
};

// 初始化表单
const initForm: FindDoctorForm = {
  grade: undefined,
  positionalTitles: undefined,
  priceRange: undefined
};

const form = ref<FindDoctorForm>({ ...initForm });

/**
 * 选择城市
 */
const selectCity = (id: string) => {
  provinceId.value = id;
};

/**
 * 重置表单
 */
const onReset = () => {
  form.value = { ...initForm };
};

/**
 * 确认
 */
const onConfirm = () => {
  grade.value = form.value.grade;
  positionalTitles.value = form.value.positionalTitles;
  priceRange.value = form.value.priceRange;
  itemRef.value?.toggle();
  // 或者
  // menuRef.value.close()
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
