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

var app = express();

require('./connections');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return next(appError(404, "找無此路由", next));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉的 rejection: ', promise, '原因：', err);
})


module.exports = app;
