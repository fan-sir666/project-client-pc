const router = require('koa-router')()
const { registerCON, accountLoginCON } = require('../controller/users');
router.prefix('/users')

// 用户注册
router.post('/register', registerCON);
// 用户名密码登录
router.post('/accountlogin', accountLoginCON)

module.exports = router