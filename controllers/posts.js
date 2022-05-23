const handleSuccess = require('../service/handleSuccess');
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");

const User = require('../models/users');
const Post = require('../models/posts');

const post = {
  getPosts: handleErrorAsync(async (req, res, next) => {
    const timeSort = req.query.timeSort === "asc" ? "createAt" :  "-createAt";
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const allPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    handleSuccess(res, allPosts);
  }),
  createdPosts: handleErrorAsync(async (req, res, next) => {
    const { body } = req;
      if (body.content === undefined || body.user === undefined) {
        return next(appError(400, '你沒有填寫user或是content'))
      }
      const newPost = await Post.create({
        user: body.user,
        content: body.content,
        image: body.image
      })
      handleSuccess(res, newPost);
  })
}

module.exports = post;