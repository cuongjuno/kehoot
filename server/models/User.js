const mongoose = require('mongoose');
const Question = require('./Question');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  userPrivilege: {
    type: String,
    required: true,
    default: 'user'
  },
  age: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://source.unsplash.com/random'
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question'
    }],
  favorite: {
    type: String
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpiration: {
    type: Date
  }
}, { timestamps: true });

UserSchema.pre('save', () => {
  console.log('Changed before saving');
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


