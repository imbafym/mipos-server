var express = require('express');
var router = express.Router();
var stockDao = require('../dao/stockDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});




//////!!! post !!!!!!!!!

router.post('/queryStockById', function(req, res, next) {
    stockDao.queryByStockByCode(req, res, next);
});

router.post('/queryStockByProductId', function(req, res, next) {
    stockDao.queryByStockByProductId(req, res, next);
});

router.post('/queryStockByName', function(req, res, next) {
    stockDao.queryByStockByName(req, res, next);
});

router.get('/queryStockDiary', function(req, res, next) {
    stockDao.queryStockDiary(req, res, next);
});
router.post('/queryUpdateCurrentStock', function(req, res, next) {
    stockDao.queryUpdateCurrentStockByProductID(req, res, next);
});

router.post('/queryInsertRecordInStockDiary', function(req, res, next) {
    stockDao.queryInsertChange(req, res, next);
});

router.put('/queryUpdateProductBuyPrice', function(req, res, next) {
    stockDao.queryUpdateBuyPrice(req, res, next);
});

router.put('/queryUpdateProductSellPrice', function(req, res, next) {
    stockDao.queryUpdateSellPrice(req, res, next);

});









module.exports = router;
