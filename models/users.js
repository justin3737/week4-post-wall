const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, '貼文姓名未填寫']
  },
  email: {
    type: String,
    required: [true, 'Email 未填寫']
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
});

const users = mongoose.model('users', usersSchema);

module.exports = users;