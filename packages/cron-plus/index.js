import cronPlugs from "./index.vue";
import './index.css'

const install = function(app) {
    app.component(cronPlugs.name, cronPlugs);
};
/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// export const cronPlugs = cronPlugs_;

export default {
  install,
};
