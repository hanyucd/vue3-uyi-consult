<template>
  <NavBar />

  <div v-if="isBind" class="login-page">
    <div class="login-head">
      <h3>手机绑定</h3>
    </div>

    <van-form ref="loginFormRef" autocomplete="off" @submit="bindMobile">
      <van-field
        v-model="mobile"
        :rules="mobileRules"
        name="mobile"
        placeholder="请输入手机号"
      />
      <van-field v-model="code" :rules="codeRules" name="code" placeholder="请输入验证码">
        <template #button>
          <span class="btn-send" :class="{ active: smsTime > 0 }" @click="sendSMScode">{{
            smsTime > 0 ? `${smsTime}s后再次发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit"> 立即绑定 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
/* global QC */

import { onMounted, ref } from 'vue';
import type { User } from '@/types/user';
import { useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';

import { useMobileHook } from '@/hooks/useUserHook';
import { mobileRules, codeRules } from '@/utils/ruleUtil';

import useProxyHook from '@/hooks/useProxyHook';

const proxy = useProxyHook();
const router = useRouter();
const userStore = useUserStore();

// 1. 获取openId
const openId = ref('');
const isBind = ref(false);

onMounted(() => {
  console.log(QC.Login.check());
  
  if (QC.Login.check()) {
    QC.Login.getMe((id) => {
      console.log('QQ互联ID：', id);
      openId.value = id;

      proxy.$api.userLoginByQQApi(openId.value)
        .then(res => {
          // 登录成功的话直接跳走
          console.log('登录成功了,只不过现在没跳转', id);

          _loginSuccess(res.data!);
        })
        .catch(error => {
          // 登录失败
          console.log('登录失败了', error);
          isBind.value = true;
        });
    });
  }
}); 

const mobile = ref('');
const code = ref('');

/**
 * 绑定手机号
 */
const bindMobile = async () => {
  const res = await proxy.$api.userBindMobileApi({
    mobile: mobile.value,
    code: code.value,
    openId: openId.value
  });
  
  console.log('绑定', res);
  _loginSuccess(res.data!);
};

/**
 * 登录成功-保存用户信息
 */
const _loginSuccess = (data: User) => {
  userStore.setUserAction(data);
  router.replace(userStore.returnUrl || '/user');
  userStore.setReturnUrlAction('');

  showToast('登录成功');
};

const { loginFormRef, smsTime, sendSMScode } = useMobileHook(mobile, 'bindMobile');
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
