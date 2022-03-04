const router = require('koa-router')()
const { addCartGoodsCON, getCartGoodsListCON, delCartGoodsCON, updateCartCountCON, updateCartStatusCON, updateCartAllStatusCON, delSomeCartGoodsCON } = require('../controller/cart')
router.prefix('/cart')

// 添加购物车
router.post('/addcartgoods', addCartGoodsCON)

// 购物车列表
router.get('/getcartgoodslist', getCartGoodsListCON)

// 删除购物车商品
router.post('/delcartgoods', delCartGoodsCON)

// 更新购物车数量
router.post('/updatecartcount', updateCartCountCON)

// 更新购物车状态 单选
router.post('/updatecartstatus', updateCartStatusCON)

// 更新购物车状态 全选
router.post('/updatecartallstatus', updateCartAllStatusCON)

// 删除多个商品(默认清空 已选1 未选0)
router.post('/delsomecartgoods', delSomeCartGoodsCON)

module.exports = router