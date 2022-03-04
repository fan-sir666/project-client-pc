const { findCart, addCart, editCart, findGoodsInventory, findCartGoodsList, delCartGoodsBuCartId, updateCartGoodsCount, updateCartGoodsSelect, getCartAllCartId, getCurSelectedCartId } = require('../model/cart')

// 添加购物车
module.exports.addCartGoodsCON = async(ctx) => {
    const { count, picture, selected, good_id } = ctx.request.body

    // 获取 token 中的用户id
    const { userId } = ctx.state.user

    // 查询当前用户 购物车是否存在 该商品
    const findByIdresult = await findCart({ good_id, user_id: userId })
    if (findByIdresult.length === 0) {
        // 添加数据
        const addResult = await addCart({ count, picture: JSON.stringify(picture), selected, good_id, user_id: userId })
        if (addResult.affectedRows === 1) {
            ctx.body = {
                code: 200,
                data: { cartid: addResult.insertId, msg: '购物车添加成功' }
            }
        }
    } else {
        // 更新数据
        // 数量累加
        let countLj = Number(count) + Number(findByIdresult[0].checked_count)

        const inventory = await findGoodsInventory(findByIdresult[0].goods_id)
            // 判断 累加过的数量是否 超出库存
        if (countLj > inventory[0].inventory) {
            // 超出 返回库存量
            const editResult = await editCart({ count: 0, selected, good_id, user_id: userId })
            if (editResult.affectedRows === 1) {
                ctx.body = {
                    code: 200,
                    data: { type: 1, msg: '已达上线,请重新选择数量' }
                }
            }
        } else {
            const editResult = await editCart({ count: countLj, selected, good_id, user_id: userId })
            if (editResult.affectedRows === 1) {
                ctx.body = {
                    code: 200,
                    data: { msg: '购物车更新成功' }
                }
            }
        }

    }
}

// 购物车列表
module.exports.getCartGoodsListCON = async(ctx) => {
    // 获取 token 中的用户id
    const { userId } = ctx.state.user

    // 操作model层
    const result = await findCartGoodsList(userId)
    if (Object.keys(result).length !== 0) {
        const { cartId, cartList } = result
        // 处理数据
        let data = [];
        for (let i = 0; i < cartId.length; i++) {
            data.push({
                cart_id: cartId[i].id,
                goods_id: cartList[i].goods_id,
                name: cartList[i].name,
                picture: cartList[i].picture,
                price: cartList[i].price,
                old_price: cartList[i].old_price,
                count: cartList[i].checked_count,
                selected: cartList[i].selected,
                inventory: cartList[i].inventory,
                isEffective: cartList[i].effective,
            })
        }
        // 响应请求并返回数据
        ctx.body = {
            status: 200,
            data: data
        }
    }
}

// 删除购物车单个商品
module.exports.delCartGoodsCON = async(ctx) => {
    const { userId } = ctx.state.user
    const { cartId } = ctx.request.body
    const result = await delCartGoodsBuCartId({ userId, cartId })
    if (result.affectedRows === 1) {
        ctx.body = {
            code: 200,
            data: {
                msg: '删除成功'
            }
        }
    }
}

// 更新购物车数量
module.exports.updateCartCountCON = async(ctx) => {
    const { userId } = ctx.state.user
    const { cartId, count } = ctx.request.body
    const result = await updateCartGoodsCount({ cartId, count, userId })
    if (result.affectedRows === 1) {
        ctx.body = {
            code: 200
        }
    }
}

// 更新购物车状态 单选
module.exports.updateCartStatusCON = async(ctx) => {
    const { userId } = ctx.state.user
    const { cartId, selected } = ctx.request.body
    const result = await updateCartGoodsSelect({ cartId, selected, userId })
    console.log(result);
    if (result.affectedRows === 1) {
        ctx.body = {
            code: 200
        }
    }
}

// 更新购物车状态 全选
module.exports.updateCartAllStatusCON = async(ctx) => {
    const { userId } = ctx.state.user
    const { selected } = ctx.request.body
    const result = await getCartAllCartId(userId)
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            await updateCartGoodsSelect({ cartId: result[i].cartId, selected, userId })
        }
        ctx.body = {
            code: 200
        }
    }
}

// 删除多个商品(默认清空 已选1 未选0)
module.exports.delSomeCartGoodsCON = async(ctx) => {
    const { type } = ctx.request.body
    const { userId } = ctx.state.user
    switch (type) {
        case 1:
            // 删除已选
            const checkedResult = await getCurSelectedCartId({ userId, type })
            if (checkedResult.length > 0) {
                for (var i = 0; i < checkedResult.length; i++) {
                    await delCartGoodsBuCartId({ userId, cartId: checkedResult[i].cartId })
                }
                ctx.body = {
                    code: 200,
                    data: { msg: '删除成功' }
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: { msg: '没有要删除的商品' }
                }
            }
            break;
        case 0:
            // 删除未选
            const noselectResult = await getCurSelectedCartId({ userId, type })
            if (noselectResult.length > 0) {
                for (var i = 0; i < noselectResult.length; i++) {
                    await delCartGoodsBuCartId({ userId, cartId: noselectResult[i].cartId })
                }
                ctx.body = {
                    code: 200,
                    data: { msg: '删除成功' }
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: { msg: '没有要删除的商品' }
                }
            }
            break;
        default:
            // 清空
            const clearResult = await getCartAllCartId(userId)
            if (clearResult.length > 0) {
                for (var i = 0; i < clearResult.length; i++) {
                    await delCartGoodsBuCartId({ userId, cartId: clearResult[i].cartId })
                }
                ctx.body = {
                    code: 200,
                    data: { msg: '购物车已清空' }
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: { msg: '购物车已清空' }
                }
            }
            break;
    }
}