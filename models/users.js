const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '貼文姓名未填寫']
    },
    email: {
      type: String,
      required: [true, 'Email 未填寫']
    },
    photo: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    versionKey: false
  }
);

const users = mongoose.model('user', usersSchema);

module.exports = users;