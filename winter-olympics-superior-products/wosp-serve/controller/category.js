const { goodsList } = require('../model/category')

// 分类商品列表
module.exports.goodsListCON = async(ctx) => {
    // 请求参数 id分类 page当前页 pageSize每页显示条数
    const { id, page, pageSize } = ctx.request.body
    const result = await goodsList({
        cateId: id,
        page,
        pageSize
    })
    if (Object.keys(result).length !== 0) {
        // 处理数据
        let list = []
        for (let i = 0; i < result.goods.length; i++) {
            list.push({
                id: result.goods[i].goods_id,
                name: result.goods[i].name,
                desc: result.goods[i].desc,
                price: result.goods[i].price,
                imgUrl: result.goods[i].img_src,
                hrefUrl: `/goods/${result.goods[i].goods_id}`
            })
        }
        // 响应请求并返回数据
        ctx.body = {
            status: 200,
            data: {
                totalCount: result.totalCount[0].totalCount,
                page,
                pageSize,
                list
            }
        }
    }
}