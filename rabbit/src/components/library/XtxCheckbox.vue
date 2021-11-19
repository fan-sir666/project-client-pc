<template>
  <div class="xtx-checkbox" @click="toggle">
    <i v-if="isChecked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span><slot></slot></span>
  </div>
</template>
<script>
// import { ref, watchEffect } from "vue";

import { useVModel } from "@vueuse/core";

export default {
  name: "XtxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /*// 手动实现组件数据双向绑定
    const isChecked = ref(true);
    const toggle = () => {
      isChecked.value = !isChecked.value;
      emit("update:modelValue", isChecked.value);
    };
    watchEffect(() => {
      isChecked.value = props.modelValue;
    });*/
    // 第三方库实现
    const isChecked = useVModel(props, "modelValue", emit);
    const toggle = () => {
      isChecked.value = !isChecked.value;
    };
    return { isChecked, toggle };
  },
};
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
