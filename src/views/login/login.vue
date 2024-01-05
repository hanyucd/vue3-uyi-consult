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
    <van-form autocomplete="off">
      <van-field placeholder="请输入手机号" type="tel" />
      <van-field placeholder="请输入密码" type="password" />
      <div class="cp-cell">
        <van-checkbox>
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary">登 录</van-button>
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

const onClickRightEvt = () => {
  console.log('fn');
};
</script>

<style lange="scss" scoped>
@import './style.scss';
</style>
