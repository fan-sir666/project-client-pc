const router = require('koa-router')()
const { detailInfoCON, recommendGoodsCON, hotGoodsCON } = require('../controller/goods');
router.prefix('/goods')

// 商品详情信息
router.post('/detailinfo', detailInfoCON);
// 商品同类推荐
router.post('/recommend', recommendGoodsCON)

// 热榜商品
router.get('/hotgoods', hotGoodsCON)


module.exports = router