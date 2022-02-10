<template>
  <div class="xtx-checkbox" @click="toggle">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <!-- 如果插槽存在内容 $slots.default 为真 否则为假 -->
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>
<script>
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
    // 用于存储复选框是否选中的状态
    const isChecked = useVModel(props, "modelValue", emit);
    // 更改复选框选中状态
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
