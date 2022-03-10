const { query } = require('../db/query')

//#region 生成订单

// 用户打算购买商品的购物车ID
module.exports.findSelectedCartId = async(userId) => {
    return await query(`SELECT id FROM cart WHERE selected = 1 AND  user_id = ${userId}`)
}

// 用户打算购买商品的信息
module.exports.findSelectedGoods = async(userId) => {
    return await query(`SELECT * FROM cart INNER JOIN goods WHERE cart.goods_id = goods.id AND
selected = 1 AND user_id = ${userId}`)
}

//#endregion

//#region 创建订单
module.exports.createOrder = async({ id, createTime, payType, orderState, postFee, payMoney, payChannel, totalMoney, totalNum, userAddress_id, user_id }) => {
    return await query(`INSERT INTO shop_order (id, createTime, payType, orderState, postFee, payMoney, payChannel, totalMoney, totalNum, userAddress_id, user_id) VALUES 
("${id}", "${createTime}", ${payType}, ${orderState}, "${postFee}", "${payMoney}", ${payChannel}, "${totalMoney}", "${totalNum}", ${userAddress_id}, ${user_id})`)
}

// 添加订单商品信息
module.exports.addOrdergoodsInfo = async({ goods_id, name, curPrice, quanyity, picture, totalMoney, order_id }) => {
    return await query(`INSERT INTO order_goodsinfo (goods_id, name, curPrice, quanyity, picture, totalMoney, order_id) 
    VALUES (${goods_id}, "${name}", "${curPrice}","${quanyity}" ,"${picture}" , "${totalMoney}", "${ order_id}")`)
}

// 查询订单信息 orderId
module.exports.findOrderInfo = async(id, userId) => {
    return await query(`SELECT * FROM shop_order WHERE id = ${id} AND user_id = ${userId}`)
}

//#endregion

// 修改订单
module.exports.editOrder = async(id, state, userId) => {
    return await query(`UPDATE shop_order SET  orderState = ${state} WHERE id = ${id} AND user_id = ${userId}`)
}

// 查询订单商品信息
module.exports.findOrderGoodsInfo = async(id) => {
    return await query(`SELECT * FROM order_goodsinfo WHERE order_id = ${id}`)
}

// 删除订单
module.exports.delOrderInfo = async(id, userId) => {
    return await query(`DELETE FROM shop_order WHERE id = ${id} AND user_id = ${userId}`)
}