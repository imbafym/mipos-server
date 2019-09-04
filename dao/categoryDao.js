// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./categorySqlMapping');
var getDateStr = require("../util/getDate");

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    queryAllRootCategory: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAllRootCategory, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryAllSubCategory: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAllSubCategory, function(err, result) {
                jsonWrite(res, result);
                console.log(err);
                connection.release();
            });
        });
    },
    queryAllCategories:function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAllCategories, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    } ,
    queryCategoryByName:function (req, res, next) {
        var name = req.query.name
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByName, name,function(err, result) {
                if(err){
                    console.log(err)
                }else{
                    console.log(result)
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    } ,
    queryCategoriesSalesWithDate:function (req, res, next) {
        var dateFrom = req.query.dateFrom;
        var dateTo = req.query.dateTo;
        var cate = req.query.category;
        pool.getConnection(function(err, connection) {

                sql = $sql.queryCategoriesSalesWithDate


            connection.query(sql,[dateFrom,dateTo,cate], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryCategoriesProductSalesWithDate:function (req, res, next) {
        var dateFrom = req.query.dateFrom;
        var dateTo = req.query.dateTo;
        var cate = req.query.category;
        pool.getConnection(function(err, connection) {

                sql = $sql.queryCategoriesProductSalesWithDate


            connection.query(sql,[dateFrom,dateTo], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryCategoriesProductSalesLastMonth:function (req, res, next) {

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

        pool.getConnection(function(err, connection) {

            sql = $sql.queryCategoriesProductSalesWithDate

            connection.query(sql,[firstDay,lastDay], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryDirectSaleCategoriesProductSalesWithDate:function (req, res, next) {
        var dateFrom = req.query.dateFrom;
        var dateTo = req.query.dateTo;
        var cate = req.query.category;
        pool.getConnection(function(err, connection) {

                sql = $sql.queryDirectSaleCategoriesProductSalesWithDateUpdated


            connection.query(sql,[dateFrom,dateTo], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryCustomerSales:function (req, res, next) {
        var dateFrom = req.query.dateFrom;
        var dateTo = req.query.dateTo;
        pool.getConnection(function(err, connection) {
                sql = $sql.queryCustomerSales
            connection.query(sql,[dateFrom,dateTo], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryUserSales:function (req, res, next) {
        var dateFrom = req.query.dateFrom;
        var dateTo = req.query.dateTo;
        pool.getConnection(function(err, connection) {
                sql = $sql.queryUserSales
            connection.query(sql,[dateFrom,dateTo], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
   




    queryDirectSaleCategoriesProductSalesThisMonth:function (req, res, next) {

        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth()+1;
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var firstDay = year + "-" + month + "-" + "01";// zhe个月的第一天
        var myDate = new Date(year, month, 0);
        var lastDay = year + "-" + month + "-" + myDate.getDate();// zhe个月的最后一天
  
        pool.getConnection(function(err, connection) {
  
            sql = $sql.queryDirectSaleCategoriesProductSalesWithDateUpdated
  
            connection.query(sql,[firstDay,lastDay], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },


    queryDirectSaleCategoriesProductSalesLastMonth:function (req, res, next) {

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

        pool.getConnection(function(err, connection) {

            sql = $sql.queryDirectSaleCategoriesProductSalesWithDateUpdated

            connection.query(sql,[firstDay,lastDay], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },



    queryCategoriesSalesLastMonth:function (req, res, next) {

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

        pool.getConnection(function(err, connection) {

            sql = $sql.queryCategoriesSalesWithDate

            connection.query(sql,[firstDay,lastDay], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
  queryCategoriesProductSalesThisMonth:function (req, res, next) {

      var nowdays = new Date();
      var year = nowdays.getFullYear();
      var month = nowdays.getMonth()+1;
      if (month == 0) {
          month = 12;
          year = year - 1;
      }
      if (month < 10) {
          month = "0" + month;
      }
      var firstDay = year + "-" + month + "-" + "01";// zhe个月的第一天
      var myDate = new Date(year, month, 0);
      var lastDay = year + "-" + month + "-" + myDate.getDate();// zhe个月的最后一天

      pool.getConnection(function(err, connection) {

          sql = $sql.queryCategoriesProductSalesWithDate

          connection.query(sql,[firstDay,lastDay], function(err, result) {
              if(err){
                  console.log(err);
              }
              console.log(result)
              jsonWrite(res, result);
              connection.release();
          });
      });
  },

  queryProductWithCategoryAndUserAndDiscountWithAllCustomer:function (req, res, next) {

    var dateFrom = Buffer.from(req.query.dateFrom).toString();
    var dateTo = Buffer.from(req.query.dateTo).toString();

    pool.getConnection(function(err, connection) {

        sql = $sql.queryProductWithCategoryAndUserAndDiscountWithAllCustomer

        connection.query(sql,[dateFrom,dateTo], function(err, result) {
            if(err){
                console.log(err);
            }
            console.log(result)
            jsonWrite(res, result);
            connection.release();
        });
    });
},

queryProductWithCategoryAndUserAndDiscountwithCustomer:function (req, res, next) {

    var dateFrom = req.query.dateFrom;
    var dateTo = req.query.dateTo;
    var cate = req.query.category;

    pool.getConnection(function(err, connection) {

        sql = $sql.queryProductWithCategoryAndUserAndDiscountwithCustomer

        connection.query(sql,[dateFrom,dateTo], function(err, result) {
            if(err){
                console.log(err);
            }
            console.log(result)
            jsonWrite(res, result);
            connection.release();
        });
    });
},





    queryCategoriesSalesThisMonth:function (req, res, next) {

        var nowdays = new Date();
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth()+1;
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var firstDay = year + "-" + month + "-" + "01";// zhe个月的第一天
        var myDate = new Date(year, month, 0);
        var lastDay = year + "-" + month + "-" + myDate.getDate();// zhe个月的最后一天

        pool.getConnection(function(err, connection) {

            sql = $sql.queryCategoriesSalesWithDate

            connection.query(sql,[firstDay,lastDay], function(err, result) {
                if(err){
                    console.log(err);
                }
                console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryProductToday: function (req, res, next) {
        var today = getDateStr(0);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryCategoriesProductSalesWithOneDate, today, function (err, result) {

                console.log(result, err);
                console.log('today', err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryDirectSaleProductToday: function (req, res, next) {
        var today = getDateStr(0);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryDirectSaleCategoriesProductSalesWithOneDate1, today, function (err, result) {

                console.log(result, err);
                console.log('today', err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryDirectSaleProductYesterday: function (req, res, next) {
        var yesterday = getDateStr(-1);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryDirectSaleCategoriesProductSalesWithOneDate1, yesterday, function (err, result) {
                console.log(result, err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },



    queryCategoriesProductToday: function (req, res, next) {
        var today = getDateStr(0);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryCategoriesSalesWithOneDate, today, function (err, result) {

                console.log(result, err);
                console.log('today', err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryProductYesterday: function (req, res, next) {
        var yesterday = getDateStr(-1);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryCategoriesProductSalesWithOneDate, yesterday, function (err, result) {
                console.log(result, err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryCategoriesProductYesterday: function (req, res, next) {
        var yesterday = getDateStr(-1);
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryCategoriesSalesWithOneDate, yesterday, function (err, result) {
                console.log(result, err);

                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryDeletedItem: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryDeletedItem, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryFlushDeletedtickets: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryFlushDeletedtickets, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryFlushDeletedView: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryFlushDeletedView, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryTaxes: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAllTaxes, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryTodayHourlyTran: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryTodayHourlyTran, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryThisYearMonthlyTran: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryThisYearMonthlyTran, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryThisMonthDailyTran: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryThisMonthDailyTran, function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    queryHourlyTranBydate: function (req, res, next) {
        var date = req.query.date;
        // var date = '2019-07-14';

        pool.getConnection(function (err, connection) {
            connection.query($sql.queryHourlyTranBydate, date ,  function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryDailyTranByMonthYear: function (req, res, next) {
        var month = req.query.month;
        var year = req.query.year;

        pool.getConnection(function (err, connection) {
            connection.query($sql.queryDailyTranByMonthYear, [month,year] ,  function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },

    queryMonthlyTranByYear: function (req, res, next) {
        var year = req.query.year;
        // var date = '2019-07-14';

        pool.getConnection(function (err, connection) {
            connection.query($sql.queryMonthlyTranByYear, year ,  function (err, result) {
                console.log(result, err);
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
   
};