const handleSuccess = require('../service/handleSuccess');
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");
const validator = require('validator');
const User = require('../models/users');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');

const generateSendJWT = (user, statusCode, res) => {
  // 產生 JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    data: {
      token,
      name: user.name
    }
  })
}

const user = {
  // 註冊會員
  signUp: handleErrorAsync(async (req, res, next) => {
    let {
      body: { name, email, password, confirmPassword },
    } = req;
    //內容不可為空
    if (!name || !email || !password || !confirmPassword) {
      return next(appError("400", "欄位未正確填寫!", next));
    }
    //密碼正確
    if (password!==confirmPassword) {
      return next(appError("400", "密碼不一致", next));
    }
    //密碼 8 碼以上
    if (!validator.isLength(password, {min:8})) {
      return next(appError("400", "密碼數字低於 8 碼", next));
    }
    //是否為 Email
    if (!validator.isEmail(email)) {
      return next(appError("400","Email 格式不正看", next));
    }

    //加密密碼
    password = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      email,
      password,
      name
    })
    generateSendJWT(newUser,201,res);
  }),
  signIn: () => {},
  updatePassword: () => {},
  getProfile: () => {},
  postProfile: () => {}
}

module.exports = user;