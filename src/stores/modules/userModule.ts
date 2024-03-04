import { defineStore } from 'pinia';
import type { User } from '@/types/user';

export const useUserStore = defineStore('userModule', {
  // persist: true,
  persist: {
    key: 'user_info',
    paths: ['user']
  },
  state: () => ({
    user: {} as User | {},
    returnUrl: ''
  }),
  getters: {
    // userId: (state) => (state.user as User).id || ''
    userId: state => ('id' in state.user) ? state.user.id : '',
    userToken: state => ('token' in state.user) ? (state.user?.token || '') : ''
  },
  actions: {
    setUserAction(_user: User) {
      this.user = _user;
    },
    delUserAction() {
      this.user = {};
    },
    // 记录回跳地址
    setReturnUrlAction(_url: string) {
      (this.returnUrl = _url);
    }
  }
});
