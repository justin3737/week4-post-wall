const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../models/post');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
  },
  async createdPosts(req, res) {
    try {
      const { body } = req;

      if (body.content) {
        const newPost = await Posts.create({
          name: body.name,
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
