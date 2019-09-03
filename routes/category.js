var express = require('express');
var router = express.Router();
var categoryDao = require('../dao/categoryDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



// 增加用户
//TODO 同时支持get,post


router.get('/queryAllRootCategory', function(req, res, next) {
    categoryDao.queryAllRootCategory(req, res, next);
});

router.get('/queryCategoryByName',function(req,res,next){
    categoryDao.queryCategoryByName(req,res,next);
});
router.get('/queryAllSubCategory', function(req, res, next) {
    categoryDao.queryAllSubCategory(req, res, next);
});

router.get('/queryAllCategories',function(req,res,next){
    categoryDao.queryAllCategories(req,res,next);
});
router.get('/queryCategoriesSalesWithDate',function(req,res,next){
    categoryDao.queryCategoriesSalesWithDate(req,res,next);
});
router.get('/queryCategoriesProductSalesWithDate',function(req,res,next){
    categoryDao.queryCategoriesProductSalesWithDate(req,res,next);
});
router.get('/queryProductWithCategoryAndUserAndDiscountWithAllCustomer',function(req,res,next){
    categoryDao.queryProductWithCategoryAndUserAndDiscountWithAllCustomer(req,res,next);
});
router.get('/queryProductWithCategoryAndUserAndDiscountWithCustomer',function(req,res,next){
    categoryDao.queryProductWithCategoryAndUserAndDiscountwithCustomer(req,res,next);
});


/////////////////////////////
router.get('/queryProductLastMonth',function(req,res,next){
    categoryDao.queryCategoriesProductSalesLastMonth(req,res,next);
});
router.get('/queryProductThisMonth',function(req,res,next){
    categoryDao.queryCategoriesProductSalesThisMonth(req,res,next);
});
router.get('/queryProductToday',function(req,res,next){
    categoryDao.queryProductToday(req,res,next);
});
router.get('/queryProductYesterday',function(req,res,next){
    categoryDao.queryProductYesterday(req,res,next);
});

/////////////////////////////
router.get('/queryDirectSaleCategoriesProductSalesWithDate',function(req,res,next){
    categoryDao.queryDirectSaleCategoriesProductSalesWithDate(req,res,next);
});
router.get('/queryDirectSaleProductToday',function(req,res,next){
    categoryDao.queryDirectSaleProductToday(req,res,next);
});
router.get('/queryDirectSaleProductYesterday',function(req,res,next){
    categoryDao.queryDirectSaleProductYesterday(req,res,next);
});
router.get('/queryDirectSaleProductLastMonth',function(req,res,next){
    categoryDao.queryDirectSaleCategoriesProductSalesLastMonth(req,res,next);
});
router.get('/queryDirectSaleProductThisMonth',function(req,res,next){
    categoryDao.queryDirectSaleCategoriesProductSalesThisMonth(req,res,next);
});
//===============custoemr sales====================
router.get('/queryCustomerSales',function(req,res,next){
    categoryDao.queryCustomerSales(req,res,next);
});


//===============user sales====================
router.get('/queryUserSales',function(req,res,next){
    categoryDao.queryUserSales(req,res,next);
});
/////////////////////////////
router.get('/queryDeletedItem',function(req,res,next){
    categoryDao.queryDeletedItem(req,res,next);
});
router.get('/queryFlushDeletedView',function(req,res,next){
    categoryDao.queryFlushDeletedView(req,res,next);
});
router.get('/queryFlushDeletedtickets',function(req,res,next){
    categoryDao.queryFlushDeletedtickets(req,res,next);
});




/////////////////////////////
router.get('/queryCategoryLastMonth',function(req,res,next){
    categoryDao.queryCategoriesSalesLastMonth(req,res,next);
});
router.get('/queryCategoryThisMonth',function(req,res,next){
    categoryDao.queryCategoriesSalesThisMonth(req,res,next);
});
router.get('/queryCategoryToday',function(req,res,next){
    categoryDao.queryCategoriesProductToday(req,res,next);
});
router.get('/queryCategoryYesterday',function(req,res,next){
    categoryDao.queryCategoriesProductYesterday(req,res,next);
});
///////////////////////////////
router.get('/queryTaxes',function(req,res,next){
    categoryDao.queryTaxes(req,res,next);
});

router.get('/queryTodayHourlyTran',function(req,res,next){
    categoryDao.queryTodayHourlyTran(req,res,next);
});

router.get('/queryThisMonthDailyTran',function(req,res,next){
    categoryDao.queryThisMonthDailyTran(req,res,next);
});

router.get('/queryThisYearMonthlyTran',function(req,res,next){
    categoryDao.queryThisYearMonthlyTran(req,res,next);
});


router.get('/queryThisYearMonthlyTran',function(req,res,next){
    categoryDao.queryThisYearMonthlyTran(req,res,next);
});
router.get('/queryHourlyTranBydate',function(req,res,next){
    categoryDao.queryHourlyTranBydate(req,res,next);
});
router.get('/queryDailyTranByMonthYear',function(req,res,next){
    categoryDao.queryDailyTranByMonthYear(req,res,next);
});
router.get('/queryMonthlyTranByYear',function(req,res,next){
    categoryDao.queryMonthlyTranByYear(req,res,next);
});



module.exports = router;
