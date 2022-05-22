var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users');

//註冊
router.post('/sign_up', (req, res, next) =>
  UserController.signUp(req, res, next)
);

//登入
router.post('/sign_in', (req, res, next) =>
  UserController.signIn(req, res, next)
);

//重設密碼
//router.post('/updatePassword');

//取得個人資料
//router.get('/profile');

//更新個人資料
//router.post('/profile');

module.exports = router;