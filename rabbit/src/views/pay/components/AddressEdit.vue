<!-- 编辑地址组件 -->
<template>
  <XtxDialog
    v-model:visible="visible"
    :title="`${address?.id ? '修改' : '添加'}收货地址`"
  >
    <template v-slot:default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.receiver"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.contact"
                placeholder="请输入手机号"
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
                v-model="address.address"
                placeholder="请输入详细地址"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.postalCode"
                placeholder="请输入邮政编码"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                class="input"
                v-model="address.addressTags"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                type="checkbox"
                v-model="address.isDefault"
                class="checkbox"
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
      <XtxButton @click="onSureClickHandler" type="primary">{{
        address?.id ? "修改" : "添加"
      }}</XtxButton>
    </template>
  </XtxDialog>
</template>

<script>
import { ref } from "vue";
import Message from "@/components/library/Message";
import { addAddress, modifyAddress } from "@/api/order";

export default {
  name: "AddressEdit",
  setup(props, { emit }) {
    // 用于控制弹框是否显示
    const visible = ref(false);
    // 地址填写信息
    const address = ref({});
    // 收货地址省市区变化时更新请求参数
    const onCityChanged = (data) => {
      // console.log(data);
      address.value.provinceCode = data.provinceCode;
      address.value.cityCode = data.cityCode;
      address.value.countyCode = data.countyCode;
    };
    // 获取城市组件实例对象
    const xtxCityInstance = ref();
    // 添加或修改地址
    const onSureClickHandler = async () => {
      //  处理请求参数
      const target = {
        ...address.value,
        isDefault: address.value.isDefault ? 0 : 1,
      };
      // 有生成地址时服务器返回的id代表是修改
      if (target.id) {
        //  修改
        try {
          const { result } = await modifyAddress({
            id: target.id,
            address: target,
          });
          // 提示
          Message({ type: "success", text: "收货地址修改成功" });
          //  关闭模态框
          visible.value = false;
          // 通知父组件重新获取收货地址
          emit("onAddressChange", result.id);
        } catch (error) {
          Message({ type: "error", text: "收货地址修改失败" });
        }
      } else {
        //  添加
        try {
          // 发起请求
          const { result } = await addAddress(target);
          // 提示
          Message({ type: "success", text: "收货地址添加成功" });
          //  关闭模态框
          visible.value = false;
          // 通知父组件重新获取收货地址
          emit("onAddressChange", result.id);
        } catch (error) {
          Message({ type: "error", text: "收货地址添加失败" });
        }
      }
    };

    return {
      visible,
      onSureClickHandler,
      onCityChanged,
      address,
      xtxCityInstance,
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
