var mysql = require('mysql');
const { config } = require('./config');
// 配置信息(现在是开发环境)
const dbConfig = config[process.env.DB_ENV]

// 连接数据库配置信息
var pool = mysql.createPool(dbConfig);

//  创建连接   sql：sql语句
module.exports.query = (sql, values) => {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!  没有连接上

            // Use the connection 执行结果 在回调函数中参数二返回
            connection.query(sql, values,
                function(error, results, fields) {
                    // When done with the connection, release it.
                    connection.release();

                    // Handle error after the release.  抛出异常
                    if (error) throw error;

                    resolve(results);

                    // Don't use the connection here, it has been returned to the pool.
                });
        });
    });
}