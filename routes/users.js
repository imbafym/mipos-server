var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// 增加用户
//TODO 同时支持get,post
router.get('/addUser', function(req, res, next) {
    userDao.add(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
    userDao.queryByUsername(req, res, next);
});

router.get('/query', function(req, res, next) {
    userDao.queryById(req, res, next);
});

router.get('/deleteUser', function(req, res, next) {
    userDao.delete(req, res, next);
});

router.post('/updateUser', function(req, res, next) {
    userDao.update(req, res, next);
});


//http://localhost:3000/api/users/login?username=Administrator
router.get('/login', function(req, res, next) {
    userDao.queryByUsername(req, res, next);
});

router.get('/getCustomers', function(req, res, next) {
    userDao.queryCustomerName(req, res, next);
});

router.get('/getUsers', function(req, res, next) {
    userDao.queryAllUsers(req, res, next);
});

router.get('/getBusinessName', function(req, res, next) {
    userDao.queryBusinessName(req, res, next);
});

module.exports = router;
