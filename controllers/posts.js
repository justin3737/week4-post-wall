const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const User = require('../models/users');
const Post = require('../models/posts');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort === "asc" ? "createAt" :  "-createAt";
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q, "i") } : {};
    const allPosts = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort);
    handleSuccess(res, allPosts);
  },
  async createdPosts(req, res) {
    try {
      const { body } = req;

      if (body.content) {
        const newPost = await Post.create({
          user: body.user,
          content: body.content,
        })
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err){
      handleError(res, err);
    }
  }
}

module.exports = posts;
