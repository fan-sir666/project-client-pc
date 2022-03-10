const { addAddress, getAddressList, findAddress, updateAddress } = require("../model/address")

// 添加收货地址
module.exports.addAddressCON = async(ctx) => {
    const { consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault } = ctx.request.body
    const { userId } = ctx.state.user
    const result = await addAddress({ consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault, userId })
    console.log(result);
    if (result.affectedRows == 1) {
        ctx.body = {
            code: 200,
            data: { id: result.insertId }
        }
    }

}

// 获取收货地址列表
module.exports.getAddressListCON = async(ctx) => {
    const { userId } = ctx.state.user
    const result = await getAddressList(userId)
    if (result[0]) {
        ctx.body = {
            code: 200,
            data: result
        }
    } else {
        ctx.body = {
            code: 200,
            data: []
        }
    }
}

//#region 更新收货地址
// 回显
module.exports.echoAddressCON = async(ctx) => {
    const { id } = ctx.request.body
    const { userId } = ctx.state.user
    const result = await findAddress({ userId, addressId: id })
    if (result[0]) {
        ctx.body = {
            code: 200,
            data: result
        }
    }
}

// 更新
module.exports.updateAddressCON = async(ctx) => {
    const { id, consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault } = ctx.request.body
    const { userId } = ctx.state.user
    const result = await updateAddress({ userId, addressId: id, consignee, mobile, provinceCode, cityCode, countyCode, fullLocation, address, postalCode, isDefault: Boolean(isDefault) })
    if (result.affectedRows == 1) {
        ctx.body = {
            code: 200,
            data: { id: id }
        }
    }
}

//#endregion