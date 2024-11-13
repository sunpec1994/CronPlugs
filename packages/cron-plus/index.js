import cronPlugs_ from "./index.vue";
import './index.css'

const components = [cronPlugs_];

const install = function(Vue) {
  components.map((component) => {
    Vue.component(component.name, component);
  });
};
/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export const cronPlugs = cronPlugs_;

export default {
  install,
};