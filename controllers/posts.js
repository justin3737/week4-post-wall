const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const User = require('../models/users');
const Post = require('../models/posts');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find().populate({
      path: 'user',
      select: 'name photo'
    });
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
