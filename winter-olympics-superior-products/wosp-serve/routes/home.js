const router = require('koa-router')()
const { headCategoryCON, bannerCON, newGoodsCON, hotGoodsCON, productGoodsCON } = require('../controller/home')
router.prefix('/home')

// 首页头部分类导航
router.get('/category/head', headCategoryCON)

// 首页轮播图
router.get('/banner', bannerCON)

// 新鲜好物
router.get('/newgoods', newGoodsCON)

// 热销商品
router.get('/hotgoods', hotGoodsCON)

// 参品区块
router.get('/productgoods', productGoodsCON)

module.exports = router