<template>
  <div class="login-page">
    <NavBar title="登录" right-text="注册" @clickRightEvt="onClickRightEvt" />

    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPasswordLogin ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPasswordLogin = !isPasswordLogin">
        <span>{{ !isPasswordLogin ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow" />
      </a>
    </div>

    <!-- 表单 -->
    <van-form ref="loginFormRef" autocomplete="off" @submit="submitUserLogin">
      <!-- 手机号 -->
      <van-field v-model="mobile" :rules="mobileRules" type="tel" name="mobile" placeholder="请输入手机号" />
      <!-- 密码 -->
      <van-field v-if="isPasswordLogin" v-model="password" :type="isLookPassword ? 'text' : 'password'" :rules="passwordRules" placeholder="请输入密码">
        <template #button>
          <SvgIcon :name="`login-eye-${ isLookPassword ? 'on' : 'off'}`" style="margin-right: 10px" @click="isLookPassword = !isLookPassword" />
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field v-else v-model="code" :rules="codeRules" placeholder="短信验证码">
        <template #button>
          <span class="btn-send" :class="{ active: smsTime > 0 }" @click="sendSMScode">
            {{ smsTime > 0 ? `${ smsTime }s后再次发送` : '发送验证码' }}
          </span>
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

    <svg aria-hidden="true" class="cp-icon">
      <use href="#icon-consult-alipay" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { mobileRules, passwordRules, codeRules } from '@/utils/ruleUtil';
import { useUserStore } from '@/stores';
import useProxyHook from '@/hooks/useProxyHook';
import { useMobileHook } from '@/hooks/useUserHook';
import { useRoute, useRouter } from 'vue-router';
import { showToast, showSuccessToast } from 'vant';

// 手机号 13230000001 - 13230000100
// 密码 abc12345
const mobile = ref<string>(''); // 手机号
const password = ref<string>(''); // 密码
const code = ref<string>(''); // 验证码
const agreeProtocol = ref<boolean>(false); // 是否同意协议
const isPasswordLogin = ref<boolean>(true); // 是否密码登录
const isLookPassword = ref<boolean>(false); // 是否查看密码

const router = useRouter();
const route = useRoute();
const proxy = useProxyHook();
const userStore = useUserStore();
const { loginFormRef, smsTime, sendSMScode } = useMobileHook(mobile);

onMounted(() => {
  // console.log(route);
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
  
  // 校验通过，进行登录/验证码登录
  const { data: loginedData } = isPasswordLogin.value
    ? await proxy.$api.userLoginByPasswordApi({ mobile: mobile.value, password: password.value })
    : await proxy.$api.userLoginBySMSApi({ mobile: mobile.value, code: code.value });

  // console.log(loginedData);
  // 设置个人信息数据
  userStore.setUserAction(loginedData);
  showSuccessToast('登录成功');
  // 如果有回跳的页面就进进入首页
  router.replace(route.query.redirect as string || '/index');
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
