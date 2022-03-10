const router = require("koa-router")()
const { orderProduceCON, orderCreateCON, orderPaymentCON, orderCancelCON, orderInquireCON, orderDeleteCON } = require("../controller/order")
router.prefix("/order")

// 生成订单
router.get('/produce', orderProduceCON)

// 创建订单
router.post('/create', orderCreateCON)

// 支付订单
router.post('/payment', orderPaymentCON)

// 取消订单
router.post('/cancel', orderCancelCON)

// 查询订单详情
router.post('/inquire', orderInquireCON)

// 删除订单
router.post('/delete', orderDeleteCON)

module.exports = router