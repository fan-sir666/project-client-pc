<template>
  <!--  头部导航组件 -->
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li
      v-for="item in category.list"
      :key="item.id"
      @mouseenter="open(item.id)"
      @mouseleave="close(item.id)"
      @click="open(item.id)"
    >
      <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
      <div class="layer" :class="{ open: item.open }">
        <ul v-if="item.children?.length">
          <li v-for="itemChildren in item.children" :key="itemChildren.id">
            <router-link :to="`/category/sub/${itemChildren.id}`">
              <img :src="itemChildren.picture" alt="" />
              <p>{{ itemChildren.name }}</p>
            </router-link>
          </li>
        </ul>
        <template v-else>
          <XtxSkeleton
            animated="fade"
            width="800px"
            height="130px"
            bg="rgba(0,0,0,0.5)"
          ></XtxSkeleton>
        </template>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "AppHeaderNav",
  setup() {
    const store = useStore();
    const category = store.state.category;
    const open = (id) => {
      store.commit("category/open", id);
    };
    const close = (id) => {
      store.commit("category/close", id);
    };
    return { category, open, close };
  },
};
</script>

<style scoped lang="less">
.app-header-nav {
  display: flex;
  padding-left: 40px;
  justify-content: space-around;
  width: 820px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
    }
    .layer {
      width: 1240px;
      // 不加高度0 样式有问题
      height: 0;
      background-color: #fff;
      position: absolute;
      left: -200px;
      top: 56px;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 132px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: @xtxColor;
            }
          }
        }
      }
      &.open {
        height: 132px;
        opacity: 1;
      }
    }
    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}
    }
  }
}
</style>
