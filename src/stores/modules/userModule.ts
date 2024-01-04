import { defineStore } from 'pinia';
import type { User } from '@/types/user';

export const useUserStore = defineStore('userModule', {
  state: () => ({
    user: {} as User | object
  }),
  getters: {
    userId: (state) => state.user.id
  },
  actions: {
    setUserAction(_user: User) {
      this.user = _user;
    },
    delUserAction() {
      this.user = {};
    }
  }
});
