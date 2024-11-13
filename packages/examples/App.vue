<template>
  <div class="cron">
    <h1>cron-plus例子</h1>
    <el-popover :visible="state.cronPopover" width="600">
      <cron-plugs i18n="zh" @change="changeCron" @close="state.cronPopover = false" max-height="200px" />
      <template #reference>
        <el-input @click="state.cronPopover = true" v-model="state.cron" placeholder="请选择cron表达式"></el-input>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { reactive, defineComponent } from 'vue'
export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      cronPopover: false,
      cron: ''
    })
    const changeCron = (val) => {
      if (typeof (val) !== 'string') return false
      state.cron = val
    }
    const togglePopover = (bol) => {
      state.cronPopover = bol
    }
    const debounce = (fn, delay) => {
      let timer = null;
      return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    };
    const _ResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
      constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
      }
    };
    return {
      state,
      changeCron,
      togglePopover
    }
  }
});
</script>

<style scoped>
.cron {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}

h1 {
  font-size: 50px;
  text-align: center;
}
</style>
