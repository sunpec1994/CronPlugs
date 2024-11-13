import cronPlugs from "./index.vue";
import './index.css'

const install = function (Vue) {
  Vue.component(cronPlugs.name, cronPlugs);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  cronPlugs
};
