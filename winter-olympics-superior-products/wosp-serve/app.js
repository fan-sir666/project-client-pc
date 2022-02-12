const Koa = require('koa') // KOA包
const app = new Koa() // 创建app服务
const views = require('koa-views') // 处理静态资源
const json = require('koa-json') // json 格式化
const onerror = require('koa-onerror') // 处理异常
const bodyparser = require('koa-bodyparser') // 解析post请求
const logger = require('koa-logger') // 记录日志

// jwt鉴权
const jwt = require('koa-jwt');
const { jwtSecret } = require('./config');

// 解决跨域
const cors = require('koa2-cors')

// 启动dotenv
require('dotenv').config()

// 加载路由
const index = require('./routes/index')
const users = require('./routes/users')

// error handler 错误处理
onerror(app)

// middlewares 中间件
// 使用koa-jwt中间件  来拦截 客户端在调用服务端接口时，如果请求头中没有设置token  返回401 
app.use(function(ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});
// jwt  加密信息一定要跟token生成使用加密字符串保持一致
// unless 排除哪些不需要在请求带token
app.use(jwt({ secret: jwtSecret }).unless({ path: [/^\/public/, /^\/users\/register/, /^\/users\/accountlogin/] }));

// 应用cors中间件后端解决跨域
app.use(cors());

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger 记录日志
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app