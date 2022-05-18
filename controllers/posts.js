const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const appError = require('../service/appError');

const User = require('../models/users');
const Post = require('../models/posts');

const posts = {
  async getPosts(req, res, next) {
    const timeSort = req.query.timeSort === "asc" ? "createAt" :  "-createAt";
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {};
    const allPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    handleSuccess(res, allPosts);
  },
  async createdPosts(req, res, next) {
    const { body } = req;

    if (body.content === undefined || body.user === undefined) {
      return next(appError(400, '你沒有填寫user或是content', next))
    }
    const newPost = await Post.create({
      user: body.user,
      content: body.content,
      image: body.image
    })
    handleSuccess(res, newPost);
  }
}

module.exports = posts;
