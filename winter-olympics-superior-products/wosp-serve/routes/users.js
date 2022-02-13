const router = require('koa-router')()
const { registerCON, accountLoginCON, smscodeCON, mobileLoginCON } = require('../controller/users');
router.prefix('/users')

// 用户注册
router.post('/register', registerCON);
// 用户名密码登录
router.post('/accountlogin', accountLoginCON)

// 短信验证码
router.post('/smscode', smscodeCON)

// 手机号登录
router.post("/mobilelogin", mobileLoginCON)

module.exports = router