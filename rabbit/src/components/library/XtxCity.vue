<!-- 下拉省市区地址选择 -->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: flag }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="flag">
      <template v-if="cityData">
        <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  setup() {
    // 是否显示省市区的选择框
    const flag = ref(false);
    // 下拉菜单DOM
    const target = ref(null);
    // 省市区数据
    const cityData = ref(null);
    // 显示
    const show = async () => {
      flag.value = true;
      //  获取城市数据
      const data = await getCityData();
      // console.log(data);
      cityData.value = data;
    };
    // 隐藏
    const hide = () => {
      flag.value = false;
    };
    // 切换显示和隐藏
    const toggle = () => {
      flag.value ? hide() : show();
    };
    // 点击下拉以外的区域隐藏
    onClickOutside(target, () => hide());
    return { flag, target, toggle, cityData };
  },
};
//  缓存城市数据
window.cityData = null;
// 获取城市数据
async function getCityData() {
  if (window.cityData) return window.cityData;
  let { data } = await axios.get(
    "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
  );
  return (window.cityData = data);
}
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
