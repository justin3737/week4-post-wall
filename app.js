var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const appError = require('./service/appError')

//紀錄錯誤下來，等到服務都處理完，停掉該process
process.on('uncaughtException', err=>{
  console.log('Uncaught Exception!')
  console.log(err);
  process.exit(1);
});

// router
var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users')

var app = express();

require('./connections');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return next(appError(404, "找無此路由", next));
});


// 開發環境錯誤
const resErrorDev = (err ,res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  });
 }

// Prod環境錯誤
// 自訂的錯誤
const resErrorProd = (err ,res) => {
  if (res.isOperational) {
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    // log 紀錄
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請恰系統管理員'
    });
  }
}

// 錯誤處理 middleware
app.use(function(err, req, res, next) {
  //dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res);
  }

  //production
  if(err.name === 'ValidationError') {
    err.message = "資料欄位未填寫正確，請重新輸入！"
    err.isOperational = true;
    return resErrorProd(err, res);
  }
  resErrorProd(err, res)
});

//未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉的 rejection: ', promise, '原因：', err);
})


module.exports = app;
