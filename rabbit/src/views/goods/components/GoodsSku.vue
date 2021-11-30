<!-- 规格选择组件 -->
<template>
  <div class="goods-sku">
    <dl v-for="item in specs" :key="item.name">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="value in item.values" :key="value.name">
          <img
            v-if="value.picture"
            :class="{ selected: value.selected, disabled: value.disabled }"
            :src="value.picture"
            alt=""
            @click="updateSelected(value, item)"
          />
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="updateSelected(value, item)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from "@/vendors/powerSet";
export default {
  name: "GoodsSku",
  props: {
    // 用户选择的规格数据
    specs: {
      type: Array,
      default: () => [],
    },
    // 当前商品的规格组合
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 更新规格的选中状态
    const updateSelected = (curVal, itemObj) => {
      // 当前规格禁用 阻止代码向下执行
      if (curVal.disabled) return;
      if (curVal.selected) {
        curVal.selected = false;
      } else {
        // 单选  排他思想
        itemObj.values.forEach((item) => (item.selected = false));
        curVal.selected = true;
      }
      // 更新按钮禁选状态
      updateDisabled(props.specs, pathMap);
      sendDataToParent(props.specs, pathMap, props.skus, emit);
    };
    // 规格查询对象
    const pathMap = createPathMap(props.skus);
    // 设置默认选中规格组合 一定要在初始化规格按钮的禁用状态之前调用
    setDefaultSelected(props.skuId, props.skus, props.specs);
    // 初始化规格按钮的禁用状态
    updateDisabled(props.specs, pathMap);
    return { updateSelected };
  },
};
// 创建规格查询对象
function createPathMap(skus) {
  const pathMap = {};
  // 处理数据生成符合我们格式的查询对象
  skus.forEach((sku) => {
    //inventory 库存
    if (sku.inventory > 0) {
      const names = sku.specs.map((item) => item.valueName);
      // 完整的规格组合
      const max = names.length;
      // console.log(names);
      const sets = powerSet(names).filter((item) => item.length > 0);
      // console.log(sets);
      sets.forEach((set) => {
        const key = set.join("_");
        // console.log(key);
        // 不存在添加
        if (!(key in pathMap)) {
          if (set.length === max) {
            pathMap[key] = sku.id;
          } else {
            pathMap[key] = null;
          }
        }
      });
    }
  });
  return pathMap;
}
// 更细规格的禁用状态
function updateDisabled(specs, pathMap) {
  specs.forEach((item, index) => {
    // 用户选择规格的数组
    const selectArr = getUserSelected(specs);
    // console.log(selectArr);
    item.values.forEach((value) => {
      // 选中的不需要禁用
      if (value.selected) return;
      // 当前选择的规格放到用户选择数组中
      selectArr[index] = value.name;
      // 处理匹配格式
      const key = selectArr.filter((item) => item).join("_");
      // 不在规格查询对象中禁用该规格项
      value.disabled = !(key in pathMap);
    });
  });
}
// 获取用户选中的规格
function getUserSelected(specs) {
  // 存放用户选中的规格
  const result = [];
  specs.forEach((item, index) => {
    let selected = item.values.find((value) => value.selected);
    if (selected) {
      result[index] = selected.name;
    } else {
      result[index] = undefined;
    }
  });
  return result;
}
// 设置默认选中规格组合
function setDefaultSelected(skuId, skus, specs) {
  // skuId不存在不需要默认选中
  if (!skuId) return;
  const target = skus
    .find((sku) => sku.id === skuId)
    .specs.map((item) => item.valueName);
  // console.log(target);
  // 变量渲染数据 改变选中状态
  specs.forEach((item) => {
    item.values.forEach((value) => {
      if (target.includes(value.name)) {
        value.selected = true;
      }
    });
  });
}
// 将数据回传父组件
function sendDataToParent(specs, pathMap, skus, emit) {
  const userSelectedArr = getUserSelected(specs).filter((item) => item);
  // 用户选中了完整规格
  if (userSelectedArr.length === specs.length) {
    const skuId = pathMap[userSelectedArr.join("_")];
    const { price, oldPrice, inventory, specs } = skus.find(
      (item) => item.id === skuId
    );
    emit("sendChangeData", {
      skuId,
      price,
      oldPrice,
      inventory,
      specsText: specs
        .map((item) => `${item.name}:${item.valueName}`)
        .join(" "),
    });
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
