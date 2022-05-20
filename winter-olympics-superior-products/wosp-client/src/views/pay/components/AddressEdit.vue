<!-- 添加修改地址 -->
<template>
  <XtxDialog
    ref="xtxDialogInstance"
    v-model:visible="visible"
    :title="address?.id?'修改收货地址':'添加收货地址'"
  >
    <template v-slot:default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入收货人"
                v-model="address.consignee"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入手机号"
                v-model="address.mobile"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <XtxCity
                placeholder="请选择所在地区"
                @onCityChanged="onCityChanged"
                ref="xtxCityInstance"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入详细地址"
                v-model="address.address"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入邮政编码"
                v-model="address.postalCode"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                type="checkbox"
                class="checkbox"
                v-model="address.isDefault"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <XtxButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </XtxButton>
      <XtxButton @click="onSureClickHandler" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import { addAddress, updateAddress } from "@/api/address";
import Message from "@/components/library/Message";

export default {
  name: "AddressEdit",
  setup(props, { emit }) {
    const xtxDialogInstance = ref();
    // 用于控制弹框是否显示
    const visible = ref();
    // 地址填写信息
    const address = ref({});
    // 收货地址省市区变化时更新请求参数
    const onCityChanged = (data) => {
      address.value.provinceCode = data.provinceCode;
      address.value.cityCode = data.cityCode;
      address.value.countyCode = data.countyCode;
      address.value.fullLocation = data.location;
    };
    // 获取城市组件实例对象
    const xtxCityInstance = ref();
    // 用于执行用户点击确定按钮之后的逻辑代码
    const onSureClickHandler = async () => {
      // 地址信息中有id  则是修改不然就是添加
      if (address.value?.id) {
        const { code, data } = await updateAddress(address.value);
        // 关闭对话框
        xtxDialogInstance.value.destroy();
        if (code == 200) {
          // 通知父组件, 渲染当前用户新添加的收货地址
          emit("onAddressChanged", data.id);
          // 用户提示
          Message({ type: "success", text: "收货地址修改成功" });
        } else {
          // 用户提示
          Message({ type: "success", text: "收货地址修改失败" });
        }
      } else {
        // 发送请求, 实现添加收货地址
        const { code, data } = await addAddress(address.value);
        // 关闭对话框
        visible.value = false;
        if (code == 200) {
          // 通知父组件, 渲染当前用户新添加的收货地址
          emit("onAddressChanged", data.id);
          // 用户提示
          Message({ type: "success", text: "收货地址添加成功" });
        } else {
          // 用户提示
          Message({ type: "success", text: "收货地址添加失败" });
        }
      }
    };

    return {
      xtxDialogInstance,
      visible,
      onCityChanged,
      address,
      xtxCityInstance,
      onSureClickHandler,
    };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
