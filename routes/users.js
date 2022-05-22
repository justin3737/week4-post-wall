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
router.post('/updatePassword', (req, res, next) =>
  UserController.updatePassword(req, res, next)
);


//取得個人資料
router.get('/profile', (req, res, next) =>
  UserController.getProfile(req, res, next)
);

//更新個人資料
router.post('/profile', (req, res, next) =>
  UserController.postProfile(req, res, next)
);

module.exports = router;