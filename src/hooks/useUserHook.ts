import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import { showImagePreview, showSuccessToast, showFailToast, type FormInstance } from 'vant';
import type { CodeType } from '@/types/user';
import type { FollowType, ConsultOrderItem } from '@/types/consult';
import api from '@/api';

// 命名规范 useXxx  表示使用某功能

/**
 * 发送短信验证码
 */
export const useMobileHook = (mobile: Ref<string>, type: CodeType = 'login') => {
  // form 实例
  const loginFormRef = ref<FormInstance>();
  // 发送验证码 倒计时
  const smsTime = ref(0);
  // 定时器Id 用于后续清除定时器
  let timer: number;
  
  // 发送验证码
  const sendSMScode = async () => {
    // 验证：倒计时 手机号
    if (smsTime.value > 0) return;
    await loginFormRef.value?.validate('mobile');
    await api.sendMobileSMSApi({ mobile: mobile.value, type });
    showSuccessToast('发送验证码成功');
    smsTime.value = 60;

    if (timer) clearTimeout(timer);
    timer = window.setInterval(() => {
      smsTime.value--;
      if (smsTime.value <= 0) clearInterval(timer);
    }, 1000);
  };

  onUnmounted(() => {
    window.clearInterval(timer);
  });
  
  return {
    loginFormRef,
    smsTime,
    sendSMScode
  };
};

/**
 * 关注
 */
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false);

  const follow = async (obj: { id: string; likeFlag: 0 | 1 }) => {
    try {
      await api.followOrUnfollowApi({ id: obj.id, type });
      obj.likeFlag = obj.likeFlag === 1 ? 0 : 1;
    } finally {
      loading.value = false;
    }
  };

  return { loading, follow };
};
