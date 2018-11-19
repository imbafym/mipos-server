// 实现与MySQL交互
var getDateStr = require("../util/getDate");

var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {


    getDatabaseInfo: function (req, res, next) {
        var date = req.query.date;
        pool.getConnection(function (err, connection) {
           if(!err){
               jsonWrite(res, $conf.mysql);
               connection.release();
           }


        });
    }
}
;