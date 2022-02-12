<template>
  <header class="login-header">
    <div class="container">
      <h1 class="logo"><a>冬奥优品</a></h1>
      <h3 class="sub"><slot></slot></h3>
      <RouterLink class="entry" to="/login">
        前往登录
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  name: "RegisterHeader",
};
</script>

<style scoped lang="less">
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../../../assets/images/logo.jpg) no-repeat center 18px /
        contain;
    }
  }
  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 36px;
    margin-left: -800px;
    color: #999999;
  }
  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;
    i {
      font-size: 14px;
      color: @xtxColor;
      letter-spacing: -5px;
    }
  }
}
</style>
