const { getcurrentTime, getRandomByLength } = require('../utils/index')
const { findSelectedCartId, findSelectedGoods, createOrder, addOrdergoodsInfo, findOrderInfo, editOrder, findOrderGoodsInfo, delOrderInfo } = require('../model/order')
const { delCartGoodsBuCartId } = require('../model/cart')
const { findAddress } = require('../model/address')

// 生成订单
module.exports.orderProduceCON = async(ctx) => {
    const { userId } = ctx.state.user
    const resultCartId = await findSelectedCartId(userId)
    const resultGoodsList = await findSelectedGoods(userId)
    if (resultCartId[0] && resultGoodsList[0]) {
        // 商品信息
        let goods = [];
        for (let i = 0; i < resultCartId.length; i++) {
            goods.push({
                cartId: resultCartId[i].id,
                goodsId: resultGoodsList[i].goods_id,
                name: resultGoodsList[i].name,
                picture: resultGoodsList[i].picture,
                price: resultGoodsList[i].price,
                count: resultGoodsList[i].checked_count,
                totalPrice: (resultGoodsList[i].price * resultGoodsList[i].checked_count)
            })
        }
        // 商品总件数
        let goodsTotalCount = goods.reduce((preValue, curVale) => {
            return preValue + curVale.count
        }, 0)

        // 商品总价
        let goodsTotalPrice = goods.reduce((preValue, curVale) => {
            return preValue + curVale.totalPrice
        }, 0)

        // 邮费
        const postFee = 4

        // 应付总金额
        let payTotalPrice = postFee + goodsTotalPrice
        ctx.body = {
            code: 200,
            data: {
                goodsTotalCount, // 总件数
                goodsTotalPrice, // 总价
                postFee, // 邮费
                payTotalPrice, // 应付总金额
                goods // 订单商品
            }
        }
    } else {
        ctx.body = {
            code: 200,
            data: {
                goodsTotalCount: 0, // 总件数
                goodsTotalPrice: 0, // 总价
                postFee: 0, // 邮费
                payTotalPrice: 0, // 应付总金额
            }
        }
    }
}


// 创建订单
module.exports.orderCreateCON = async(ctx) => {
    // 用户id
    const { userId } = ctx.state.user

    // 用户提交参数
    const { addressId, payChannel, payType, goods, totalNum, totalMoney, postFee, payMoney } = ctx.request.body

    // 获取当前时间戳
    const timestamp = new Date().getTime()

    // 订单id
    const orderId = timestamp + getRandomByLength(8)

    // 订单创建时间
    const createTime = getcurrentTime(timestamp)

    // 订单状态
    const orderState = 1

    // 操作model层
    const orderResult = await createOrder({ id: orderId, createTime, payType, orderState, postFee, payMoney, payChannel, totalMoney, totalNum, userAddress_id: addressId, user_id: userId })
    goods.forEach(async(item) => {
        const { goodsId, name, picture, price, count, totalPrice } = item
        await addOrdergoodsInfo({ goods_id: goodsId, name, curPrice: price, quanyity: count, picture, totalMoney: totalPrice, order_id: orderId })
    });

    // 购物车选中商品id
    const cartArrId = goods.map(item => item.cartId)
    if (orderResult.affectedRows == 1) {
        // 订单创建成功 删除购物车 数据
        cartArrId.forEach(async(item) => {
            await delCartGoodsBuCartId({ userId, cartId: item })
        })
        const findResult = await findOrderInfo(orderId, userId)
        if (findResult[0]) {
            ctx.body = {
                code: 200,
                data: {
                    msg: "请尽快支付！！！",
                    id: findResult[0].id,
                    payMoney: findResult[0].payMoney
                }
            }
        }
    }
}


// 支付订单
module.exports.orderPaymentCON = async(ctx) => {
    const { id } = ctx.request.body
    const { userId } = ctx.state.user

    // 校验判断
    if (id && userId) {
        // 更新订单状态
        const result = await editOrder(id, 2, userId)
        if (result.affectedRows === 1) {
            ctx.body = {
                code: 200
            }
        }
    }
}

// 取消订单
module.exports.orderCancelCON = async(ctx) => {
    const { id } = ctx.request.body
    const { userId } = ctx.state.user

    // 校验判断
    if (id && userId) {
        // 更新订单状态
        const result = await editOrder(id, 6, userId)
        if (result.affectedRows === 1) {
            ctx.body = {
                code: 200
            }
        }
    }
}

// 查询订单
module.exports.orderInquireCON = async(ctx) => {
    const { id } = ctx.request.body
    const { userId } = ctx.state.user

    // 查询订单
    const orderInfo = await findOrderInfo(id, userId)
    const orderGoodsInfo = await findOrderGoodsInfo(id)
    const orderAddressInfo = await findAddress({ userId, addressId: orderInfo[0].userAddress_id })

    if (orderInfo[0] && orderGoodsInfo[0] && orderAddressInfo[0]) {
        orderInfo[0].goodsInfo = orderGoodsInfo
        orderInfo[0].addressInfo = orderAddressInfo
        ctx.body = {
            code: 200,
            data: orderInfo[0]
        }
    }

}

module.exports.orderDeleteCON = async(ctx) => {
    const { id } = ctx.request.body
    const { userId } = ctx.state.user
    const result = await delOrderInfo(id, userId)
    if (result.affectedRows === 1){
        ctx.body = {
            code:200
        }
    }
}