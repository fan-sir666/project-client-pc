<template>
  <AppLayout>
    <h1 @click="getLbt">我是首页</h1>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { requestWithoutToken } from "@/utils/request";
export default {
  name: "HomePage",
  setup: function () {
    const getLbt = async () => {
      // let res = await requestWithoutToken("/home/index", "get").then(
      //   (value) => {
      //     return value;
      //   },
      //   (reason) => {
      //     return reason;
      //   }
      // );
      // console.log(res);
      try {
        let res = await requestWithoutToken("/hom/index", "get");
        console.log(res);
      } catch (e) {
        throw new Error(e);
      }
    };
    return {
      getLbt,
    };
  },
  components: { AppLayout },
};
</script>

<style scoped></style>
