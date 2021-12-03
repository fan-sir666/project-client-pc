<!-- 商品评论 -->
<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:"
            :class="{ active: curTagTitle === item.title }"
            v-for="item in commentInfo.tags"
            :key="item.title"
            @click="
              curTagTitle = item.title;
              updateReqParams({ tag: item.title });
            "
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:"
        :class="{ active: reqParams.sortField === '' }"
        @click="updateReqParams({ sortField: '' })"
        >默认</a
      >
      <a
        href="javascript:"
        :class="{ active: reqParams.sortField === 'createTime' }"
        @click="updateReqParams({ sortField: 'createTime' })"
        >最新</a
      >
      <a
        href="javascript:"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
        @click="updateReqParams({ sortField: 'praiseCount' })"
        >最热</a
      >
    </div>
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-wjx01"
              v-for="(scoreitem, index) in item.score"
              :key="index + scoreitem"
            ></i>
            <i
              class="iconfont icon-wjx02"
              v-for="(scoreitem, index) in 5 - item.score"
              :key="index + scoreitem"
            ></i>
            <span class="attr">{{ formatAttrs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>
          <GoodsCommentImage :pictures="item.pictures"></GoodsCommentImage>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件   -->
    <!-- 注意：数据双向绑定watch监听不到当前页的变化，自己调用更新请求参数的方法 或深度监听   -->
    <XtxPagination
      v-if="commentList?.pages > 1"
      v-model:page="reqParams.page"
      :pageSize="reqParams.pageSize"
      :totalCount="commentList.counts"
      @update:page="updateReqParams({ page: $event })"
    ></XtxPagination>
  </div>
</template>
<script>
import GoodsCommentImage from "@/views/goods/components/GoodsCommentImage";
import { ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { getCommentInfoApi, getCommentListApi } from "@/api/goods";

export default {
  name: "GoodsComment",
  setup() {
    const { commentInfo, curTagTitle } = useCommentInfo();
    const {
      commentList,
      formatNickname,
      formatAttrs,
      updateReqParams,
      reqParams,
    } = useCommentList();
    return {
      commentInfo,
      curTagTitle,
      commentList,
      formatNickname,
      formatAttrs,
      updateReqParams,
      reqParams,
    };
  },
  components: {
    GoodsCommentImage,
  },
};
// 获取评论头部信息
function useCommentInfo() {
  const route = useRoute();
  // 评论头部数据
  const commentInfo = ref();
  const curTagTitle = ref("全部评价");
  const getData = async (id) => {
    const { result } = await getCommentInfoApi(id);
    // 渲染数据处理
    result.tags.unshift(
      {
        title: "全部评价",
        tagCount: result.evaluateCount,
      },
      {
        title: "有图",
        tagCount: result.hasPictureCount,
      }
    );
    commentInfo.value = result;
  };
  getData(route.params.id);
  // 路由更新重新获取
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return { commentInfo, curTagTitle };
}
// 获取评论列表
function useCommentList() {
  const route = useRoute();
  const commentList = ref(null);
  // 请求参数
  const reqParams = ref({
    id: route.params.id,
    page: 1,
    pageSize: 10,
    hasPicture: null,
    tag: "",
    // praiseCount 最热, createTime 最新
    sortField: "",
  });
  // 更新请求参数
  const updateReqParams = (params) => {
    if (params.tag) {
      reqParams.value = {
        ...reqParams.value,
        hasPicture: params.tag === "有图",
        tag:
          params.tag === "有图" || params.tag === "全部评价" ? "" : params.tag,
      };
      reqParams.value.page = 1;
    } else if (params.sortField) {
      reqParams.value = {
        ...reqParams.value,
        ...params,
      };
      reqParams.value.page = 1;
    } else {
      reqParams.value = {
        ...reqParams.value,
        ...params,
      };
    }
  };
  const getData = async () => {
    const { result } = await getCommentListApi(reqParams.value);
    commentList.value = result;
  };
  // 监听请求参数
  watch(
    () => reqParams.value,
    () => {
      getData();
    },
    { immediate: true, deep: true }
  );
  // 格式化用户昵称
  const formatNickname = (nickname) => {
    return nickname.substr(0, 1) + "****" + nickname.substr(-1);
  };
  // 格式化商品属性信息
  const formatAttrs = (specs) => {
    // return specs.reduce((prev, cur) => {
    //   return prev + `${cur["name"]} : ${cur["nameValue"]}`;
    // }, "");
    return specs.map((spec) => `${spec.name}: ${spec.nameValue}`).join(" ");
  };
  return {
    commentList,
    formatNickname,
    formatAttrs,
    updateReqParams,
    reqParams,
  };
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
