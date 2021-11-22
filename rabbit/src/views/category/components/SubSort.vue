<!-- 二级分类排序区 -->
<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === '' }"
        @click="updateSortParams({ sortField: '', sortMethod: 'desc' })"
        href="javascript:"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="updateSortParams({ sortField: 'publishTime' })"
        href="javascript:"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="updateSortParams({ sortField: 'orderNum' })"
        href="javascript:"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="updateSortParams({ sortField: 'evaluateNum' })"
        href="javascript:"
        >评论最多</a
      >
      <a
        @click="
          updateSortParams({
            sortField: 'price',
            sortMethod: sortParams.sortMethod === 'desc' ? 'asc' : 'desc',
          })
        "
        href="javascript:"
      >
        价格排序
        <i
          :class="{ active: sortParams.sortMethod === 'asc' }"
          class="arrow up"
        ></i>
        <i
          :class="{ active: sortParams.sortMethod === 'desc' }"
          class="arrow down"
        ></i>
      </a>
    </div>
    <div class="check">
      <XtxCheckbox
        v-model="sortParams.inventory"
        @update:modelValue="updateSortParams({ inventory: $event })"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox
        v-model="sortParams.onlyDiscount"
        @update:modelValue="updateSortParams({ onlyDiscount: $event })"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  name: "SubSort",
  setup(props, { emit }) {
    const { sortParams, updateSortParams } = useSubSort(emit);
    return { sortParams, updateSortParams };
  },
};
function useSubSort(emit) {
  // 默认排序条件
  const sortParams = ref({
    sortField: "",
    sortMethod: "desc",
    inventory: false,
    onlyDiscount: false,
  });
  // 更新排序条件
  const updateSortParams = (target) => {
    sortParams.value = {
      ...sortParams.value,
      ...target,
    };
    // 将排序条件传个父组件
    emit("onSortParamsChanged", sortParams.value);
  };
  return { sortParams, updateSortParams };
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
