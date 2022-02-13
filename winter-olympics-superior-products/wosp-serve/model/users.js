const { query } = require('../db/query');

// 注册
module.exports.register = async(username, password, mobile) => {
    return await query(`insert into user (username, password, mobile) values( "${username}", "${password}", "${mobile}")`);
}

// 根据用户名查询用户
module.exports.findUserByName = async(username, mobile) => {
    return await query('select * from user where username = ? or mobile = ?', [username, mobile]);
}

// 用户名登录
module.exports.findUserInfoByName = async(username, password) => {
    return await query('select * from user where username = ?  and password = ?', [username, password]);
}

// 更新用户手机号验证码
module.exports.updateUserSmsCode = async(mobile, code) => {
    return await query('update user set smscode = ? where mobile = ?', [code, mobile])
}

// 手机号登录
module.exports.findUserInfoByMobile = async(mobile, code) => {
    return await query('select * from user where mobile = ?  and smscode = ?', [mobile, code]);
}