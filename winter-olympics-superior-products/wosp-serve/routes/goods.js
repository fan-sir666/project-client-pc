const router = require('koa-router')()
const { detailInfoCON, recommendGoodsCON, hotSaleCON, hotGoodsCON } = require('../controller/goods');
router.prefix('/goods')

// 商品详情信息
router.post('/detailinfo', detailInfoCON);
// 商品同类推荐
router.post('/recommend', recommendGoodsCON)

// 商品猜你喜欢
router.get('/hotsale', hotSaleCON)

// 热榜商品
router.get('/hotgoods', hotGoodsCON)


module.exports = router