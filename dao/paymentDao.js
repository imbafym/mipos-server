// 实现与MySQL交互
var getDateStr = require("../util/getDate");

var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./paymentSqlMapping');

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


    /*

       queryByDate?date=yyyy-MM-dd
       result [
                {
                paymethod:xxx,
                  total:xxx
                }
            ]
     */

    queryByDate: function (req, res, next) {
        var date = req.query.date;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByDate, date, function (err, result) {
                jsonWrite(res, result);
                connection.release();
                console.log(result);
            });
        });
    }
    ,
    queryToday: function (req, res, next) {
        var today = getDateStr(0);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByDate, today, function (err, result) {

                console.log(result, err);
                console.log('today', err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryYesterday: function (req, res, next) {
        var yesterday = getDateStr(-1);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByDate, yesterday, function (err, result) {
                console.log(result, err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
    ,

    queryLastMonth: function (req, res, next) {

        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth();
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var firstDay = year + "-" + month + "-" + "01";// 上个月的第一天
        var myDate = new Date(year, month, 0);
        var lastDay = year + "-" + month + "-" + myDate.getDate();// 上个月的最后一天


        console.log(firstDay, lastDay)
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByGivenDate, [firstDay, lastDay], function (err, result) {
                console.log(err);
                console.log(result);

                jsonWrite(res, result);
                connection.release();
            });
        });
    }
    ,
    queryThisMonth: function (req, res, next) {
        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth() + 1;
        if (month < 10) {

            month = "0" + month;
        }
        var firstDay = year + "-" + month + "-" + "01";// 这个月的第一天
        var myDate = new Date(year, month, 0);
        var lastDay = year + "-" + month + "-" + myDate.getDate();// 这个月的最后一天


        console.log(firstDay, lastDay)
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByGivenDate, [firstDay, lastDay], function (err, result) {
                console.log(err);
                console.log(result);

                jsonWrite(res, result);
                connection.release();
            });
        });
    }
    ,

    queryPayMethod: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryPayMethod, function (err, result) {
                jsonWrite(res, result);
                connection.release();
                console.log(result);
            });
        });
    }
    ,
    queryTest: function (req, res, next) {

        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth() + 1;
        if (month < 10) {

            month = "0" + month;
        }
        var firstDay = year + "-" + month + "-" + "01";// 上个月的第一天
        var myDate = new Date(year, month, 0);
        var lastDay = year + "-" + month + "-" + myDate.getDate();// 上个月的最后一天


        console.log(firstDay, lastDay)
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByGivenDate, [firstDay, lastDay], function (err, result) {
                console.log(err);
                console.log(result);
                jsonWrite(res, result);
                connection.release();
            });
        });
    }
    ,

//?????? date not working
    queryCustomerPayment: function (req, res, next) {
        var date = req.query.date;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryCustomerPayment, date, function (err, result) {
                // jsonWrite(res, result);
                jsonWrite(res, result);
                console.log(err);
                connection.release();
            })
        })
    }
    ,

    queryLastSevenDays: function (req, res, next) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryLastSevenDays, [date, date], function (err, result) {
                jsonWrite(res, result);
                connection.release();
                console.log(result, err);
            });
        });
    }
    ,

    // not working
    queryOneMonth: function (req, res, next) {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth());
        console.log(date);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryOneMonth, date, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    }


}
;