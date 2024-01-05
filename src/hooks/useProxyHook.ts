import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export default function useProxyHook() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;

  return proxy;
}
// export default function useProxyHook() {
//   return (getCurrentInstance() as ComponentInternalInstance).proxy as ComponentPublicInstance;
// }

