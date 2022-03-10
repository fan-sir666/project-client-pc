const { query } = require('../db/query')


// 添加收货地址
module.exports.addAddress = async({ consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault, userId }) => {
    return await query(`INSERT INTO address (consignee,mobile,provinceCode, cityCode, countyCode, fullLocation,address, postalCode, isDefault, user_id) 
VALUES ("${consignee}", ${mobile}, ${provinceCode}, ${cityCode}, ${countyCode},"${fullLocation}" ,"${address}", ${postalCode}, ${isDefault}, ${userId});`)
}

// 获取收货地址列表
module.exports.getAddressList = async(userId) => {
    return await query(`SELECT * FROM address WHERE user_id = ${userId}`)
}

// 地址id查找
module.exports.findAddress = async({ userId, addressId }) => {
    return await query(`SELECT * FROM address WHERE   id = ${addressId} AND user_id = ${userId}`)
}

// 修改
module.exports.updateAddress = async({ userId, addressId, consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault }) => {
    return await query(`UPDATE address SET consignee = ?, mobile = ?, provinceCode = ?,  cityCode = ?,  countyCode = ? ,fullLocation = ?,  address = ?, postalCode = ? ,  isDefault = ?  WHERE id = ? AND user_id = ?`, [consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault, addressId, userId])
}