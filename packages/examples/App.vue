<template>
  <div class="cron">
    <h1>cron-plus例子</h1>
    <el-popover :visible="state.cronPopover" width="650">
      <cronPlugs i18n="en" @change="changeCron" @close="state.cronPopover = false" max-height="200px" />
      <template #reference>
        <el-input @click="state.cronPopover = true" v-model="state.cron" placeholder="请选择cron表达式"></el-input>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { reactive, defineComponent } from 'vue'
import { cronPlugs } from '../cron-plus/index'
import '../cron-plus/index.css'

export default defineComponent({
  name: "App",
  components: { cronPlugs },
  setup() {
    const state = reactive({
      cronPopover: false,
      cron: ''
    })
    const changeCron = (val) => {
      if (typeof (val) !== 'string') return false
      state.cron = val
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
