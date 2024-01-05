<template>
  <div class="login-page">
    <NavBar title="登录" right-text="注册" @clickRightEvt="onClickRightEvt" />

    <!-- 头部 -->
    <div class="login-head">
      <h3>密码登录</h3>
      <a href="javascript:;">
        <span>短信验证码登录</span>
        <van-icon name="arrow" />
      </a>
    </div>

    <!-- 表单 -->
    <van-form @submit="submitUserLogin">
      <van-field v-model="mobile" :rules="mobileRules" name="mobile" placeholder="请输入手机号" type="tel" />
      <van-field v-model="password" :rules="passwordRules" placeholder="请输入密码" type="password">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>

      <div class="cp-cell">
        <van-checkbox v-model="agreeProtocol">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>

    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { mobileRules, passwordRules, codeRules } from '@/utils/ruleUtil';
import { useUserStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';
import { useRoute, useRouter } from 'vue-router';
import { showToast, showSuccessToast } from 'vant';

const userStore = useUserStore();

const proxy = useProxyHook();
const router = useRouter();
const route = useRoute();

// 手机号 13230000001 - 13230000100
// 密码 abc12345
let mobile = ref<string>('');
let password = ref<string>('');
let code = ref<string>('');
let agreeProtocol = ref<boolean>(false);

// 控制密码是否显示
// let show = ref<boolean>(false);

onMounted(() => {
  console.log(route);
});

// 组件卸载的时候需要清空定时器,防止内存泄漏
onUnmounted(() => {});

const onClickRightEvt = () => {
  console.log('fn');
};

/**
 * 用户登录 (分为账号密码登录和验证码登录)
 */
const submitUserLogin = async () => {
  if (!agreeProtocol.value) return showToast('请勾选协议');
  
  console.log('提交');
  const { data: loginData } = await proxy.$api.userLoginByPasswordApi({ mobile: mobile.value, password: password.value });
  console.log(loginData);
  // 设置个人信息数据
  userStore.setUserAction(loginData);
  showSuccessToast('登录成功');
  router.replace(route.query.redirect as string || '/index');
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
