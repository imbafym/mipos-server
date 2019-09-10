// 实现与MySQL交互
var getDateStr = require("../util/getDate");

var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./stockSqlMapping');

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


    queryByStockByCode: function (req, res, next) {
        var barcode = req.body.barcode;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByCode, barcode, function (err, result) {
                jsonWrite(res, result);
                if (err) {
                    console.log(err, 'this is error in stock by id')
                }
                connection.release();
            });
        });
    },
    queryByStockByName: function (req, res, next) {
        var productName = req.body.productName;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryByName, productName, function (err, result) {
                jsonWrite(res, result);
                if (err) {
                    console.log(err, 'this is error in stock by name')
                }
                connection.release();
            });
        });
    },
    queryUpdateCurrentStockByProductID: function (req, res, next) {
        var id = req.body.id;
        var unit = req.body.unit;
        var location = req.body.location;
        pool.getConnection(function (err, connection) {
            connection.query($sql.querySelectProductInCurrentStock, id, function (err, result) {
                if (result) {
                    var data = JSON.stringify(result)
                    var data = JSON.parse(data)
                    var affectedRow = data[0].result
                    if (affectedRow == 1) {
                        connection.query($sql.queryUpdateProductInCurrentStock, [unit, location, id], function (err, result) {
                            if (result.affectedRows == 1) {
                                res.json({
                                    code: '0',
                                    message: result,
                                })
                            } else {
                                res.json({
                                    code: '1',
                                    message: err,
                                })
                            }
                        })
                    } else {
                        connection.query($sql.queryInsertProductInCurrentStock, [id, unit, location], function (err, result) {
                            if (result) {
                                res.json({
                                    code: '0',
                                    message: result,
                                })
                            } else {
                                res.json({
                                    code: '1',
                                    message: err,
                                })
                            }
                        })
                    }
                } else {
                    res.json({
                        code: 1,
                        message: err,
                    })
                }
                connection.release();
            });

        });
    },

    queryInsertChange: function (req, res, next) {
        var id = guid();
        var reason = req.body.reason;
        var location = req.body.location;
        var product = req.body.product;
        var units = req.body.units;
        var price = req.body.price;
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryInsertRecordInStockDiary, [id, reason, location, product, units, price], function (err, result) {

                if (result.affectedRows == 1) {
                    res.json({
                            code: '0',
                            message: result
                        }
                    )
                } else {
                    res.json({
                        code: '1',
                        message: err
                    })
                }
                // jsonWrite(res, result);
                connection.release();

            });

        });
    },
    queryUpdateBuyPrice: function (req, res, next) {
        var id = req.query.id;
        var buyprice = req.query.buyprice;

        pool.getConnection(function (err, connection) {
            connection.query($sql.queryUpdateProductBuyPriceByID, [buyprice, id], function (err, result) {

                if (err) {
                    console.log(err, 'this is error in insert new stock record')
                }
                jsonWrite(res, result);
                connection.release();

            });

        });
    },
    queryUpdateSellPrice: function (req, res, next) {
        var id = req.query.id;
        var sellprice = req.query.sellprice;

        pool.getConnection(function (err, connection) {
            connection.query($sql.queryUpdateProductSellPriceByID, [sellprice, id], function (err, result) {

                if (err) {
                    console.log(err, 'this is error in insert new stock record')
                }
                jsonWrite(res, result);
                connection.release();

            });

        });
    },


};


function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}