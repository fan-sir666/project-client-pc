const { query } = require('../db/query');

// 分类商品列表
module.exports.goodsList = async({ cateId, page, pageSize }) => {
    // (当前页-1)*每页显示条数,每页显示条数
    return {
        totalCount: await query(`select count(*) as totalCount FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id AND img_type_two = '4-1' AND effective = TRUE AND cate_id = ${cateId}`),
        goods: await query(`select * FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id AND img_type_two = '4-1'AND effective = TRUE AND cate_id = ${cateId} limit ${(page-1)*pageSize},${pageSize}`)
    }
}