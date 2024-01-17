import 'vue-router';
import api from '@/api';

export {};

// 扩展全局变量属性
declare module 'vue' {
  export interface ComponentCustomProperties{
    $api: {
      // [prop in keyof api]: any;
      [prop in keyof typeof api]: typeof api[prop];
    };
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}
