const { query } = require('../db/query')

//#region 添加购物车
// 根据商品id查询购物车是否存在数据
module.exports.findCart = async({ good_id, user_id }) => {
    return await query(`SELECT id AS cart_id ,checked_count,goods_id FROM cart WHERE goods_id = ${good_id} AND user_id = ${user_id}`)
}

// 加入购物车
module.exports.addCart = async({ count, picture, selected, good_id, user_id }) => {
    return await query(`INSERT INTO cart (checked_count, picture, selected, goods_id, user_id) 
VALUES (${count}, ${picture},${selected}, ${ good_id}, ${user_id})`)
}

// 更新购物车数量
module.exports.editCart = async({ count, selected, good_id, user_id }) => {
    return await query(`UPDATE cart SET checked_count = ${count}, selected = ${selected} WHERE goods_id = ${good_id} AND user_id = ${user_id};
`)
}

// 根据商品id 查询库存
module.exports.findGoodsInventory = async(good_id) => {
    return await query(`SELECT inventory from goods WHERE id = ${good_id}`)
}

//#endregion

// 获取购物车列表
module.exports.findCartGoodsList = async(userId) => {
    const cartId = await query(`SELECT id FROM cart WHERE user_id = ${userId}`)
    const cartList = await query(`SELECT * FROM cart INNER JOIN goods WHERE cart.goods_id = goods.id AND cart.user_id = ${userId}`)
    return { cartId, cartList }
}

// 删除购物车单个商品
module.exports.delCartGoodsBuCartId = async({ userId, cartId }) => {
    return await query(`DELETE FROM cart WHERE id = ${cartId} AND user_id = ${userId}`)
}

// 更新购物车数量
module.exports.updateCartGoodsCount = async({ cartId, count, userId }) => {
    return await query(`UPDATE cart SET checked_count = ? WHERE id = ${cartId} AND user_id = ${userId}`, [count])
}

// 更新购物车状态 单选
module.exports.updateCartGoodsSelect = async({ cartId, selected, userId }) => {
    return await query(`UPDATE cart SET selected = ${selected} WHERE id = ${cartId} AND user_id = ${userId}`)
}

// 获取当前用户的所有cartId
module.exports.getCartAllCartId = async(userId) => {
    return await query(`SELECT id as cartId FROM cart WHERE user_id = ${userId}`)
}

// 获取当前用户状态下的cartId
module.exports.getCurSelectedCartId = async({ userId, type }) => {
    return await query(`SELECT id as cartId FROM cart WHERE selected = ? AND  user_id = ${userId}`, [type])
}