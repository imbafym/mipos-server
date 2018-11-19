var express = require('express');
var router = express.Router();
var databaseDao = require('../dao/databaseDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



// 增加用户
//TODO 同时支持get,post
router.get('/getDatabaseInfo', function(req, res, next) {
    databaseDao.getDatabaseInfo(req, res, next);
});


module.exports = router;
