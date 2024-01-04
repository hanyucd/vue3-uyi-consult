import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// 导出 pinia 实例,给 main 使用
export default pinia;

// 统一导出
// import { useUserStore } from './modules/user'
// export { useUserStore }
// 相当于下面
export * from './modules/userModule';
// export * from './modules/consult';
