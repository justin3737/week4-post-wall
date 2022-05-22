const handleErrorAsync = require('./handleErrorAsync')
const appError = require('./appError')
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const isAuth = handleErrorAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(appError(401,'你尚未登入！'));
  }

  // 驗證 token 正確性
  const decoded = await new Promise((resolve,reject)=>{
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
      if(err){
        reject(err)
      }else{
        resolve(payload)
      }
    })
  })
  const currentUser = await User.findById(decoded.id);

  req.user = currentUser;
  next();
});

module.exports = isAuth