const { register, findUserByName, findUserInfo } = require('../model/users');

// 字段校验
const Joi = require('joi')

// jwt鉴权生成token
const jwt = require('jsonwebtoken');

// 密码加密
const { cryptoPaddword } = require('../utils');

// 加盐字符窜
const { secret, jwtSecret } = require('../config');

// 注册
module.exports.registerCON = async(ctx) => {
    // 读取请求参数
    const { username, password, mobile } = ctx.request.body;
    //#region 校验 用户名 密码 手机号
    // 校验规则
    const schema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,24}$/),
        repeat_password: Joi.ref('password'),
        //手机号正则
        mobile: Joi.string().pattern(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/)
    })
    const result = schema.validate({ username, password, mobile });
    if (result.error) {
        ctx.body = {
            status: false,
            msg: result.error.details[0].message
        }
        return
    }
    //#endregion

    // 操作数据模型层
    const user = await findUserByName(username);
    if (user[0]) {
        ctx.body = {
            status: 0,
            msg: '该用户已被注册'
        }
    } else {
        await register(username, cryptoPaddword(password + secret), mobile);
        // 响应信息
        ctx.body = {
            status: 200,
            msg: '用户注册成功'
        }
    }

}

// 用户名登录
module.exports.accountLoginCON = async(ctx) => {
    const { username, password } = ctx.request.body;
    // 操作数据模型层
    const result = await findUserInfo(username, cryptoPaddword(password + secret));
    // 用户是否存在
    if (result[0]) {
        // 在登录成功情况下生成token
        const token = jwt.sign({
            username,
            password
        }, jwtSecret, { expiresIn: '1h' });
        ctx.body = {
            status: 200,
            data: {
                id: result[0].id,
                username: result[0].username,
                mobile: result[0].mobile,
                avatar: result[0].avatar,
                token,
            },
            message: '登录成功'
        }
    } else {
        ctx.body = {
            status: 401,
            message: '登录失败,请检查用户名或者密码'
        }
    }
}