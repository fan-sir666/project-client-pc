<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <!--  加载loading    -->
      <div class="loading" v-if="loading"></div>
      <!--  规格组件    -->
      <GoodsSku
        v-if="!loading && specsAndSkus"
        :skuId="skuId"
        :skus="specsAndSkus.skus"
        :specs="specsAndSkus.specs"
        @sendChangeData="userSkuChange"
      ></GoodsSku>
      <!--  修改规格按钮    -->
      <XtxButton
        @click="submitSku"
        v-if="!loading && specsAndSkus"
        type="primary"
        size="mini"
        style="margin-left: 60px"
      >
        确定
      </XtxButton>
    </div>
  </div>
</template>
<script>
import GoodsSku from "@/views/goods/components/GoodsSku";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { getSkuInfoBySkuId } from "@/api/cart";
import Message from "@/components/library/Message";
import { useStore } from "vuex";

export default {
  name: "CartSku",
  props: {
    attrsText: {
      type: String,
      default: "",
    },
    skuId: {
      type: String,
    },
  },
  setup(props) {
    const store = useStore();
    // 规格弹层的显示和隐藏
    const visible = ref(false);
    // 弹层容器
    const target = ref(null);
    // 用户选择的当前商品的规格信息
    const specsAndSkus = ref(null);
    // sku数据的加载状态
    const loading = ref(false);
    // 显示
    const show = async () => {
      visible.value = true;
      loading.value = true;
      //  获取规格信息
      let { result } = await getSkuInfoBySkuId(props.skuId);
      specsAndSkus.value = result;
      loading.value = false;
    };
    // 隐藏
    const hide = () => {
      visible.value = false;
    };
    //  显示隐藏切换
    const toggle = () => {
      visible.value ? hide() : show();
    };
    // 点击规格弹层外部
    onClickOutside(target, () => {
      visible.value && hide();
    });
    // 用户修改后的规格
    let newSku = null;
    const userSkuChange = (data) => {
      newSku = data;
    };
    // 确定更新选择的规格
    const submitSku = () => {
      hide();
      // 用户没有选则规格或选择规格没变
      if (!newSku) {
        return Message({ type: "warn", text: "请选择规格" });
      } else if (newSku && newSku.skuId === props.skuId) {
        return Message({ type: "warn", text: "选择规格没有变化" });
      }
      store.dispatch("cart/updateGoodsChangeSku", {
        oldSkuId: props.skuId,
        newSku,
      });
    };
    return {
      visible,
      toggle,
      target,
      specsAndSkus,
      loading,
      userSkuChange,
      submitSku,
    };
  },
  components: { GoodsSku },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
