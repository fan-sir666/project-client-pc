const { query } = require('../db/query');

//#region 商品详情信息
// 1. 所属分类
module.exports.getCateGory = async(id) => {
    return await query(`SELECT goods.cate_id,cg.name from goods INNER JOIN category as cg WHERE goods.cate_id = cg.id AND goods.id = ${id}`)
}

// 2. 商品基本信息
module.exports.getGoodsInfo = async(id) => {
    return await query(`SELECT * FROM goods WHERE goods.id = ${id}`)
}

// 3. 商品图片
module.exports.getGoodsImg = async({ id, type }) => {
    return await query(`SELECT img_src FROM goods_img WHERE goods_id = ? AND img_type_two = ?`, [id, type])
}

//#endregion

// 商品同类推荐
module.exports.getRecommendGoods = async(id, cateId, limitEnd) => {
    return await query(`SELECT * FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id 
    AND img_type_two = '4-1' AND effective = TRUE AND goods.cate_id = ${cateId} AND goods.id != ${id} LIMIT 0,${limitEnd}`)
}

// 热榜商品
module.exports.hotGoods = async() => {
    return query(`SELECT * FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id AND img_type_two = '4-1' AND effective = TRUE
ORDER BY sales_volume DESC LIMIT 0,6`)
}