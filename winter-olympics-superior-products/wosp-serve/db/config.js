module.exports.config = {
    // dev 开发环境
    dev: {
        connectionLimit: 10, // 最大连接数
        host: 'localhost', // 主机
        user: 'root', // 用户名
        password: '123456', // 密码
        database: 'wosp_db' // 数据库名称
    },
    // uat 测试环境
    uat: {
        connectionLimit: 10, // 最大连接数
        host: 'localhost', // 主机
        user: 'root', // 用户名
        password: '123456', // 密码
        database: 'wosp_db' // 数据库名称
    },
    // prd 生产环境
    prd: {
        connectionLimit: 10, // 最大连接数
        host: 'localhost', // 主机
        user: 'root', // 用户名
        password: '123456', // 密码
        database: 'wosp_db' // 数据库名称
    },
}