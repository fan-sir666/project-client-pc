import { ref } from "vue";
import { getBanners } from "@/api/home";

export default function useBanners() {
  const banners = ref(null);
  //  获取轮播图数据
  const getData = async (distributionSite) => {
    try {
      const { result } = await getBanners(distributionSite);
      // console.log(result);
      banners.value = result;
    } catch (e) {
      throw new Error(e);
    }
  };
  return { banners, getData };
}
