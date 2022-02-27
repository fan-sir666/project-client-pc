const router = require('koa-router')()
const { goodsListCON } = require('../controller/category')
router.prefix('/category')

// 分类商品列表
router.post('/goodslist', goodsListCON)

module.exports = router