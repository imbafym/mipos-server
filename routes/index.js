var express = require('express');
var router = express.Router();
var databaseDao = require('../dao/databaseDao')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get Database Info*/
router.get('/db', function(req, res, next) {
    databaseDao.getDatabaseInfo(req,res,next);
});

module.exports = router;
