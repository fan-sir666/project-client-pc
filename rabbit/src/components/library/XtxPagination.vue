<template>
  <div class="xtx-pagination">
    <a href="javascript:" @click="curPage--" v-if="curPage > 1">上一页</a>
    <span v-if="pageInfo.start > 1">...</span>
    <a
      href="javascript:"
      :class="{ active: curPage === item }"
      v-for="item in pageInfo.pageBtns"
      :key="item"
      @click="curPage = item"
      >{{ item }}</a
    >
    <span v-if="pageInfo.end < pageInfo.totalPage">...</span>
    <a href="javascript:" @click="curPage++" v-if="curPage < pageInfo.totalPage"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxPagination",
  props: {
    // 当前页
    page: {
      type: Number,
      default: 1,
    },
    // 总数据条数
    totalCount: {
      type: Number,
      default: 1,
    },
    // 每页显示数据条数
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    // 当前页
    const curPage = useVModel(props, "page", emit);
    // 总数据条数
    const totalCount = computed(() => props.totalCount);
    // 一页多少条数据
    const pageSize = computed(() => props.pageSize);
    //  显示页码按钮数量
    const pageBtnNumber = 5;
    //  偏移量
    const pageOffset = Math.floor(pageBtnNumber / 2);
    // 分页信息
    const pageInfo = computed(() => {
      //  起始按钮
      let start = curPage.value - pageOffset;
      //  结束按钮
      let end = start + pageBtnNumber - 1;
      // 总页数
      let totalPage = Math.ceil(totalCount.value / pageSize.value);
      //2. 范围限制 页码 <1和超过总页数
      if (start < 1) {
        start = 1;
        //  重新计算结束页码
        // end = start + pageBtnNumber - 1;
        //  如果计算后的结束页码大于总页数
        let temp = start + pageBtnNumber - 1;
        end = temp > totalPage ? totalPage : temp;
      }
      if (end > totalPage) {
        end = totalPage;
        //  重新计算起始页码
        // start = end - pageBtnNumber + 1;
        // 如果计算后起始页码小于1
        let temp = end - pageBtnNumber + 1;
        start = temp < 1 ? 1 : temp;
      }
      // 遍历生成页码值
      let pageBtns = [];
      for (let i = start; i <= end; i++) {
        pageBtns.push(i);
      }
      return { pageBtns, start, end, totalPage };
    });
    return { pageInfo, curPage };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
