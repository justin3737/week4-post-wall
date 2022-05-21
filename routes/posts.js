var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/posts');

router.get('/', (req, res, next) =>
  PostsControllers.getPosts (req, res, next)
);

router.post('/',  (req, res, next) =>
  PostsControllers.createdPosts(req, res, next)
);

module.exports = router;
