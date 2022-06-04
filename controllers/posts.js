const handleSuccess = require('../service/handleSuccess');
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");

const User = require('../models/users');
const Post = require('../models/posts');

exports.getPosts = handleErrorAsync(async(res, req, next) => {
  const timeSort = req.query.timeSort === "asc" ? "createAt" :  "-createAt";
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const allPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    handleSuccess(res, allPosts);
});

exports.createdPosts = handleErrorAsync(async(res, req, next) => {
  const { body } = req;
    if (body.content === undefined) {
      return next(appError(400, '你沒有填寫content', next))
    }
    if (body.image && !body.image.startsWith('https')) {
      return next(appError(400, '貼文圖片網址錯誤', next));
    }
    // 先寫固定的使用者編號
    const userId = '629b953632e4235f8eb611e5';
    const newPost = await Post.create({
      user: userId,
      content: body.content,
      image: body.image
    })
    handleSuccess(res, newPost);
});