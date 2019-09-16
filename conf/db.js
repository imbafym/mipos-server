// conf/db.js
// MySQL数据库联接配置
module.exports = {
    mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database:'mipos', // 前面建的user表位于这个数据库中
        port: 3306
    },
    // mysql: {
    //     host: '192.168.123.141',
    //     user: 'root',
    //     password: 'spyv1s10n',
    //     database:'mipos', // 前面建的user表位于这个数据库中
    //     port: 3306
    // },
    // mysql: {
    //     host: '192.168.123.150',
    //     user: 'root',
    //     password: 'spyv1s10n',
    //     database:'mipos', // 前面建的user表位于这个数据库中
    //     port: 3306
    // }
};