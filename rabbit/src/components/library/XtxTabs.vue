<script>
import { useVModel } from "@vueuse/core";

export default {
  name: "XtxTabs",
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots, emit }) {
    //  获取插槽内容
    const defaults = slots.default();
    // 选项卡标题
    const titles = [];
    // 选项卡内容
    const contents = [];
    //  处理插槽内容
    defaults.forEach((item) => {
      // 循环使用tab组件
      if (typeof item.type === "symbol") {
        item.children.forEach((child) => {
          if (child.type.name === "XtxTabTitle") {
            titles.push(child);
          } else {
            contents.push(child);
          }
        });
      } else {
        //  直接使用tab组件
        if (item.type.name === "XtxTabTitle") {
          titles.push(item);
        } else {
          contents.push(item);
        }
      }
    });
    // 当前索引
    const index = useVModel(props, "active", emit);
    // 点击切换
    const onClickTitleTab = (i) => {
      index.value = i;
    };
    // 模板渲染
    return function () {
      return (
        <div className="xtx-tabs">
          <nav>
            {titles.map((item, i) => (
              <a
                href="javascript:"
                className={i === index.value ? "active" : ""}
                onClick={() => onClickTitleTab(i)}
              >
                {item}
              </a>
            ))}
          </nav>
          {contents.map((item, i) => (
            <div className={i === index.value ? "active" : ""}>{item}</div>
          ))}
        </div>
      );
    };
  },
};
</script>

<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
  > div {
    display: none;
    &.active {
      display: block;
    }
  }
}
</style>
