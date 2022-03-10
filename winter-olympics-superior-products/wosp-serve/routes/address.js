const router = require("koa-router")()
const { addAddressCON, getAddressListCON, echoAddressCON, updateAddressCON } = require("../controller/address")
router.prefix('/member')

// 添加收货地址
router.post("/address", addAddressCON)

// 获取收货地址列表
router.get("/getaddress", getAddressListCON)

// 更新收货地址 回显
router.post('/echoaddress', echoAddressCON)

// 更新收货地址 修改
router.post('/updateaddress', updateAddressCON)

module.exports = router