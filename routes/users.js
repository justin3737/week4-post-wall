var express = require('express');
var router = express.Router();


//註冊
router.post('/sign_up');

//登入
router.post('/sign_in');

//重設密碼
router.post('/updatePassword');

//取得個人資料
router.get('/profile');

//更新個人資料
router.post('/profile');