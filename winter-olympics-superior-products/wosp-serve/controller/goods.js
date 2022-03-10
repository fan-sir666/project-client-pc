const { getCateGory, getGoodsInfo, getGoodsImg, getRecommendGoods, hotGoods, getHotSale } = require('../model/goods')

// 商品详情信息
module.exports.detailInfoCON = async(ctx) => {
    const { id } = ctx.request.body

    // 商品所属分类
    const CateGoryResult = await getCateGory(id)

    // 基本信息
    const GoodsInfoResult = await getGoodsInfo(id)

    // 处理图片函数
    function processImg(arr) {
        let arrImg = []
        for (var i = 0; i < arr.length; i++) {
            arrImg.push(arr[i].img_src)
        }
        return arrImg
    }

    // 商品图片
    const previewImg = await getGoodsImg({ id, type: '4-4' }) // 预览图
    const smallImg = await getGoodsImg({ id, type: '4-2' }) // 放大镜小图
    const bigImg = await getGoodsImg({ id, type: '4-3' }) // 放大镜大图
    const previewImgArr = processImg(previewImg)
    const smallImgArr = processImg(smallImg)
    const bigImgArr = processImg(bigImg)

    // 商品详情图片
    const detailImg = await getGoodsImg({ id, type: '4-5' })
    const detailArr = processImg(detailImg)

    // 响应数据
    if (CateGoryResult[0] && GoodsInfoResult[0] && previewImg[0] && smallImg[0] && bigImg[0] && detailImg[0]) {
        ctx.body = {
            code: 200,
            data: {
                id: GoodsInfoResult[0].id,
                name: GoodsInfoResult[0].name,
                desc: GoodsInfoResult[0].desc,
                price: GoodsInfoResult[0].price,
                oldPrice: GoodsInfoResult[0].old_price,
                inventory: GoodsInfoResult[0].inventory,
                cate_id: GoodsInfoResult[0].cate_id,
                categories: CateGoryResult[0],
                mainpictures: { previewImgArr, smallImgArr, bigImgArr },
                detailpictures: detailArr
            }
        }
    }
}

// 商品同类推荐
module.exports.recommendGoodsCON = async(ctx) => {
    const { id, cateId, limit } = ctx.request.body
    const result = await getRecommendGoods(id, cateId, limit)
    if (result[0]) {
        // 处理数据
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                goods_id: result[i].goods_id,
                name: result[i].name,
                price: result[i].price,
                picture: result[i].img_src,
                hrefUrl: `/goods/${result[i].goods_id}`
            })
        }
        // 响应请求并返回数据
        ctx.body = {
            status: 200,
            data: data
        }
    }
}

// 猜你喜欢
module.exports.hotSaleCON = async(ctx) => {
    const result = await getHotSale()
    if (result[0]) {
        // 处理数据
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                goods_id: result[i].goods_id,
                name: result[i].name,
                price: result[i].price,
                picture: result[i].img_src,
                hrefUrl: `/goods/${result[i].goods_id}`
            })
        }
        // 响应请求并返回数据
        ctx.body = {
            status: 200,
            data: data
        }
    }
}

// 热榜商品
module.exports.hotGoodsCON = async(ctx) => {
    const result = await hotGoods()
    if (result[0]) {
        // 处理数据
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                goods_id: result[i].goods_id,
                name: result[i].name,
                desc: result[i].desc,
                price: result[i].price,
                imgUrl: result[i].img_src,
                hrefUrl: `/goods/${result[i].goods_id}`
            })
        }
        // 响应请求并返回数据
        ctx.body = {
            status: 200,
            data: data
        }
    }
}