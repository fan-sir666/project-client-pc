<!-- 商品数量选择组件 -->
<template>
  <div class="xtx-number-box">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="number-box">
      <a href="javascript:" @click="onChangeCount(-1)">-</a>
      <input type="text" readonly :value="curNumber" />
      <a href="javascript:" @click="onChangeCount(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxNumberBox",
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 当前数量
    const curNumber = useVModel(props, "modelValue", emit);
    // 操作数量
    const onChangeCount = (step) => {
      const changeNumber = curNumber.value + step;
      //  范围限制
      if (changeNumber < 1) {
        curNumber.value = 1;
      } else if (changeNumber > props.max) {
        curNumber.value = props.max;
      } else {
        curNumber.value = changeNumber;
      }
    };
    return { curNumber, onChangeCount };
  },
};
</script>
<style scoped lang="less">
.xtx-number-box {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .number-box {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
