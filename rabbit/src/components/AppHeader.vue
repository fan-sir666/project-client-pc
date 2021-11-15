<template>
  <!--  页面头部组件 -->
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><router-link to="/"></router-link></h1>
      <!--   头部导航组件   -->
      <AppHeaderNav></AppHeaderNav>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import AppHeaderNav from "./AppHeaderNav.vue";

export default {
  name: "AppHeader",
  components: {
    AppHeaderNav,
  },
};
</script>

<style scoped lang="less">
.app-header {
  background-color: #fff;
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      a {
        display: block;
        width: 100%;
        height: 132px;
        // 文本首航缩进
        text-indent: -9999px;
        // 背景图片
        background: url(../assets/images/logo.png) no-repeat center 18px /
          contain;
      }
    }

    .search {
      position: relative;
      width: 170px;
      height: 32px;
      border-bottom: 1px solid #e7e7e7;
      .icon-search {
        margin-left: 5px;
        font-size: 18px;
      }
      input {
        padding-left: 5px;
        width: 140px;
        color: #666666;
      }
    }
    .cart {
      width: 50px;
      .curr {
        position: relative;
        display: block;
        height: 32px;
        line-height: 32px;
        text-align: center;
        .icon-cart {
          font-size: 22px;
        }
        em {
          position: absolute;
          top: 0;
          right: 0;
          padding: 1px 6px;
          line-height: 1;
          font-size: 12px;
          font-style: normal;
          font-family: Arail, serif;
          color: #fff;
          background: @helpColor;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
