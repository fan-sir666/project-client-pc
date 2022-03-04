<!-- 城市选择组件 -->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: flag }">
      <span class="placeholder" v-if="!location">请选择配送地址</span>
      <span class="value">{{ location }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="flag">
      <template v-if="cityData">
        <span
          class="ellipsis"
          v-for="item in list"
          :key="item.code"
          @click="updateSelectedCityData(item)"
          >{{ item.name }}</span
        >
      </template>
      <template v-else>
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";

export default {
  name: "XtxCity",
  setup(props, { emit }) {
    // 是否显示省市区的选择框
    const flag = ref(false);
    // 下拉菜单DOM
    const target = ref(null);
    // 省市区数据
    const cityData = ref(null);
    // 存储用户选择的省市区
    const selectedCityData = reactive({
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      provinceName: "",
      cityName: "",
      countyName: "",
    });
    // 展示用户选择的省市区级数据
    const location = ref("");
    // 更新用户选择的省市区
    const updateSelectedCityData = (data) => {
      if (data.level === 0) {
        // 省级
        selectedCityData.provinceCode = data.code;
        selectedCityData.provinceName = data.name;
        location.value = selectedCityData.provinceName;
      } else if (data.level === 1) {
        // 市级
        selectedCityData.cityCode = data.code;
        selectedCityData.cityName = data.name;
        location.value = `${selectedCityData.provinceName} - ${selectedCityData.cityName}`;
      } else {
        // 区级
        selectedCityData.countyCode = data.code;
        selectedCityData.countyName = data.name;
        location.value = `${selectedCityData.provinceName} - ${selectedCityData.cityName} - ${selectedCityData.countyName}`;
      }
      // console.log(selectedCityData);
    };
    // 处理渲染数据，默认只显示省
    const list = computed(() => {
      let list = cityData.value;
      if (selectedCityData.provinceCode) {
        //  返回用户选择省下对应的市数组
        list = list.find(
          (item) => item.code === selectedCityData.provinceCode
        ).areaList;
      }
      if (selectedCityData.cityCode) {
        //  返回用户选择市下对应的区数组
        list = list.find(
          (item) => item.code === selectedCityData.cityCode
        ).areaList;
      }
      if (selectedCityData.countyCode) {
        // code码回传父组件
        const { provinceCode, cityCode, countyCode } = selectedCityData;
        emit("onCityChanged", { provinceCode, cityCode, countyCode, location });
        // 隐藏弹框
        hide();
        //  重置初始列表
        list = cityData.value;
      }
      return list;
    });
    // 显示
    const show = async () => {
      flag.value = true;
      // 重置选择显示
      location.value = "";
      //  获取城市数据
      const data = await getCityData();
      // console.log(data);
      cityData.value = data;
    };
    // 隐藏
    const hide = () => {
      flag.value = false;
      //  重置用户选择
      for (let attr in selectedCityData) {
        selectedCityData[attr] = "";
      }
    };
    // 切换显示和隐藏
    const toggle = () => {
      flag.value ? hide() : show();
    };
    // 点击下拉以外的区域隐藏
    onClickOutside(target, () => hide());
    return {
      flag,
      target,
      toggle,
      cityData,
      list,
      updateSelectedCityData,
      location,
    };
  },
};

//  缓存城市数据
window.cityData = null;
// 获取城市数据
async function getCityData() {
  // 如果window对象中已经缓存了城市数据, 从 window 对象中获取城市数据
  if (window.cityData) return window.cityData;
  // window 对象中没有城市数据, 向服务器端发送请求获取城市数据
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
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
