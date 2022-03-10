<!-- 结算地址组件 -->
<template>
  <div class="address">
    <div class="text">
      <div v-if="!finalAddress" class="none">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ finalAddress.consignee }}
        </li>
        <li>
          <span>联系方式：</span
          >{{
            finalAddress.mobile.replace(/(\d{3})(\d{4})(\d{4})/g, "$1****$3")
          }}
        </li>
        <li>
          <span>收货地址：</span
          >{{ finalAddress.fullLocation }}&nbsp;&nbsp;&nbsp;&nbsp;{{
            finalAddress.address
          }}
        </li>
      </ul>
      <a href="javascript:" v-if="finalAddress" @click="modifyAddress"
        >修改地址</a
      >
    </div>
    <div class="action">
      <XtxButton class="btn" @click="switchAddress">切换地址</XtxButton>
      <XtxButton class="btn" @click="addAddress">添加地址</XtxButton>
    </div>
  </div>
  <!--  添加|修改 地址模态框 -->
  <AddressEdit
    ref="addressEditInstance"
    @onAddressChanged="onAddressChange($event)"
  />
  <!--  切换地址模态框  -->
  <AddressSwitch
    ref="addressSwitchInstance"
    @onAddressChange="onAddressChange($event)"
    :list="addressList"
    :activeAddressId="finalAddress?.id"
  ></AddressSwitch>
</template>
<script>
import AddressEdit from "@/views/pay/components/AddressEdit";
import AddressSwitch from "@/views/pay/components/AddressSwitch";
import { computed, ref } from "vue";
import { getAddressList } from "@/api/address";
export default {
  name: "CheckoutAddress",
  setup() {
    // 用于存储编辑收货地址组件实例对象
    const addressEditInstance = ref();
    const { addressList, finalAddress, onAddressChange } = useAddressList();
    // 添加收货地址
    const addAddress = () => {
      // 打开对话框
      addressEditInstance.value.visible = true;
      // 初始化地址填写表单
      addressEditInstance.value.address = {
        // 收货人姓名
        consignee: "",
        // 联系方式 手机号
        mobile: "",
        // 详细地址
        address: "",
        // 邮政编码
        postalCode: "",
        // 是否设置为默认的收货地址
        isDefault: false,
        // 省编码
        provinceCode: "",
        // 市编码
        cityCode: "",
        // 县区编码
        countyCode: "",
        fullLocation: "",
      };
    };
    // 修改收货地址
    const modifyAddress = () => {
      // 显示模态框
      addressEditInstance.value.visible = true;
      // 从当前渲染的地址中获取回显数据
      const {
        fullLocation,
        provinceCode,
        cityCode,
        countyCode,
        isDefault,
        ...rest
      } = finalAddress.value;
      // 数据回显
      addressEditInstance.value.address = {
        ...rest,
        isDefault: Boolean(isDefault),
      };
      // 注意组件都是动态渲染的  为了确保渲染完成我们再去拿组件实例 在异步函数中获取
      // console.log(addressEditInstance.value.xtxCityInstance); //undefined
      setTimeout(() => {
        // console.log(addressEditInstance.value.xtxCityInstance.selectedCityData);
        addressEditInstance.value.xtxCityInstance.selectedCityData.provinceCode =
          provinceCode;
        addressEditInstance.value.xtxCityInstance.selectedCityData.cityCode =
          cityCode;
        addressEditInstance.value.xtxCityInstance.selectedCityData.countyCode =
          countyCode;
        addressEditInstance.value.xtxCityInstance.location = fullLocation;
      }, 0);
    };
    // 用于存储切换收货地址组件实例对象
    const addressSwitchInstance = ref();
    // 切换收货地址
    const switchAddress = () => {
      // 显示模态框
      addressSwitchInstance.value.visible = true;
    };
    return {
      addressEditInstance,
      addAddress,
      addressList,
      finalAddress,
      onAddressChange,
      modifyAddress,
      switchAddress,
      addressSwitchInstance,
    };
  },
  components: { AddressEdit, AddressSwitch },
};

// 获取收货地址列表
function useAddressList() {
  //  用于存放收货地址
  const addressList = ref(null);
  const getData = async (callback) => {
    const { data } = await getAddressList();
    addressList.value = data;
    // 执行callback标志请求执行完成，将新数据回传
    callback && callback(addressList.value);
  };
  // 用户选择的收货地址
  const selectedAddress = ref(null);
  // 展示优先级最高的收货地址
  const finalAddress = computed(() => {
    let result = null;
    if (selectedAddress.value) {
      result = selectedAddress.value;
    } else {
      if (addressList.value?.length > 0) {
        // 默认地址
        result = addressList.value.find((item) => item.isDefault === true);
        // 没有默认地址显示地址列表第一个
        if (!result) {
          result = addressList.value[0];
        }
      }
    }
    return result;
  });
  // 更新地址列表
  const onAddressChange = (id) => {
    getData((list) => {
      // 替换最新的用户选择地址
      selectedAddress.value = list.find((item) => item.id === id);
    });
  };
  getData();
  return { addressList, finalAddress, onAddressChange };
}
</script>
<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
