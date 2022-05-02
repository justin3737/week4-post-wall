const mongoose = require('mongoose');
const postSchema = new  mongoose.Schema({
  name: {
    type: String,
    required: [true, '貼文姓名未填寫']
  },
  image: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  content: {
    type: String,
    required: [true, '貼文內容未填寫']
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  }
});

const posts = mongoose.model('post', postSchema);

modeule.export = posts;