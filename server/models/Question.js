const mongoose = require('mongoose');
const User = require('./User');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
    default: 'https://source.unsplash.com/random'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  answers: {
    type: [String],
    required: true
  },
  correctAnswer: {
    text: {
      type: String,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  time: {
    type: Number,
    required: true
  },
  point: {
    type: Number,
    required: true
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;


