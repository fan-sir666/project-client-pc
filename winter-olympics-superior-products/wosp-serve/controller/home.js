const { headCategory, banner, newGoods, hotGoods, productCate, productGoods } = require('../model/home')

// 首页头部分类导航
module.exports.headCategoryCON = async(ctx) => {
    const result = await headCategory()
    if (result[0]) {
        ctx.body = {
            status: 200,
            data: result
        }
    }
}

// 首页轮播图
module.exports.bannerCON = async(ctx) => {
    const result = await banner()
    console.log(result);
    if (result[0]) {
        // 处理数据
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                id: result[i].id,
                imgUrl: result[i].img_src,
                type: result[i].img_type_one,
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

// 新鲜好物
module.exports.newGoodsCON = async(ctx) => {
    const result = await newGoods()
    if (result[0]) {
        // 处理数据
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                id: result[i].id,
                goods_id: result[i].goods_id,
                name: result[i].name,
                price: result[i].price,
                picture: result[i].img_src,
                type: result[i].img_type_one,
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

// 热销商品
module.exports.hotGoodsCON = async(ctx) => {
    const result = await hotGoods()
    if (result[0]) {
        // 处理数据
        let data = [];
        for (let i = 0; i < result.length; i++) {
            data.push({
                id: result[i].id,
                imgUrl: result[i].img_src,
                type: result[i].img_type_one,
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

// 参品区块
module.exports.productGoodsCON = async(ctx) => {
    const resultCate = await productCate()
    if (resultCate[0]) {
        // 数据处理
        let data = [];
        for (var i = 0; i < resultCate.length; i++) {
            const resultGoods = await productGoods(resultCate[i].id)
            let goodsData = []
            for (var j = 0; j < resultGoods.length; j++) {
                goodsData.push({
                    id: resultGoods[j].id,
                    name: resultGoods[j].name,
                    desc: resultGoods[j].desc,
                    price: resultGoods[j].price,
                    imgUrl: resultGoods[j].img_src,
                    hrefUrl: `/goods/${resultGoods[j].goods_id}`
                })
            }
            data.push({
                id: resultCate[i].id,
                name: resultCate[i].name,
                picture: resultCate[i].picture,
                hrefUrl: `/category/${resultCate[i].id}`,
                saleInfo: resultCate[i].saleInfo,
                goods: goodsData
            })
        }
        // 响应请求并返回数据
        ctx.body = {
            status: 200,
            data: data
        }
    }
}