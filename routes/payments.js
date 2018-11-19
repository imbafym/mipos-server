var express = require('express');
var router = express.Router();
var paymentsDao = require('../dao/paymentDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



// 增加用户
//TODO 同时支持get,post


router.get('/queryAll', function(req, res, next) {
    paymentsDao.queryAll(req, res, next);
});

router.get('/queryByDate', function(req, res, next) {
    paymentsDao.queryByDate(req, res, next);
});


router.get('/queryLastSevenDays', function(req, res, next) {
    paymentsDao.queryLastSevenDays(req, res, next);
});


router.get('/queryThisMonth', function(req, res, next) {
    paymentsDao.queryThisMonth(req, res, next);
});
router.get('/queryLastMonth', function(req, res, next) {
    paymentsDao.queryLastMonth(req, res, next);
});
router.get('/queryToday', function(req, res, next) {
    paymentsDao.queryToday(req, res, next);
});
router.get('/queryYesterday', function(req, res, next) {
    paymentsDao.queryYesterday(req, res, next);
});
router.get('/queryPayMethod', function(req, res, next) {
    paymentsDao.queryPayMethod(req, res, next);
});


//---------------------------------- test -------------------------------
router.get('/test', function(req, res, next) {
    paymentsDao.queryTest(req, res, next);
});
router.get('/queryCustomer', function(req, res, next) {
    paymentsDao.queryCustomerPayment(req, res, next);
});
router.get('/queryOneMonth', function(req, res, next) {
    paymentsDao.queryOneMonth(req, res, next);
});

module.exports = router;
