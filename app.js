var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paymentsRouter = require('./routes/payments');
var register = require('./routes/register');
var categoryRouter = require('./routes/category');
var databaseRouter = require('./routes/database');
var stockRouter = require('./routes/stock');
const cors = require('cors');
var fs = require('fs');
var proxyMiddlewar = require('http-proxy-middleware')
var bodyParser = require('body-parser');

var app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// //设置跨域访问，在其他设置前先设置这个
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/tset', register);


app.use('/api/payments', paymentsRouter);
app.use('/api/db', databaseRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/stock', stockRouter);
app.use(bodyParser.json());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


// const proxyPath = 'http://www.google.com'   // 注意，这里只需要IP和端口号就可以了。这个ip我瞎写的
// const proxyOption = {target: proxyPath,changeOrigin: true}
// app.use('/api', proxyMiddlewar(proxyOption))  // 下面详细说明这一段
// app.listen(4000) //表示监听的端口号也就是本地的端口号。用vue-cli构建的项目不需要写这行代码
//最下面
var https = require('https')
    ,fs = require("fs");

var options = {
    key: fs.readFileSync('./privatekey.pem'),
    cert: fs.readFileSync('./certificate.pem')
};



https.createServer(options, app).listen(3011, function () {
    console.log('Https server listening on port ' + 3011);
    console.log('Http server listening on port ' + 3000);
});




module.exports = app;
