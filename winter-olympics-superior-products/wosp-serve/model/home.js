const { query } = require('../db/query');

// 首页头部分类导航
module.exports.headCategory = async() => {
    return await query('select * from category');
}

// 首页轮播图
module.exports.banner = async() => {
    return await query('select * from goods INNER JOIN goods_img where goods.id = goods_img.goods_id AND img_type_one = 1 AND effective = TRUE ORDER BY goods_img.id');
}

// 新鲜好物
module.exports.newGoods = async() => {
    return await query('SELECT * FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id AND goods_img.img_type_one = 2 AND effective = TRUE');
}

// 热销商品
module.exports.hotGoods = async() => {
    return await query('SELECT * FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id AND goods_img.img_type_one = 3 AND effective = TRUE');
}

// 参品区块
module.exports.productCate = async() => {
    return await query('SELECT * FROM category');
}
module.exports.productGoods = async(cateId) => {
    return await query(`select * FROM goods INNER JOIN goods_img WHERE goods.id = goods_img.goods_id AND img_type_two = '4-1' AND effective = TRUE AND cate_id = ${cateId} limit 0,8`);
}